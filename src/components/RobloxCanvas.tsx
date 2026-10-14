import React, { useCallback, useEffect, useRef } from 'react';
import { soundEngine } from '../audio';
import {
  BUILDINGS,
  CATEGORY_META,
  GROUND_Y,
  INITIAL_WORDS,
  LADDERS,
  NPCS,
  TOWN_PLATFORMS,
  TRAMPOLINES,
  WORLD_HEIGHT,
  WORLD_PROPS,
  WORLD_WIDTH,
} from '../data/openWorldData';
import {
  AvatarStyle,
  BuildingZone,
  NPC,
  Particle,
  PlayerState,
  WordPickup,
} from '../types';

interface RobloxCanvasProps {
  avatarStyle: AvatarStyle;
  onSkateboard: boolean;
  inputState: { left: boolean; right: boolean; jump: boolean };
  onUpdateStats: (stats: {
    playerX: number;
    playerY: number;
    heightMeters: number;
    currentDistrict: string;
    carryingWord: WordPickup | null;
    nearNPC: NPC | null;
  }) => void;
  onExecuteJumpRef: React.MutableRefObject<(() => void) | null>;
  onTeleportRef: React.MutableRefObject<((x: number) => void) | null>;
  onToast: (msg: string, isSuccess: boolean) => void;
  onDeliverySuccess: (reward: number) => void;
}

