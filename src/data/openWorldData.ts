import {
  BuildingZone,
  CategoryMeta,
  CategoryType,
  Ladder,
  NPC,
  Platform,
  Quest,
  Trampoline,
  WordItem,
  WorldProp,
} from '../types';

export const CATEGORY_META: Record<CategoryType, CategoryMeta> = {
  PROPIO: {
    title: 'SUSTANTIVO PROPIO',
    sub: 'Nombres / Lugares (Mayúscula)',
    color: '#38bdf8',
    badgeBg: 'bg-blue-600',
    badgeText: 'text-white',
    arrowColor: '#38bdf8',
    icon: '🔵',
  },
  COMUN: {
    title: 'SUSTANTIVO COMÚN',
    sub: 'Cosas / Animales / Objetos',
    color: '#22c55e',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    arrowColor: '#22c55e',
    icon: '🟢',
  },
  ADJETIVO: {
    title: 'ADJETIVO',
    sub: 'Cualidades / Cómo es',
    color: '#f97316',
    badgeBg: 'bg-amber-600',
    badgeText: 'text-white',
    arrowColor: '#f97316',
    icon: '🟠',
  },
  SINONIMO: {
    title: 'SINÓNIMO',
    sub: 'Significado parecido',
    color: '#d946ef',
    badgeBg: 'bg-fuchsia-600',
    badgeText: 'text-white',
    arrowColor: '#d946ef',
    icon: '🟣',
  },
  ANTONIMO: {
    title: 'ANTÓNIMO',
    sub: 'Significado opuesto',
    color: '#a855f7',
    badgeBg: 'bg-purple-600',
    badgeText: 'text-white',
    arrowColor: '#a855f7',
    icon: '🟣',
  },
};

export const WORLD_WIDTH = 3800;
export const WORLD_HEIGHT = 850;
export const GROUND_Y = 740;

export const BUILDINGS: BuildingZone[] = [
  {
    id: 'school',
    name: 'Escuela y Biblioteca del Saber',
    icon: '🏫',
    district: 'Centro Cívico',
    x: 920,
    y: 440,
    w: 480,
    h: 300,
    roofColor: '#1e3a8a',
    wallColor: '#e0f2fe',
    trimColor: '#0284c7',
    doorX: 1110,
    doorY: 660,
    doorW: 100,
    doorH: 80,
    acceptedCategory: 'PROPIO',
    description: 'Entrega aquí los Sustantivos Propios (personas, ciudades, países).',
  },
  {
    id: 'icecream',
    name: 'Heladería "Doble Bola"',
    icon: '🍦',
    district: 'Paseo Comercial',
    x: 1650,
    y: 490,
    w: 390,
    h: 250,
    roofColor: '#e11d48',
    wallColor: '#ffe4e6',
    trimColor: '#f43f5e',
    doorX: 1795,
    doorY: 660,
    doorW: 100,
    doorH: 80,
    acceptedCategory: 'ADJETIVO',
    description: 'Lleva Adjetivos que describan los sabores, texturas y colores de los helados.',
  },
  {
    id: 'houses',
    name: 'Casas Residenciales Brookhaven',
    icon: '🏡',
    district: 'Barrio Verde',
    x: 2320,
    y: 460,
    w: 460,
    h: 280,
    roofColor: '#15803d',
    wallColor: '#fef3c7',
    trimColor: '#16a34a',
    doorX: 2500,
    doorY: 660,
    doorW: 100,
    doorH: 80,
    acceptedCategory: 'COMUN',
    description: 'Los vecinos necesitan Sustantivos Comunes para sus hogares y jardines.',
  },
  {
    id: 'clocktower',
    name: 'Torre del Reloj & Observatorio',
    icon: '🕰️',
    district: 'Alturas de la Ciudad',
    x: 3050,
    y: 280,
    w: 340,
    h: 460,
    roofColor: '#7e22ce',
    wallColor: '#ede9fe',
    trimColor: '#9333ea',
    doorX: 3170,
    doorY: 660,
    doorW: 100,
    doorH: 80,
    acceptedCategory: 'SINONIMO',
    description: 'Combina pares de Sinónimos y Antónimos en la gran maquinaria del reloj.',
  },
];

