import React from 'react';
import { CATEGORY_META } from '../data/words';
import { WordPickup } from '../types';

interface MissionBarProps {
  carryingWord: WordPickup | null;
}

export const MissionBar: React.FC<MissionBarProps> = ({ carryingWord }) => {
  const meta = carryingWord ? CATEGORY_META[carryingWord.cat] || CATEGORY_META['COMUN'] : null;

  return (
    <div className="px-3 py-2 bg-slate-900/98 border-b-2 border-amber-400/60 text-[11px] font-bold text-amber-100 flex flex-col gap-1 z-20 shrink-0 transition-all duration-200 shadow-md">
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="text-base">{carryingWord ? '🎒' : '🎯'}</span>
          <span className="font-black text-amber-300 text-xs sm:text-sm tracking-wide truncate">
            {carryingWord ? (
              <>
                Llevas <span className="text-white underline font-black">"{carryingWord.word}"</span> ➔ ¡Entra a su portal!
              </>
            ) : (
              '¡Salta a la plataforma y agarra el pergamino luminoso!'
            )}
          </span>
        </div>
        {carryingWord && meta ? (
          <span
            className={`text-[9px] ${meta.badgeBg} ${meta.badgeText} font-black px-2 py-0.5 rounded shadow shrink-0`}
          >
            {meta.icon} {meta.title}
          </span>
        ) : (
          <span className="text-[9px] bg-indigo-950 px-2 py-0.5 rounded border border-indigo-700/80 text-cyan-300 font-bold shrink-0">
            Doble salto activo
          </span>
        )}
      </div>

      {/* Detailed Portal Destination Guidance Box when carrying a word with Dual Option Display */}
      {carryingWord && meta && (
        <div className="flex flex-col gap-1.5 bg-black/75 p-2 rounded-lg border border-yellow-400/50 text-[10px] mt-0.5">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-yellow-400 font-black">🎒 LLEVAS:</span>
              <span className="font-extrabold text-white text-xs px-2 py-0.5 bg-amber-500/40 rounded border border-amber-400">
                "{carryingWord.word}"
              </span>
            </div>
            <span className="text-emerald-300 font-bold text-[9px] bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-700">
              Entra de lleno al portal
            </span>
          </div>
          {/* Dual Visual Portals Comparison */}
          <div className="flex items-center justify-between gap-1 pt-0.5 border-t border-slate-800 text-[10px]">
            <div className="flex-1 text-center py-1 px-1.5 rounded font-black bg-emerald-900/80 text-emerald-200 border border-emerald-500/80 truncate">
              <span>
                {meta.icon} <b>{meta.title}</b> (Correcto)
              </span>
            </div>
            <span className="text-amber-400 font-black px-1">VS</span>
            <div className="flex-1 text-center py-1 px-1.5 rounded font-bold bg-slate-800 text-amber-200 border border-slate-700 truncate">
              <span>💡 {carryingWord.hint || meta.sub}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
