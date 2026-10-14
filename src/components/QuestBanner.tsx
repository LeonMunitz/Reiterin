import React from 'react';
import { BUILDINGS, CATEGORY_META } from '../data/openWorldData';
import { WordPickup } from '../types';

interface QuestBannerProps {
  carryingWord: WordPickup | null;
  playerX: number;
  onSkateboard: boolean;
  onToggleSkateboard: () => void;
}

export const QuestBanner: React.FC<QuestBannerProps> = ({
  carryingWord,
  playerX,
  onSkateboard,
  onToggleSkateboard,
}) => {
  let targetBuilding = null;
  let distText = '';
  let meta = null;

  if (carryingWord) {
    meta = CATEGORY_META[carryingWord.cat];
    targetBuilding = BUILDINGS.find((b) => b.id === carryingWord.targetBuildingId);

    if (targetBuilding) {
      const diff = targetBuilding.doorX - playerX;
      const meters = Math.abs(Math.round(diff));
      if (diff > 50) {
        distText = `➡️ A ${meters}m hacia la derecha`;
      } else if (diff < -50) {
        distText = `⬅️ A ${meters}m hacia la izquierda`;
      } else {
        distText = '⭐ ¡LLEGASTE! Entra a la puerta luminosa';
      }
    }
  }

  return (
    <div className="bg-slate-900/98 border-b-2 border-amber-400/70 px-3 py-2 z-20 shrink-0 text-xs shadow-md transition-all">
      <div className="flex items-center justify-between gap-2">
        {carryingWord && meta && targetBuilding ? (
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <span className="text-lg">🎒</span>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-xs px-2 py-0.5 rounded shadow" style={{ backgroundColor: meta.color, color: '#020617' }}>
                  "{carryingWord.word}"
                </span>
                <span className="text-[10px] text-amber-300 font-bold hidden sm:inline">
                  ({meta.title})
                </span>
              </div>
              <div className="text-[11px] text-emerald-300 font-black flex items-center gap-1 mt-0.5">
                <span>Destino: {targetBuilding.name}</span>
                <span className="text-yellow-300 font-extrabold">{distText}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            <span className="text-base">🌆</span>
            <div className="truncate">
              <div className="text-amber-300 font-extrabold text-xs">
                ¡Explora Brookhaven, habla con los vecinos y encuentra palabras!
              </div>
              <div className="text-[10px] text-indigo-300 font-semibold">
                Sube a los techos con escaleras y trampolines 🛹
              </div>
            </div>
          </div>
        )}

        {/* Quick Vehicle Skateboard toggle */}
        <button
          onClick={onToggleSkateboard}
          className={`px-2.5 py-1.5 rounded-xl font-black text-[11px] flex items-center gap-1.5 border transition cursor-pointer shrink-0 ${
            onSkateboard
              ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-lg scale-102'
              : 'bg-indigo-950 text-cyan-300 border-indigo-700/80 hover:bg-indigo-900'
          }`}
          title="Alternar modo Patineta / A pie"
        >
          <span>🛹</span>
          <span>{onSkateboard ? 'Patineta ON' : 'A pie'}</span>
        </button>
      </div>
    </div>
  );
};