export const TOWN_PLATFORMS: Platform[] = [
  // Suelo principal
  { x: 0, y: GROUND_Y, w: WORLD_WIDTH, h: 110, color: '#166534', studColor: '#22c55e' },
  // Camino / Calle de asfalto en el suelo
  { x: 100, y: GROUND_Y - 4, w: WORLD_WIDTH - 200, h: 8, color: '#334155', studColor: '#475569' },

  // Plataformas del Parque
  { x: 260, y: 640, w: 160, h: 20, color: '#0284c7', studColor: '#38bdf8' },
  { x: 460, y: 550, w: 160, h: 20, color: '#059669', studColor: '#34d399' },
  { x: 660, y: 460, w: 180, h: 20, color: '#d97706', studColor: '#fbbf24' },

  // Tejado de la Escuela
  { x: 900, y: 440, w: 520, h: 24, color: '#1e3a8a', studColor: '#3b82f6' },
  { x: 1060, y: 350, w: 200, h: 20, color: '#2563eb', studColor: '#60a5fa' }, // Tejado superior

  // Tejado de la Heladería
  { x: 1630, y: 490, w: 430, h: 24, color: '#be123c', studColor: '#f43f5e' },
  { x: 1760, y: 400, w: 170, h: 20, color: '#fb7185', studColor: '#fda4af' },

  // Tejado y balcones de Casas
  { x: 2300, y: 460, w: 500, h: 24, color: '#15803d', studColor: '#22c55e' },
  { x: 2460, y: 370, w: 180, h: 20, color: '#16a34a', studColor: '#4ade80' },

  // Niveles de la Torre del Reloj
  { x: 3030, y: 570, w: 380, h: 20, color: '#6b21a8', studColor: '#a855f7' },
  { x: 3070, y: 430, w: 300, h: 20, color: '#7e22ce', studColor: '#c084fc' },
  { x: 3110, y: 280, w: 220, h: 22, color: '#9333ea', studColor: '#d8b4fe' },
];

export const LADDERS: Ladder[] = [
  { x: 910, y: 450, w: 26, h: 290 }, // Escalera lateral escuela
  { x: 1640, y: 500, w: 26, h: 240 }, // Escalera heladería
  { x: 2310, y: 470, w: 26, h: 270 }, // Escalera casas
  { x: 3040, y: 580, w: 26, h: 160 }, // Escalera baja torre
  { x: 3350, y: 440, w: 26, h: 140 }, // Escalera media torre
];

export const TRAMPOLINES: Trampoline[] = [
  { x: 740, y: GROUND_Y - 14, w: 60, h: 14, power: 18.5 }, // Parque jump pad
  { x: 1480, y: GROUND_Y - 14, w: 60, h: 14, power: 17.5 }, // Entre escuela y heladería
  { x: 2150, y: GROUND_Y - 14, w: 60, h: 14, power: 18.0 }, // Entre heladería y casas
  { x: 2920, y: GROUND_Y - 14, w: 60, h: 14, power: 21.0 }, // Super bounce hacia la Torre
  { x: 3180, y: 556, w: 60, h: 14, power: 18.0 }, // Trampolín en la Torre
];

export const WORLD_PROPS: WorldProp[] = [
  { type: 'tree', x: 80, y: GROUND_Y },
  { type: 'tree', x: 220, y: GROUND_Y },
  { type: 'bench', x: 340, y: GROUND_Y },
  { type: 'fountain', x: 500, y: GROUND_Y },
  { type: 'streetlight', x: 620, y: GROUND_Y },
  { type: 'tree', x: 860, y: GROUND_Y },
  { type: 'streetlight', x: 1430, y: GROUND_Y },
  { type: 'hydrant', x: 1580, y: GROUND_Y },
  { type: 'streetlight', x: 2110, y: GROUND_Y },
  { type: 'tree', x: 2240, y: GROUND_Y },
  { type: 'bench', x: 2820, y: GROUND_Y },
  { type: 'streetlight', x: 2990, y: GROUND_Y },
  { type: 'tree', x: 3500, y: GROUND_Y },
  { type: 'tree', x: 3680, y: GROUND_Y },
];

