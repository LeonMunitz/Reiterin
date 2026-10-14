import { CategoryMeta, CategoryType, WordItem } from '../types';

export const CATEGORY_META: Record<CategoryType, CategoryMeta> = {
  PROPIO: {
    title: 'SUSTANTIVO PROPIO',
    sub: 'Nombres / Mayúscula',
    color: '#38bdf8', // Blue/Cyan
    badgeBg: 'bg-blue-600',
    badgeText: 'text-white',
    arrowColor: '#38bdf8',
    icon: '🔵',
  },
  COMUN: {
    title: 'SUSTANTIVO COMÚN',
    sub: 'Cosas / Animales',
    color: '#22c55e', // Green
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    arrowColor: '#22c55e',
    icon: '🟢',
  },
  ADJETIVO: {
    title: 'ADJETIVO',
    sub: 'Cualidad / Cómo es',
    color: '#f97316', // Orange/Fire
    badgeBg: 'bg-amber-600',
    badgeText: 'text-white',
    arrowColor: '#f97316',
    icon: '🟠',
  },
  SINONIMO: {
    title: 'SINÓNIMO / ANTÓNIMO',
    sub: 'Parecido u Opuesto',
    color: '#d946ef', // Purple/Pink
    badgeBg: 'bg-fuchsia-600',
    badgeText: 'text-white',
    arrowColor: '#d946ef',
    icon: '🟣',
  },
  ANTONIMO: {
    title: 'SINÓNIMO / ANTÓNIMO',
    sub: 'Parecido u Opuesto',
    color: '#d946ef', // Purple/Pink
    badgeBg: 'bg-fuchsia-600',
    badgeText: 'text-white',
    arrowColor: '#d946ef',
    icon: '🟣',
  },
};

export const WORD_DATABASE: {
  nouns: WordItem[];
  adjectives: WordItem[];
  syn_ant: WordItem[];
} = {
  nouns: [
    { word: 'Nahuel', cat: 'PROPIO', hint: 'Nombre de persona (empieza con Mayúscula)' },
    { word: 'Argentina', cat: 'PROPIO', hint: 'Nombre de un país (Mayúscula)' },
    { word: 'Patagonia', cat: 'PROPIO', hint: 'Nombre propio de una región' },
    { word: 'Alada', cat: 'PROPIO', hint: 'Nombre propio del pequeño dragón' },
    { word: 'Andes', cat: 'PROPIO', hint: 'Nombre propio de la cordillera' },
    { word: 'Martín', cat: 'PROPIO', hint: 'Nombre propio de persona' },
    { word: 'Córdoba', cat: 'PROPIO', hint: 'Nombre de una ciudad (Mayúscula)' },
    { word: 'Mendoza', cat: 'PROPIO', hint: 'Nombre de provincia (Mayúscula)' },
    { word: 'dragón', cat: 'COMUN', hint: 'Criatura u objeto general: sustantivo común' },
    { word: 'pergamino', cat: 'COMUN', hint: 'Objeto físico: sustantivo común' },
    { word: 'espada', cat: 'COMUN', hint: 'Herramienta u objeto físico' },
    { word: 'cueva', cat: 'COMUN', hint: 'Lugar natural genérico' },
    { word: 'río', cat: 'COMUN', hint: 'Cuerpo de agua genérico' },
    { word: 'escama', cat: 'COMUN', hint: 'Parte del cuerpo: sustantivo común' },
    { word: 'castillo', cat: 'COMUN', hint: 'Edificación: sustantivo común' },
    { word: 'antorcha', cat: 'COMUN', hint: 'Objeto para alumbrar: sustantivo común' },
  ],
  adjectives: [
    { word: 'valiente', cat: 'ADJETIVO', hint: 'Describe cómo es el personaje (cualidad)' },
    { word: 'inmenso', cat: 'ADJETIVO', hint: 'Describe el tamaño (cualidad)' },
    { word: 'dorado', cat: 'ADJETIVO', hint: 'Indica color o brillo (cualidad)' },
    { word: 'antiguo', cat: 'ADJETIVO', hint: 'Indica la antigüedad del objeto' },
    { word: 'veloz', cat: 'ADJETIVO', hint: 'Describe la velocidad (cualidad)' },
    { word: 'misterioso', cat: 'ADJETIVO', hint: 'Cualidad de algo enigmático' },
    { word: 'luminoso', cat: 'ADJETIVO', hint: 'Que emite mucha luz (cualidad)' },
    { word: 'feroz', cat: 'ADJETIVO', hint: 'Describe la bravura o fiereza' },
    { word: 'montaña', cat: 'COMUN', hint: 'Lugar físico: sustantivo común' },
    { word: 'maestro', cat: 'COMUN', hint: 'Persona que enseña: sustantivo común' },
    { word: 'garra', cat: 'COMUN', hint: 'Parte de un ser: sustantivo común' },
    { word: 'fuego', cat: 'COMUN', hint: 'Elemento natural: sustantivo común' },
    { word: 'escudo', cat: 'COMUN', hint: 'Objeto de defensa: sustantivo común' },
  ],
  syn_ant: [
    { word: 'veloz (de rápido)', cat: 'SINONIMO', hint: 'Tienen un significado similar o igual' },
    { word: 'enorme (de gigante)', cat: 'SINONIMO', hint: 'Mismo significado de gran tamaño' },
    { word: 'sabio (de inteligente)', cat: 'SINONIMO', hint: 'Palabras con sentido parecido' },
    { word: 'comenzar (de iniciar)', cat: 'SINONIMO', hint: 'Significan dar inicio a una acción' },
    { word: 'cobarde (de valiente)', cat: 'ANTONIMO', hint: 'Significado totalmente opuesto' },
    { word: 'lento (de veloz)', cat: 'ANTONIMO', hint: 'Totalmente contrario a rapidez' },
    { word: 'oscuro (de claro)', cat: 'ANTONIMO', hint: 'Significado opuesto de luminosidad' },
    { word: 'alto (de bajo)', cat: 'ANTONIMO', hint: 'Significado inverso de estatura' },
  ],
};
