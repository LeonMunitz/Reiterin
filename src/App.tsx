/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { soundEngine } from './audio';
import { AvatarCustomizerModal } from './components/AvatarCustomizerModal';
import { HeaderHUD } from './components/HeaderHUD';
import { InfoGuideModal } from './components/InfoGuideModal';
import { NPCDialogueModal } from './components/NPCDialogueModal';
import { QuestBanner } from './components/QuestBanner';
import { RobloxCanvas } from './components/RobloxCanvas';
import { TouchFooter } from './components/TouchFooter';
import { TownMapModal } from './components/TownMapModal';
import { AvatarStyle, NPC, WordPickup } from './types';

export default function App() {
  // Game state
  const [score, setScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(100);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [onSkateboard, setOnSkateboard] = useState<boolean>(false);

  // Avatar customization
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>({
    skinColor: '#facc15',
    hairColor: '#78350f',
    hairStyle: 'pigtails',
    shirtColor: '#ec4899',
    pantsColor: '#1e40af',
    accessory: 'star_hat',
  });

  // World Stats from Canvas
  const [playerX, setPlayerX] = useState<number>(460);
  const [playerY, setPlayerY] = useState<number>(700);
  const [heightMeters, setHeightMeters] = useState<number>(0);
  const [currentDistrict, setCurrentDistrict] = useState<string>('Plaza Central y Parque ⛲');
  const [carryingWord, setCarryingWord] = useState<WordPickup | null>(null);
  const [nearNPC, setNearNPC] = useState<NPC | null>(null);

  // Modals
  const [customizerOpen, setCustomizerOpen] = useState<boolean>(false);
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [dialogueNPC, setDialogueNPC] = useState<NPC | null>(null);

  // Toasts
  const [toast, setToast] = useState<{ msg: string; isSuccess: boolean; visible: boolean }>({
    msg: '',
    isSuccess: true,
    visible: false,
  });
  const toastTimeoutRef = useRef<number | null>(null);

  // Input states
  const [inputState, setInputState] = useState({
    left: false,
    right: false,
    jump: false,
  });

  const executeJumpRef = useRef<(() => void) | null>(null);
  const teleportRef = useRef<((x: number) => void) | null>(null);

  const showToast = useCallback((msg: string, isSuccess: boolean) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ msg, isSuccess, visible: true });
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  }, []);

  const handleDeliverySuccess = useCallback((reward: number) => {
    setScore((prev) => prev + reward);
    setCoins((prev) => prev + 25);
  }, []);

  const toggleSound = useCallback(() => {
    soundEngine.enabled = !soundEngine.enabled;
    setSoundEnabled(soundEngine.enabled);
  }, []);

  const toggleSkateboard = useCallback(() => {
    soundEngine.init();
    setOnSkateboard((prev) => {
      const next = !prev;
      if (next) {
        soundEngine.skateboard();
        showToast('🛹 ¡Patineta activada! Mayor velocidad para recorrer la ciudad', true);
      } else {
        showToast('👟 Ahora vas a pie', true);
      }
      return next;
    });
  }, [showToast]);

  const handleInteract = useCallback(() => {
    soundEngine.init();
    if (nearNPC) {
      soundEngine.dialogueBlip();
      setDialogueNPC(nearNPC);
    } else {
      showToast('💡 Acércate a un vecino o a la maestra para hablar 💬', true);
    }
  }, [nearNPC, showToast]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      soundEngine.init();
      const key = e.key.toLowerCase();

      if (key === 'arrowleft' || key === 'a') {
        setInputState((prev) => ({ ...prev, left: true }));
      } else if (key === 'arrowright' || key === 'd') {
        setInputState((prev) => ({ ...prev, right: true }));
      } else if (key === 'arrowup' || key === 'w' || key === ' ') {
        setInputState((prev) => {
          if (!prev.jump && executeJumpRef.current) {
            executeJumpRef.current();
          }
          return { ...prev, jump: true };
        });
        e.preventDefault();
      } else if (key === 'q') {
        toggleSkateboard();
      } else if (key === 'e') {
        handleInteract();
      } else if (key === 'm') {
        setMapOpen((prev) => !prev);
      } else if (key === 'c') {
        setCustomizerOpen((prev) => !prev);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'arrowleft' || key === 'a') {
        setInputState((prev) => ({ ...prev, left: false }));
      } else if (key === 'arrowright' || key === 'd') {
        setInputState((prev) => ({ ...prev, right: false }));
      } else if (key === 'arrowup' || key === 'w' || key === ' ') {
        setInputState((prev) => ({ ...prev, jump: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleInteract, toggleSkateboard]);

  return (
    <div className="bg-slate-950 text-slate-100 flex flex-col items-center justify-center w-full min-h-screen p-0 m-0 overflow-hidden select-none">
      {/* Spacious Full-width or Centered Game Frame (no cramped borders!) */}
      <div className="relative w-full h-[100dvh] max-w-6xl bg-slate-950 flex flex-col shadow-2xl overflow-hidden md:border-x md:border-indigo-900/50">
        {/* Header HUD */}
        <HeaderHUD
          score={score}
          coins={coins}
          heightMeters={heightMeters}
          currentDistrict={currentDistrict}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onOpenCustomizer={() => setCustomizerOpen(true)}
          onOpenMap={() => setMapOpen(true)}
          onOpenInfo={() => setInfoOpen(true)}
        />

        {/* Quest & Vehicle Guidance Banner */}
        <QuestBanner
          carryingWord={carryingWord}
          playerX={playerX}
          onSkateboard={onSkateboard}
          onToggleSkateboard={toggleSkateboard}
        />

        {/* Open World Exploration Viewport Canvas */}
        <div className="relative flex-1 w-full h-full bg-slate-950 overflow-hidden">
          <RobloxCanvas
            avatarStyle={avatarStyle}
            onSkateboard={onSkateboard}
            inputState={inputState}
            onUpdateStats={({
              playerX: px,
              playerY: py,
              heightMeters: hm,
              currentDistrict: cd,
              carryingWord: cw,
              nearNPC: npc,
            }) => {
              setPlayerX(px);
              setPlayerY(py);
              setHeightMeters(hm);
              setCurrentDistrict(cd);
              setCarryingWord(cw);
              setNearNPC(npc);
            }}
            onExecuteJumpRef={executeJumpRef}
            onTeleportRef={teleportRef}
            onToast={showToast}
            onDeliverySuccess={handleDeliverySuccess}
          />

          {/* Toast Notification */}
          <div
            className={`pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all duration-300 z-40 shadow-2xl flex items-center justify-center gap-1.5 text-center max-w-[90%] ${
              toast.visible ? 'opacity-100 scale-100' : 'opacity-0 -translate-y-4 pointer-events-none'
            } ${
              toast.isSuccess
                ? 'bg-emerald-500 text-slate-950 border border-emerald-300'
                : 'bg-amber-500 text-slate-950 border border-amber-300'
            }`}
          >
            {toast.msg}
          </div>

          {/* Quick Talk Prompt when walking near NPC */}
          {nearNPC && !dialogueNPC && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
              <button
                onClick={handleInteract}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black rounded-2xl text-xs shadow-xl border-2 border-white flex items-center gap-2 game-button animate-bounce cursor-pointer"
              >
                <span>💬</span>
                <span>Hablar con {nearNPC.name}</span>
                <span className="text-[10px] bg-emerald-950/40 text-emerald-950 px-1.5 py-0.2 rounded font-bold hidden sm:inline">
                  (Tecla E)
                </span>
              </button>
            </div>
          )}

          {/* Avatar Customizer Modal (Brookhaven Dressing Room) */}
          <AvatarCustomizerModal
            isOpen={customizerOpen}
            onClose={() => setCustomizerOpen(false)}
            avatarStyle={avatarStyle}
            onChangeStyle={setAvatarStyle}
          />

          {/* Town Map Modal (Fast Travel) */}
          <TownMapModal
            isOpen={mapOpen}
            onClose={() => setMapOpen(false)}
            playerX={playerX}
            onTeleportTo={(x) => {
              if (teleportRef.current) {
                teleportRef.current(x);
              }
            }}
          />

          {/* NPC Dialogue Modal */}
          <NPCDialogueModal npc={dialogueNPC} onClose={() => setDialogueNPC(null)} />

          {/* Educational Guide Modal */}
          <InfoGuideModal isOpen={infoOpen} onClose={() => setInfoOpen(false)} />
        </div>

        {/* Touch & Keyboard Action Deck */}
        <TouchFooter
          onLeftPress={() => setInputState((prev) => ({ ...prev, left: true }))}
          onLeftRelease={() => setInputState((prev) => ({ ...prev, left: false }))}
          onRightPress={() => setInputState((prev) => ({ ...prev, right: true }))}
          onRightRelease={() => setInputState((prev) => ({ ...prev, right: false }))}
          onJumpPress={() => {
            soundEngine.init();
            if (executeJumpRef.current) {
              executeJumpRef.current();
            }
          }}
          onJumpRelease={() => setInputState((prev) => ({ ...prev, jump: false }))}
          onInteract={handleInteract}
          onToggleSkateboard={toggleSkateboard}
          onSkateboard={onSkateboard}
          nearNPC={nearNPC !== null}
        />
      </div>
    </div>
  );
}