export const NPCS: NPC[] = [
  {
    id: 'mateo',
    name: 'Mateo (Explorador)',
    role: 'Guía del Parque',
    avatarColor: '#f59e0b',
    hairColor: '#451a03',
    x: 430,
    y: GROUND_Y - 32,
    dialogue: [
      '¡Hola! ¡Bienvenida a Villa Brookhaven de Lenguaje! 🌆',
      'Puedes usar tu patineta 🛹 con el botón de abajo para recorrer la ciudad volando.',
      'Sube por escaleras y salta en los trampolines amarillos para explorar los techos. ¡Hay pergaminos escondidos!',
    ],
  },
  {
    id: 'sofia',
    name: 'Maestra Sofía',
    role: 'Directora de la Escuela',
    avatarColor: '#0284c7',
    hairColor: '#78350f',
    x: 1040,
    y: GROUND_Y - 32,
    dialogue: [
      '¡Bienvenida a la Escuela y Biblioteca! 📚',
      'Aquí registramos los SUSTANTIVOS PROPIOS: nombres de personas (Nahuel, Sofía) y lugares (Argentina, Buenos Aires).',
      '¡Recuerda que siempre se escriben con mayúscula inicial! Si encuentras uno, tráelo a mi puerta.',
    ],
  },
  {
    id: 'tito',
    name: 'Heladero Tito',
    role: 'Chef de Heladería',
    avatarColor: '#ec4899',
    hairColor: '#172554',
    x: 1730,
    y: GROUND_Y - 32,
    dialogue: [
      '¡Hola, amiga! ¡Vendo los mejores helados de Brookhaven! 🍦',
      'Necesito ADJETIVOS para escribir el cartel de sabores: "cremoso", "frío", "delicioso", "dorado"...',
      'Los adjetivos describen cómo son las cosas. ¡Si agarras uno, tráemelo para ganar estrellas!',
    ],
  },
  {
    id: 'flor',
    name: 'Vecina Flor',
    role: 'Jardinera de Brookhaven',
    avatarColor: '#10b981',
    hairColor: '#d97706',
    x: 2430,
    y: GROUND_Y - 32,
    dialogue: [
      '¡Qué lindo día en el barrio! 🏡',
      'En nuestras casas usamos SUSTANTIVOS COMUNES: "bicicleta", "árbol", "perro", "mochila", "ventana"...',
      'Nombran cosas del mundo en general. ¡Tráelos a las casas para completar las entregas!',
    ],
  },
  {
    id: 'horacio',
    name: 'Don Horacio',
    role: 'Guardián del Reloj',
    avatarColor: '#8b5cf6',
    hairColor: '#e2e8f0',
    x: 3120,
    y: GROUND_Y - 32,
    dialogue: [
      '¡Tic-tac! ¡Saludos desde las alturas de la Torre! 🕰️',
      'Aquí estudiamos los SINÓNIMOS (palabras que significan lo mismo) y ANTÓNIMOS (las opuestas).',
      '¡Usa el super trampolín de abajo para rebotar hasta lo más alto!',
    ],
  },
];

