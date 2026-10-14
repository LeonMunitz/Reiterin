export type CategoryType = 'PROPIO' | 'COMUN' | 'ADJETIVO' | 'SINONIMO' | 'ANTONIMO';

export type TowerMode = 'nouns' | 'adjectives' | 'syn_ant' | 'infinite';

export interface CategoryMeta {
  title: string;
  sub: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  arrowColor: string;
  icon: string;
}

export interface WordItem {
  id?: string;
  word: string;
  cat: CategoryType;
  hint: string;
  explanation?: string;
}

export interface BuildingZone {
  id: string;
  name: string;
  icon: string;
  district: string;
  x: number;
  y: number;
  w: number;
  h: number;
  roofColor: string;
  wallColor: string;
  trimColor: string;
  doorX: number;
  doorY: number;
  doorW: number;
  doorH: number;
  acceptedCategory: CategoryType;
  description: string;
}

export interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  studColor: string;
  isLedge?: boolean;
}

export interface Ladder {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Trampoline {
  x: number;
  y: number;
  w: number;
  h: number;
  power: number;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  hairColor: string;
  x: number;
  y: number;
  dialogue: string[];
  questWordId?: string;
}

export interface WorldProp {
  type: 'tree' | 'bench' | 'streetlight' | 'fountain' | 'hydrant' | 'fence';
  x: number;
  y: number;
}

export interface WordPickup {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  word: string;
  cat: CategoryType;
  hint: string;
  collected: boolean;
  targetBuildingId: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  giver: string;
  targetCategory: CategoryType;
  targetBuilding: string;
  targetBuildingName: string;
  completed: boolean;
  xp: number;
}

export interface AvatarStyle {
  skinColor: string;
  hairColor: string;
  hairStyle: 'classic' | 'pigtails' | 'spiky' | 'curly' | 'cap';
  shirtColor: string;
  pantsColor: string;
  accessory: 'none' | 'glasses' | 'backpack' | 'star_hat' | 'headphones';
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  decay: number;
}

export interface PlayerState {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  grounded: boolean;
  facing: number;
  canDoubleJump: boolean;
  coyoteTimer: number;
  jumpBufferTimer: number;
  onLadder: boolean;
  onSkateboard: boolean;
}
