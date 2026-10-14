import React from 'react';
import { TowerMode } from '../types';

interface MenuModalProps {
  isOpen: boolean;
  onSelectTower: (mode: TowerMode) => void;
  onOpenChaosModal: () => void;
  onQuickStart: () => void;
  onResume?: () => void;
  hasStarted?: boolean;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onSelectTower,
  onOpenChaosModal,
  onQuickStart,
  onResume,
  hasStarted,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-5 text-center overflow-y-auto">
      <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center text-3xl mb-2 border-2 border-amber-200 shadow-xl shrink-0">
        🧱
      </div>
      <h2 className="title-font text-2xl font-black text-amber-400 mb-0.5 leading-tight">
        ROBLOX TOWER OBBY
      </h2>
      <p className="text-xs text-indigo-300 font-bold mb-3 uppercase tracking-wider">
        Prácticas del Lenguaje • Primaria
      </p>
      <p className="text-[11px] text-slate-300 mb-4 max-w-xs leading-relaxed">
        ¡Física mejorada con <b className="text-cyan-300">Doble Salto</b>,{' '}
        <b className="text-emerald-300">Portales Espaciados</b> y{' '}
        <b className="text-yellow-300">Guías Luminosas</b>! Sin colisiones accidentales para jugar con total tranquilidad.
      </p>

      {/* Big Start Action Button */}
      <button
        onClick={hasStarted && onResume ? onResume : onQuickStart}
        className="btn-pulse w-full max-w-xs py-3.5 px-4 mb-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm game-button flex items-center justify-center gap-2 border-2 border-amber-200 shadow-xl cursor-pointer"
      >
        <span>{hasStarted ? '▶️ REANUDAR JUEGO' : '¡EMPEZAR A JUGAR AHORA!'}</span>
        <span className="text-base">🚀</span>
      </button>

      {/* Tower Mode Choice Buttons */}
      <div className="w-full space-y-2 max-w-xs">
        <button
          onClick={() => onSelectTower('nouns')}
          className="w-full py-2.5 px-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs game-button flex items-center justify-between shadow-lg cursor-pointer"
        >
          <div className="text-left">
            <div className="font-extrabold text-sm text-slate-950">🟢 TORRE ESMERALDA</div>
            <div className="text-[10px] text-emerald-950 font-bold">
              🔵 Propio (Nombres) vs 🟢 Común
            </div>
          </div>
          <span className="bg-emerald-950/40 text-emerald-900 px-2 py-0.5 rounded text-[10px] font-black">
            Nivel 1
          </span>
        </button>

        <button
          onClick={() => onSelectTower('adjectives')}
          className="w-full py-2.5 px-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black rounded-xl text-xs game-button flex items-center justify-between shadow-lg cursor-pointer"
        >
          <div className="text-left">
            <div className="font-extrabold text-sm text-slate-950">🔥 TORRE DE FUEGO</div>
            <div className="text-[10px] text-amber-950 font-bold">
              🟠 Adjetivos vs 🟢 Sustantivos
            </div>
          </div>
          <span className="bg-amber-950/40 text-amber-900 px-2 py-0.5 rounded text-[10px] font-black">
            Nivel 2
          </span>
        </button>

        <button
          onClick={() => onSelectTower('syn_ant')}
          className="w-full py-2.5 px-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs game-button flex items-center justify-between shadow-lg cursor-pointer"
        >
          <div className="text-left">
            <div className="font-extrabold text-sm text-slate-950">💎 TORRE CELESTE</div>
            <div className="text-[10px] text-cyan-950 font-bold">
              🟣 Sinónimos vs Antónimos
            </div>
          </div>
          <span className="bg-cyan-950/40 text-cyan-900 px-2 py-0.5 rounded text-[10px] font-black">
            Nivel 3
          </span>
        </button>

        <button
          onClick={onOpenChaosModal}
          className="w-full py-2.5 px-3.5 bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-500 hover:to-purple-600 text-white font-black rounded-xl text-xs game-button flex items-center justify-between border-2 border-yellow-300 shadow-xl cursor-pointer"
        >
          <div className="text-left">
            <div className="font-extrabold text-sm flex items-center gap-1.5">
              <span>⚡ TORRE DEL CAOS</span>{' '}
              <span className="text-[9px] bg-yellow-400 text-slate-950 px-1 rounded font-black">
                RENOVADA
              </span>
            </div>
            <div className="text-[10px] text-purple-200 font-bold">
              Plataformas Amplias • Cero Errores Injustos
            </div>
          </div>
          <span className="bg-purple-900/80 text-yellow-300 px-2 py-0.5 rounded text-[10px] font-black">
            Infinito
          </span>
        </button>
      </div>

      <div className="mt-4 text-[11px] text-slate-400 flex items-center gap-1.5">
        <span>🎮 Controles: Flechas / A-D + Espacio / W (¡Doble Salto disponible!)</span>
      </div>
    </div>
  );
};