export const INITIAL_WORDS: WordItem[] = [
  // Propios
  { id: 'w1', word: 'Argentina', cat: 'PROPIO', hint: 'Nombre de país (empieza con Mayúscula)', explanation: 'Sustantivo Propio: nombra un país específico.' },
  { id: 'w2', word: 'Nahuel', cat: 'PROPIO', hint: 'Nombre de persona (con Mayúscula)', explanation: 'Sustantivo Propio: identifica a un individuo.' },
  { id: 'w3', word: 'Patagonia', cat: 'PROPIO', hint: 'Nombre de una región geográfica', explanation: 'Sustantivo Propio: región geográfica.' },
  { id: 'w4', word: 'Mendoza', cat: 'PROPIO', hint: 'Nombre propio de una provincia/ciudad', explanation: 'Sustantivo Propio: provincia.' },
  { id: 'w5', word: 'Luna (mascota)', cat: 'PROPIO', hint: 'Nombre propio individual de una mascota', explanation: 'Sustantivo Propio: nombre propio.' },

  // Comunes
  { id: 'w6', word: 'bicicleta', cat: 'COMUN', hint: 'Vehículo a pedales: sustantivo común', explanation: 'Sustantivo Común: objeto físico general.' },
  { id: 'w7', word: 'mochila', cat: 'COMUN', hint: 'Objeto para guardar útiles', explanation: 'Sustantivo Común: objeto cotidiano.' },
  { id: 'w8', word: 'perro', cat: 'COMUN', hint: 'Animal doméstico en general', explanation: 'Sustantivo Común: animal general.' },
  { id: 'w9', word: 'libro', cat: 'COMUN', hint: 'Objeto de lectura general', explanation: 'Sustantivo Común: cosa física.' },
  { id: 'w10', word: 'árbol', cat: 'COMUN', hint: 'Ser vegetal común', explanation: 'Sustantivo Común: elemento de la naturaleza.' },

  // Adjetivos
  { id: 'w11', word: 'cremoso', cat: 'ADJETIVO', hint: 'Describe la textura del helado (cualidad)', explanation: 'Adjetivo: cualidad o característica.' },
  { id: 'w12', word: 'valiente', cat: 'ADJETIVO', hint: 'Describe el carácter de un héroe', explanation: 'Adjetivo: cualidad de un ser.' },
  { id: 'w13', word: 'delicioso', cat: 'ADJETIVO', hint: 'Describe qué tan rico es un alimento', explanation: 'Adjetivo: cualidad sensitiva.' },
  { id: 'w14', word: 'veloz', cat: 'ADJETIVO', hint: 'Describe la rapidez de la patineta', explanation: 'Adjetivo: cualidad de velocidad.' },
  { id: 'w15', word: 'luminoso', cat: 'ADJETIVO', hint: 'Que emite mucha luz y brillo', explanation: 'Adjetivo: cualidad visual.' },

  // Sinónimos / Antónimos
  { id: 'w16', word: 'rápido = veloz', cat: 'SINONIMO', hint: 'Palabras con significado similar', explanation: 'Sinónimos: expresan la misma idea.' },
  { id: 'w17', word: 'enorme = gigante', cat: 'SINONIMO', hint: 'Palabras semejantes de gran tamaño', explanation: 'Sinónimos: idéntica magnitud.' },
  { id: 'w18', word: 'luz ≠ oscuridad', cat: 'ANTONIMO', hint: 'Palabras contrarias u opuestas', explanation: 'Antónimos: conceptos contrarios.' },
  { id: 'w19', word: 'valiente ≠ cobarde', cat: 'ANTONIMO', hint: 'Significados inversos de valentía', explanation: 'Antónimos: conceptos opuestos.' },
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'Registro de Sustantivos Propios',
    description: 'Encuentra un Sustantivo Propio (con Mayúscula) y llévalo a la Escuela.',
    giver: 'Maestra Sofía',
    targetCategory: 'PROPIO',
    targetBuilding: 'school',
    targetBuildingName: 'Escuela y Biblioteca',
    completed: false,
    xp: 40,
  },
  {
    id: 'q2',
    title: 'Sabor Especial en la Heladería',
    description: 'Recoge un Adjetivo sabroso y llévalo a la Heladería "Doble Bola".',
    giver: 'Heladero Tito',
    targetCategory: 'ADJETIVO',
    targetBuilding: 'icecream',
    targetBuildingName: 'Heladería',
    completed: false,
    xp: 40,
  },
  {
    id: 'q3',
    title: 'Paquetes para las Casas de Brookhaven',
    description: 'Encuentra un Sustantivo Común y entrégalo en las Casas Residenciales.',
    giver: 'Vecina Flor',
    targetCategory: 'COMUN',
    targetBuilding: 'houses',
    targetBuildingName: 'Casas Brookhaven',
    completed: false,
    xp: 40,
  },
  {
    id: 'q4',
    title: 'El Secreto de la Torre del Reloj',
    description: 'Sube con el super trampolín y entrega un Sinónimo o Antónimo en la Torre.',
    giver: 'Don Horacio',
    targetCategory: 'SINONIMO',
    targetBuilding: 'clocktower',
    targetBuildingName: 'Torre del Reloj',
    completed: false,
    xp: 50,
  },
];
