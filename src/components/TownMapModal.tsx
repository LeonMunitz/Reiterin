import React from 'react';
import { BUILDINGS } from '../data/openWorldData';
import { CATEGORY_META } from '../data/openWorldData';

interface TownMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerX: number;
  onTeleportTo: (x: number) => void;
}

export const TownMapModal: React.FC<TownMapModalProps> = ({
  isOpen,
  onClose,
  playerX,
  onTeleportTo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 select-none animate-fadeIn">
      <div className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-cyan-400 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-black p-1 cursor-pointer transition"
          aria-label="Cerrar mapa"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-cyan-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg border-2 border-white">
            🗺️
          </div>
          <div>
            <h3 className="title-font text-lg font-black text-cyan-300 leading-tight">
              MAPA DE BROOKHAVEN
            </h3>
            <p className="text-[11px] text-indigo-300 font-semibold">
              Explora distritos o viaja rápidamente a cualquier lugar
            </p>
          </div>
        </div>

        {/* Linear Town Overview Indicator */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-indigo-900 mb-4">
          <div className="text-[10px] font-bold text-slate-400 mb-2 flex justify-between">
            <span>⛲ Parque</span>
            <span>🏫 Escuela</span>
            <span>🍦 Heladería</span>
            <span>🏡 Casas</span>
            <span>🕰️ Torre</span>
          </div>
          <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 w-3 bg-amber-400 rounded-full border border-white -translate-x-1/2 transition-all shadow-md"
              style={{ left: `${Math.min(100, Math.max(0, (playerX / 3800) * 100))}%` }}
              title="Tu posición actual"
            />
          </div>
          <div className="text-right text-[10px] text-amber-300 font-bold mt-1">
            📍 Estás a {Math.round(playerX)}m
          </div>
        </div>

        {/* District Cards */}
        <div className="space-y-2.5">
          {/* Parque Central */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/50 flex items-center justify-between hover:bg-slate-800/80 transition">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⛲</span>
              <div>
                <h4 className="font-extrabold text-sm text-emerald-300">
                  Parque Central y Plaza Mayor
                </h4>
                <p className="text-[10px] text-slate-300">
                  Zona de patinetas, fuente, árboles y el explorador Mateo.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                onTeleportTo(430);
                onClose();
              }}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs game-button cursor-pointer shrink-0"
            >
              Ir aquí 🚀
            </button>
          </div>

          {/* Buildings from data */}
          {BUILDINGS.map((b) => {
            const meta = CATEGORY_META[b.acceptedCategory];
            return (
              <div
                key={b.id}
                className="p-3 rounded-2xl bg-slate-900/90 border flex items-center justify-between hover:bg-slate-800/80 transition"
                style={{ borderColor: `${meta.color}66` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{b.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-white">{b.name}</h4>
                      <span
                        className="text-[9px] font-black px-1.5 py-0.2 rounded"
                        style={{ backgroundColor: meta.color, color: '#020617' }}
                      >
                        {meta.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 max-w-xs">{b.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onTeleportTo(b.doorX - 20);
                    onClose();
                  }}
                  className="px-3 py-1.5 text-slate-950 font-black rounded-xl text-xs game-button cursor-pointer shrink-0"
                  style={{ backgroundColor: meta.color }}
                >
                  Ir aquí 🚀
                </button>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-700 font-bold rounded-xl text-xs cursor-pointer"
        >
          Cerrar Mapa
        </button>
      </div>
    </div>
  );
};