export const RobloxCanvas: React.FC<RobloxCanvasProps> = ({
  avatarStyle,
  onSkateboard,
  inputState,
  onUpdateStats,
  onExecuteJumpRef,
  onTeleportRef,
  onToast,
  onDeliverySuccess,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Player physics
  const playerRef = useRef<PlayerState>({
    x: 460, // Starts at Park
    y: GROUND_Y - 48,
    w: 26,
    h: 36,
    vx: 0,
    vy: 0,
    grounded: true,
    facing: 1,
    canDoubleJump: true,
    coyoteTimer: 0,
    jumpBufferTimer: 0,
    onLadder: false,
    onSkateboard: false,
  });

  // Camera
  const cameraXRef = useRef<number>(200);
  const cameraYRef = useRef<number>(GROUND_Y - 450);

  // Entities
  const wordPickupsRef = useRef<WordPickup[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const carryingWordRef = useRef<WordPickup | null>(null);
  const nearNPCRef = useRef<NPC | null>(null);
  const deliveryCooldownRef = useRef<number>(0);
  const trampBounceTimerRef = useRef<{ id: number; timer: number }[]>([]);

  // Initialize words
  useEffect(() => {
    wordPickupsRef.current = INITIAL_WORDS.map((w, i) => {
      // Scatter words across park benches, school roof, ice cream patio, house balconies, tower
      const positions = [
        { x: 340, y: GROUND_Y - 32 }, // Parque banco
        { x: 500, y: GROUND_Y - 48 }, // Parque fuente
        { x: 700, y: 430 }, // Parque plataforma alta
        { x: 1000, y: 410 }, // Techo escuela
        { x: 1160, y: 320 }, // Techo alto escuela
        { x: 1300, y: GROUND_Y - 32 }, // Frente escuela
        { x: 1720, y: 460 }, // Techo heladería
        { x: 1840, y: 370 }, // Toldo heladería
        { x: 1980, y: GROUND_Y - 32 }, // Terraza heladería
        { x: 2380, y: 430 }, // Balcón casas
        { x: 2540, y: 340 }, // Techo casas
        { x: 2700, y: GROUND_Y - 32 }, // Jardín casas
        { x: 3100, y: 540 }, // Torre nivel 1
        { x: 3150, y: 400 }, // Torre nivel 2
        { x: 3220, y: 250 }, // Campanario torre
      ];
      const pos = positions[i % positions.length];
      let targetBuilding = 'school';
      if (w.cat === 'ADJETIVO') targetBuilding = 'icecream';
      else if (w.cat === 'COMUN') targetBuilding = 'houses';
      else if (w.cat === 'SINONIMO' || w.cat === 'ANTONIMO') targetBuilding = 'clocktower';

      return {
        id: w.id || `w-${i}`,
        x: pos.x,
        y: pos.y,
        w: 86,
        h: 24,
        word: w.word,
        cat: w.cat,
        hint: w.hint,
        collected: false,
        targetBuildingId: targetBuilding,
      };
    });
  }, []);

  // Sync onSkateboard with player
  useEffect(() => {
    playerRef.current.onSkateboard = onSkateboard;
  }, [onSkateboard]);

  // Jump execution
  const executeJump = useCallback(() => {
    soundEngine.init();
    const p = playerRef.current;

    if (p.grounded || p.coyoteTimer > 0 || p.onLadder) {
      p.vy = p.onSkateboard ? -13.8 : -12.5;
      p.grounded = false;
      p.coyoteTimer = 0;
      p.canDoubleJump = true;
      p.onLadder = false;
      soundEngine.jump();
      // Dust particles
      for (let i = 0; i < 6; i++) {
        particlesRef.current.push({
          x: p.x + p.w / 2,
          y: p.y + p.h,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * -2,
          size: 3 + Math.random() * 3,
          color: '#cbd5e1',
          life: 0.8,
          decay: 0.04,
        });
      }
    } else if (p.canDoubleJump) {
      p.vy = -12.0;
      p.canDoubleJump = false;
      soundEngine.doubleJump();
      onToast('🚀 ¡Doble Salto!', true);
      // Sparkle particles
      for (let i = 0; i < 10; i++) {
        particlesRef.current.push({
          x: p.x + p.w / 2,
          y: p.y + p.h,
          vx: (Math.random() - 0.5) * 5,
          vy: Math.random() * -3,
          size: 4,
          color: '#38bdf8',
          life: 0.9,
          decay: 0.04,
        });
      }
    }
  }, [onToast]);

  // Fast travel teleport
  const teleportTo = useCallback((x: number) => {
    const p = playerRef.current;
    p.x = Math.max(50, Math.min(WORLD_WIDTH - 100, x));
    p.y = GROUND_Y - 48;
    p.vx = 0;
    p.vy = 0;
    p.grounded = true;
    soundEngine.trampoline();
    onToast('✨ ¡Teletransportada con éxito!', true);
  }, [onToast]);

  useEffect(() => {
    onExecuteJumpRef.current = executeJump;
    onTeleportRef.current = teleportTo;
  }, [executeJump, teleportTo, onExecuteJumpRef, onTeleportRef]);

  // Physics simulation
  const updatePhysics = useCallback(() => {
    const p = playerRef.current;
    const moveSpeed = p.onSkateboard ? 9.2 : 5.4;

    if (deliveryCooldownRef.current > 0) {
      deliveryCooldownRef.current--;
    }

    // Horizontal Movement
    if (inputState.left) {
      p.vx = -moveSpeed;
      p.facing = -1;
      if (p.onSkateboard && Math.random() < 0.2) {
        soundEngine.skateboard();
      }
    } else if (inputState.right) {
      p.vx = moveSpeed;
      p.facing = 1;
      if (p.onSkateboard && Math.random() < 0.2) {
        soundEngine.skateboard();
      }
    } else {
      p.vx *= p.onSkateboard ? 0.92 : 0.74;
      if (Math.abs(p.vx) < 0.1) p.vx = 0;
    }

    // Ladder check
    let touchingLadder = false;
    for (const lad of LADDERS) {
      if (
        p.x + p.w > lad.x &&
        p.x < lad.x + lad.w &&
        p.y + p.h > lad.y &&
        p.y < lad.y + lad.h
      ) {
        touchingLadder = true;
        break;
      }
    }

    if (touchingLadder && inputState.jump) {
      p.onLadder = true;
      p.vy = -5.0; // Climb ladder
    } else if (touchingLadder && p.onLadder) {
      p.vy = 0;
    } else {
      p.onLadder = false;
      // Gravity
      p.vy += 0.52;
      if (p.vy > 14) p.vy = 14;
    }

    // Grounded Coyote Timer
    if (p.grounded) {
      p.coyoteTimer = 8;
      p.canDoubleJump = true;
    } else if (p.coyoteTimer > 0) {
      p.coyoteTimer--;
    }

    p.x += p.vx;
    p.y += p.vy;

    // World Boundaries
    if (p.x < 20) {
      p.x = 20;
      p.vx = 0;
    }
    if (p.x + p.w > WORLD_WIDTH - 20) {
      p.x = WORLD_WIDTH - 20 - p.w;
      p.vx = 0;
    }
    if (p.y > GROUND_Y + 50) {
      p.y = GROUND_Y - p.h;
      p.vy = 0;
    }

    // Platforms Collision
    p.grounded = false;
    for (const plat of TOWN_PLATFORMS) {
      if (
        p.x + p.w > plat.x &&
        p.x < plat.x + plat.w &&
        p.y + p.h >= plat.y &&
        p.y + p.h <= plat.y + plat.h + 16 &&
        p.vy >= 0
      ) {
        p.y = plat.y - p.h;
        p.vy = 0;
        p.grounded = true;
        p.canDoubleJump = true;
        break;
      }
    }

    // Trampolines Jump Pads
    for (const tr of TRAMPOLINES) {
      if (
        p.x + p.w > tr.x &&
        p.x < tr.x + tr.w &&
        p.y + p.h >= tr.y - 4 &&
        p.y + p.h <= tr.y + tr.h + 10 &&
        p.vy >= 0
      ) {
        p.vy = -tr.power;
        p.grounded = false;
        p.canDoubleJump = true;
        soundEngine.trampoline();
        onToast('🌀 ¡Super Trampolín!', true);
        // Particles
        for (let i = 0; i < 14; i++) {
          particlesRef.current.push({
            x: tr.x + tr.w / 2,
            y: tr.y,
            vx: (Math.random() - 0.5) * 6,
            vy: -4 - Math.random() * 4,
            size: 4 + Math.random() * 4,
            color: '#facc15',
            life: 1.0,
            decay: 0.03,
          });
        }
        break;
      }
    }

    // NPC Proximity Check
    let foundNPC: NPC | null = null;
    for (const npc of NPCS) {
      const dist = Math.hypot(p.x + p.w / 2 - (npc.x + 12), p.y - npc.y);
      if (dist < 70) {
        foundNPC = npc;
        break;
      }
    }
    nearNPCRef.current = foundNPC;

    // Word Pickups Collection
    const now = performance.now() * 0.003;
    for (const item of wordPickupsRef.current) {
      if (!item.collected && !carryingWordRef.current) {
        const floatY = item.y + Math.sin(now * 3) * 4;
        if (
          p.x < item.x + item.w &&
          p.x + p.w > item.x &&
          p.y < floatY + item.h &&
          p.y + p.h > floatY
        ) {
          item.collected = true;
          carryingWordRef.current = item;
          deliveryCooldownRef.current = 30;
          soundEngine.pick();
          const meta = CATEGORY_META[item.cat];
          onToast(`📜 ¡Recogiste "${item.word}"! Llévala a su edificio`, true);
          // Sparks
          for (let i = 0; i < 12; i++) {
            particlesRef.current.push({
              x: item.x + item.w / 2,
              y: floatY + item.h / 2,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              size: 4,
              color: meta.color,
              life: 1.0,
              decay: 0.03,
            });
          }
          break;
        }
      }
    }

    // Building Delivery Verification
    const carrying = carryingWordRef.current;
    if (carrying && deliveryCooldownRef.current === 0) {
      for (const b of BUILDINGS) {
        // Door entrance hitbox
        if (
          p.x + p.w > b.doorX &&
          p.x < b.doorX + b.doorW &&
          p.y + p.h > b.doorY &&
          p.y < b.doorY + b.doorH
        ) {
          if (b.acceptedCategory === carrying.cat || (b.id === 'clocktower' && (carrying.cat === 'SINONIMO' || carrying.cat === 'ANTONIMO'))) {
            // Correct delivery!
            soundEngine.deliverySuccess();
            onDeliverySuccess(50);
            onToast(`🎉 ¡EXCELENTE! Entregaste "${carrying.word}" en ${b.name}! +50 Estrellas`, true);
            // Delivery confetti
            for (let i = 0; i < 24; i++) {
              particlesRef.current.push({
                x: b.doorX + b.doorW / 2,
                y: b.doorY,
                vx: (Math.random() - 0.5) * 8,
                vy: -5 - Math.random() * 5,
                size: 5,
                color: ['#facc15', '#38bdf8', '#4ade80', '#f43f5e', '#a855f7'][i % 5],
                life: 1.2,
                decay: 0.02,
              });
            }
            carryingWordRef.current = null;
            deliveryCooldownRef.current = 40;
          } else {
            // Friendly error clue
            soundEngine.error();
            deliveryCooldownRef.current = 50;
            const targetB = BUILDINGS.find((tb) => tb.id === carrying.targetBuildingId);
            onToast(
              `💡 "${carrying.word}" pertenece a ${CATEGORY_META[carrying.cat].title}. ¡Llévala a ${targetB?.name || 'su lugar'}!`,
              false
            );
            p.vx = p.facing > 0 ? -5 : 5;
          }
          break;
        }
      }
    }

    // Update Particles
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const pt = particlesRef.current[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.15;
      pt.life -= pt.decay;
      if (pt.life <= 0) {
        particlesRef.current.splice(i, 1);
      }
    }

    // Smooth Camera Tracking (Horizontal Center + Vertical Follow)
    const container = containerRef.current;
    const viewW = container?.clientWidth || 800;
    const viewH = container?.clientHeight || 600;

    const targetCamX = p.x - viewW / 2 + p.facing * 40;
    const targetCamY = p.y - viewH * 0.65;

    cameraXRef.current += (targetCamX - cameraXRef.current) * 0.12;
    cameraYRef.current += (targetCamY - cameraYRef.current) * 0.1;

    // Clamp camera
    cameraXRef.current = Math.max(0, Math.min(WORLD_WIDTH - viewW, cameraXRef.current));
    cameraYRef.current = Math.max(0, Math.min(WORLD_HEIGHT - viewH + 100, cameraYRef.current));

    // Determine current district
    let districtName = 'Plaza Central y Parque ⛲';
    if (p.x >= 850 && p.x < 1550) districtName = 'Centro Cívico (Escuela) 🏫';
    else if (p.x >= 1550 && p.x < 2250) districtName = 'Paseo Comercial (Heladería) 🍦';
    else if (p.x >= 2250 && p.x < 2950) districtName = 'Barrio Residencial (Casas) 🏡';
    else if (p.x >= 2950) districtName = 'Alturas de la Ciudad (Torre) 🕰️';

    const heightM = Math.max(0, Math.round((GROUND_Y - p.y) / 20));

    onUpdateStats({
      playerX: p.x,
      playerY: p.y,
      heightMeters: heightM,
      currentDistrict: districtName,
      carryingWord: carryingWordRef.current,
      nearNPC: nearNPCRef.current,
    });
  }, [inputState.jump, inputState.left, inputState.right, onDeliverySuccess, onToast, onUpdateStats]);

  // Crisp Canvas Resize with DPR support and ZERO scanlines
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Render Scene
  const renderScene = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const viewW = container.clientWidth;
    const viewH = container.clientHeight;
    const camX = cameraXRef.current;
    const camY = cameraYRef.current;
    const p = playerRef.current;
    const carrying = carryingWordRef.current;
    const now = performance.now() * 0.003;

    ctx.save();
    // Clear and scale
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    // 1. Sky Gradient (Parallax with clouds)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, viewH);
    skyGrad.addColorStop(0, '#0c1a30');
    skyGrad.addColorStop(0.6, '#1e293b');
    skyGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, viewW, viewH);

    // Parallax Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let c = 0; c < 8; c++) {
      const cloudX = ((c * 500 - camX * 0.3 + now * 10) % (WORLD_WIDTH + 500)) - 100;
      const cloudY = 60 + (c % 3) * 50;
      ctx.beginPath();
      ctx.arc(cloudX, cloudY, 40, 0, Math.PI * 2);
      ctx.arc(cloudX + 30, cloudY - 15, 30, 0, Math.PI * 2);
      ctx.arc(cloudX + 60, cloudY, 35, 0, Math.PI * 2);
      ctx.fill();
    }

    // World Space Transform
    ctx.translate(-Math.floor(camX), -Math.floor(camY));

    // 2. Background City Skyline / Mountains
    ctx.fillStyle = '#0f172a';
    for (let b = 0; b < 20; b++) {
      const bx = b * 220;
      const bh = 180 + ((b * 47) % 140);
      ctx.fillRect(bx, GROUND_Y - bh, 180, bh);
      // Skyline windows
      ctx.fillStyle = '#fef08a22';
      for (let wy = GROUND_Y - bh + 20; wy < GROUND_Y - 20; wy += 30) {
        ctx.fillRect(bx + 20, wy, 15, 12);
        ctx.fillRect(bx + 60, wy, 15, 12);
        ctx.fillRect(bx + 100, wy, 15, 12);
      }
      ctx.fillStyle = '#0f172a';
    }

    // 3. Buildings
    for (const b of BUILDINGS) {
      // Main Wall
      ctx.fillStyle = b.wallColor;
      ctx.fillRect(b.x, b.y, b.w, b.h);

      // Wall Stud Highlights
      ctx.fillStyle = b.trimColor + '44';
      ctx.fillRect(b.x, b.y, 8, b.h);
      ctx.fillRect(b.x + b.w - 8, b.y, 8, b.h);

      // Roof
      ctx.fillStyle = b.roofColor;
      ctx.fillRect(b.x - 12, b.y - 16, b.w + 24, 22);
      // Roof Studs
      ctx.fillStyle = '#ffffff44';
      for (let sx = b.x - 4; sx < b.x + b.w + 4; sx += 20) {
        ctx.beginPath();
        ctx.roundRect(sx, b.y - 20, 12, 5, 2);
        ctx.fill();
      }

      // Windows
      ctx.fillStyle = '#38bdf8';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      const numWindowsX = Math.floor(b.w / 90);
      for (let wx = 0; wx < numWindowsX; wx++) {
        const winX = b.x + 30 + wx * 85;
        const winY = b.y + 40;
        ctx.fillRect(winX, winY, 46, 50);
        ctx.strokeRect(winX, winY, 46, 50);
        // Window cross
        ctx.beginPath();
        ctx.moveTo(winX + 23, winY);
        ctx.lineTo(winX + 23, winY + 50);
        ctx.moveTo(winX, winY + 25);
        ctx.lineTo(winX + 46, winY + 25);
        ctx.stroke();
      }

      // Door Entrance (Glowing Portal Pad)
      const isTarget = carrying?.targetBuildingId === b.id;
      ctx.save();
      if (isTarget) {
        ctx.shadowColor = CATEGORY_META[b.acceptedCategory].color;
        ctx.shadowBlur = 24;
      }
      ctx.fillStyle = '#020617';
      ctx.fillRect(b.doorX, b.doorY, b.doorW, b.doorH);
      ctx.strokeStyle = CATEGORY_META[b.acceptedCategory].color;
      ctx.lineWidth = isTarget ? 4 : 2;
      ctx.strokeRect(b.doorX, b.doorY, b.doorW, b.doorH);

      // Swirling portal effect inside door
      const portalGrad = ctx.createLinearGradient(b.doorX, b.doorY, b.doorX, b.doorY + b.doorH);
      portalGrad.addColorStop(0, CATEGORY_META[b.acceptedCategory].color + 'aa');
      portalGrad.addColorStop(1, '#020617');
      ctx.fillStyle = portalGrad;
      ctx.fillRect(b.doorX + 4, b.doorY + 4, b.doorW - 8, b.doorH - 4);

      // Door Mat / Stud Pad
      ctx.fillStyle = CATEGORY_META[b.acceptedCategory].color;
      ctx.fillRect(b.doorX - 6, b.doorY + b.doorH - 4, b.doorW + 12, 6);

      // Building Header Billboard Sign
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#090d16';
      ctx.beginPath();
      ctx.roundRect(b.x + b.w / 2 - 120, b.y - 48, 240, 28, 6);
      ctx.fill();
      ctx.strokeStyle = CATEGORY_META[b.acceptedCategory].color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(b.name, b.x + b.w / 2, b.y - 34);

      ctx.fillStyle = CATEGORY_META[b.acceptedCategory].color;
      ctx.font = 'bold 9px Quicksand, sans-serif';
      ctx.fillText(CATEGORY_META[b.acceptedCategory].title, b.x + b.w / 2, b.y - 22);

      // Bounce Cue if this is target
      if (isTarget) {
        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 12px sans-serif';
        const bounce = Math.sin(now * 8) * 4;
        ctx.fillText('👇 ¡ENTRA AQUÍ! 👇', b.doorX + b.doorW / 2, b.doorY - 10 + bounce);
      }
      ctx.restore();
    }

    // 4. Props (Trees, Fountain, Streetlights, Benches)
    for (const prop of WORLD_PROPS) {
      if (prop.type === 'tree') {
        // Trunk
        ctx.fillStyle = '#78350f';
        ctx.fillRect(prop.x + 16, prop.y - 65, 14, 65);
        // Foliage blocks
        ctx.fillStyle = '#16a34a';
        ctx.beginPath();
        ctx.roundRect(prop.x - 10, prop.y - 120, 66, 65, 12);
        ctx.fill();
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.roundRect(prop.x - 2, prop.y - 145, 50, 45, 10);
        ctx.fill();
      } else if (prop.type === 'fountain') {
        // Fountain basin
        ctx.fillStyle = '#64748b';
        ctx.fillRect(prop.x - 40, prop.y - 28, 80, 28);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(prop.x - 34, prop.y - 24, 68, 10);
        // Water jet
        ctx.fillStyle = '#e0f2fe';
        ctx.fillRect(prop.x - 3, prop.y - 60, 6, 36);
        ctx.beginPath();
        ctx.arc(prop.x, prop.y - 60, 8, 0, Math.PI * 2);
        ctx.fill();
      } else if (prop.type === 'streetlight') {
        // Post
        ctx.fillStyle = '#334155';
        ctx.fillRect(prop.x + 4, prop.y - 75, 5, 75);
        // Lamp head
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(prop.x + 6, prop.y - 78, 8, 0, Math.PI * 2);
        ctx.fill();
        // Light glow cone
        const lightGrad = ctx.createRadialGradient(
          prop.x + 6,
          prop.y - 78,
          4,
          prop.x + 6,
          prop.y - 78,
          50
        );
        lightGrad.addColorStop(0, 'rgba(250, 204, 21, 0.35)');
        lightGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
        ctx.fillStyle = lightGrad;
        ctx.beginPath();
        ctx.arc(prop.x + 6, prop.y - 78, 50, 0, Math.PI * 2);
        ctx.fill();
      } else if (prop.type === 'bench') {
        ctx.fillStyle = '#b45309';
        ctx.fillRect(prop.x, prop.y - 18, 48, 6);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(prop.x + 4, prop.y - 12, 4, 12);
        ctx.fillRect(prop.x + 40, prop.y - 12, 4, 12);
      }
    }

    // 5. Platforms & Road
    for (const plat of TOWN_PLATFORMS) {
      ctx.fillStyle = plat.color;
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      ctx.fillStyle = plat.studColor;
      for (let sx = plat.x + 6; sx < plat.x + plat.w - 6; sx += 18) {
        ctx.beginPath();
        ctx.roundRect(sx, plat.y - 3, 10, 3, 1);
        ctx.fill();
      }
    }

    // 6. Ladders
    for (const lad of LADDERS) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(lad.x, lad.y, 4, lad.h);
      ctx.fillRect(lad.x + lad.w - 4, lad.y, 4, lad.h);
      for (let ry = lad.y + 10; ry < lad.y + lad.h; ry += 16) {
        ctx.fillRect(lad.x, ry, lad.w, 3);
      }
    }

    // 7. Trampolines (Jump pads)
    for (const tr of TRAMPOLINES) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(tr.x - 2, tr.y + tr.h - 4, tr.w + 4, 6);
      ctx.fillStyle = '#eab308';
      ctx.fillRect(tr.x, tr.y, tr.w, tr.h);
      // Arrow indicator
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(tr.x + tr.w / 2, tr.y + 2);
      ctx.lineTo(tr.x + tr.w / 2 - 8, tr.y + 10);
      ctx.lineTo(tr.x + tr.w / 2 + 8, tr.y + 10);
      ctx.fill();
    }

    // 8. NPCs with Roblox proportions and speech prompts
    for (const npc of NPCS) {
      const nx = npc.x;
      const ny = npc.y;
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(nx + 12, ny + 32, 12, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      // Body
      ctx.fillStyle = npc.avatarColor;
      ctx.fillRect(nx + 4, ny + 10, 16, 12);
      // Head
      ctx.fillStyle = '#facc15';
      ctx.fillRect(nx + 5, ny, 14, 10);
      // Hair
      ctx.fillStyle = npc.hairColor;
      ctx.fillRect(nx + 4, ny - 2, 16, 5);
      // Eyes
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(nx + 8, ny + 3, 2, 2);
      ctx.fillRect(nx + 13, ny + 3, 2, 2);
      // Legs
      ctx.fillStyle = '#334155';
      ctx.fillRect(nx + 4, ny + 22, 6, 10);
      ctx.fillRect(nx + 14, ny + 22, 6, 10);

      // Name Tag Billboard
      ctx.fillStyle = '#090d16dd';
      ctx.beginPath();
      ctx.roundRect(nx + 12 - 40, ny - 24, 80, 18, 4);
      ctx.fill();
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 8.5px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(npc.name, nx + 12, ny - 12);

      // Interactive cue if near player
      if (nearNPCRef.current === npc) {
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 10px sans-serif';
        const bounce = Math.sin(now * 8) * 3;
        ctx.fillText('💬 ¡HABLAR!', nx + 12, ny - 30 + bounce);
      }
    }

    // 9. Floating Word Pickups (Parchments)
    for (const item of wordPickupsRef.current) {
      if (item.collected) continue;
      const floatY = item.y + Math.sin(now * 3 + (item.x % 10)) * 4;

      ctx.save();
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(item.x + item.w / 2, floatY + item.h + 6, item.w / 2, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Parchment
      ctx.shadowColor = CATEGORY_META[item.cat].color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#fef08a';
      ctx.strokeStyle = CATEGORY_META[item.cat].color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(item.x, floatY, item.w, item.h, 6);
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 9.5px Quicksand, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('📜 ' + item.word, item.x + item.w / 2, floatY + 16);
      ctx.restore();
    }

    // 10. Trajectory Arrow toward destination when carrying a word
    if (carrying) {
      const targetBuilding = BUILDINGS.find((b) => b.id === carrying.targetBuildingId);
      if (targetBuilding) {
        const destX = targetBuilding.doorX + targetBuilding.doorW / 2;
        const destY = targetBuilding.doorY + targetBuilding.doorH / 2;
        const startX = p.x + p.w / 2;
        const startY = p.y - 15;
        const dx = destX - startX;
        const dy = destY - startY;
        const dist = Math.hypot(dx, dy);

        if (dist > 30) {
          const angle = Math.atan2(dy, dx);
          const numSteps = Math.min(8, Math.floor(dist / 60));
          ctx.save();
          ctx.shadowColor = CATEGORY_META[carrying.cat].color;
          ctx.shadowBlur = 12;
          ctx.fillStyle = CATEGORY_META[carrying.cat].color;

          const phase = (now * 2) % 1;
          for (let s = 1; s <= numSteps; s++) {
            const frac = (s + phase) / (numSteps + 1);
            if (frac > 1) continue;
            const ax = startX + dx * frac;
            const ay = startY + dy * frac;

            ctx.save();
            ctx.translate(ax, ay);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(9, 0);
            ctx.lineTo(-6, -6);
            ctx.lineTo(-3, 0);
            ctx.lineTo(-6, 6);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          }
          ctx.restore();
        }
      }
    }

    // 11. Particles
    for (const pt of particlesRef.current) {
      ctx.save();
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = Math.max(0, pt.life);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 12. Player Avatar (Customized Clothes, Skateboard, Accessories)
    const px = p.x;
    const py = p.y;

    ctx.save();
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(px + p.w / 2, py + p.h + 1, p.w / 2 + 2, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Skateboard under feet
    if (p.onSkateboard) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(px - 4, py + p.h - 4, p.w + 8, 4);
      // Skateboard wheels
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(px, py + p.h + 1, 2.5, 0, Math.PI * 2);
      ctx.arc(px + p.w, py + p.h + 1, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Legs
    ctx.fillStyle = avatarStyle.pantsColor;
    ctx.fillRect(px + 4, py + 25, 7.5, 11);
    ctx.fillRect(px + 14.5, py + 25, 7.5, 11);

    // Torso (Shirt)
    ctx.fillStyle = avatarStyle.shirtColor;
    ctx.beginPath();
    ctx.roundRect(px + 3, py + 12, p.w - 6, 14, 2);
    ctx.fill();

    // Arms
    ctx.fillStyle = avatarStyle.skinColor;
    if (p.facing > 0) {
      ctx.fillRect(px + p.w - 3, py + 13, 4, 12);
    } else {
      ctx.fillRect(px - 1, py + 13, 4, 12);
    }

    // Head
    ctx.fillStyle = avatarStyle.skinColor;
    ctx.beginPath();
    ctx.roundRect(px + 4, py + 1, 18, 12, 2);
    ctx.fill();

    // Head Stud
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.roundRect(px + 10, py - 2, 6, 3, 1);
    ctx.fill();

    // Hair
    ctx.fillStyle = avatarStyle.hairColor;
    if (avatarStyle.hairStyle === 'pigtails') {
      ctx.beginPath();
      ctx.arc(px + 4, py + 3, 4, 0, Math.PI * 2);
      ctx.arc(px + 22, py + 3, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(px + 4, py - 1, 18, 4);
    } else if (avatarStyle.hairStyle === 'cap') {
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(px + 3, py - 2, 20, 5);
      ctx.fillRect(px + (p.facing > 0 ? 12 : -2), py + 1, 10, 2);
    } else {
      ctx.fillRect(px + 4, py - 1, 18, 4);
    }

    // Face
    ctx.fillStyle = '#0f172a';
    const eyeOffset = p.facing > 0 ? 3 : 1;
    ctx.fillRect(px + 8 + eyeOffset, py + 4, 2, 2);
    ctx.fillRect(px + 13 + eyeOffset, py + 4, 2, 2);
    ctx.fillRect(px + 9 + eyeOffset, py + 8, 5, 1.5);

    // Accessories
    if (avatarStyle.accessory === 'star_hat') {
      ctx.fillStyle = '#fde047';
      ctx.font = '14px sans-serif';
      ctx.fillText('⭐', px + 7, py - 3);
    } else if (avatarStyle.accessory === 'headphones') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(px + 13, py + 3, 11, Math.PI, 0);
      ctx.stroke();
    } else if (avatarStyle.accessory === 'backpack') {
      ctx.fillStyle = '#b45309';
      ctx.fillRect(px + (p.facing > 0 ? -2 : p.w), py + 14, 4, 9);
    }

    // Carried Word Floating Badge above avatar
    if (carrying) {
      const badgeW = 96;
      const badgeH = 22;
      const badgeX = px + p.w / 2 - badgeW / 2;
      const badgeY = py - 32;

      ctx.shadowColor = CATEGORY_META[carrying.cat].color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#fde047';
      ctx.strokeStyle = CATEGORY_META[carrying.cat].color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 5);
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#713f12';
      ctx.font = 'bold 9.5px Quicksand, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🎒 ' + carrying.word, px + p.w / 2, badgeY + 15);
    }

    ctx.restore(); // Character
    ctx.restore(); // World
    ctx.restore(); // Main
  }, [avatarStyle, carryingWordRef]);

  // Main animation frame loop
  useEffect(() => {
    let animId: number;

    const loop = () => {
      try {
        updatePhysics();
        renderScene();
      } catch (err) {
        console.error('Canvas loop error:', err);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [updatePhysics, renderScene]);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 w-full h-full bg-slate-950 overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full bg-slate-950" />
    </div>
  );
};
