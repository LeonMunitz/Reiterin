import React from 'react';

interface StatsBarProps {
  hp: number;
  height: number;
  score: number;
  canDoubleJump: boolean;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  hp,
  height,
  score,
  canDoubleJump,
}) => {
  const hpPercent = Math.max(0, Math.min(100, hp));

  const getHpBg = () => {
    if (hpPercent > 50) return 'bg-emerald-500';
    if (hpPercent > 25) return 'bg-amber-500';
    return 'bg-rose-600';
  };

  return (
    <div className="px-3 py-1.5 bg-slate-900/90 border-b border-indigo-950 flex items-center justify-between text-xs z-20 gap-2 shrink-0">
      {/* HP Bar */}
      <div className="flex items-center gap-1.5 flex-1 max-w-[110px]">
        <span className="text-[10px] font-bold text-slate-400">HP</span>
        <div className="flex-1 h-3.5 bg-slate-950 rounded-sm border border-slate-700 overflow-hidden relative">
          <div
            className={`h-full transition-all duration-200 ${getHpBg()}`}
            style={{ width: `${hpPercent}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white drop-shadow">
            {Math.round(hpPercent)}
          </span>
        </div>
      </div>

      {/* Height */}
      <div className="bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800 flex items-center gap-1">
        <span className="text-amber-400 font-bold text-[10px]">📏 Altura:</span>
        <span className="font-black text-amber-300 text-xs tabular-nums">{height}m</span>
      </div>

      {/* Score & Double Jump Badge */}
      <div className="flex items-center gap-1">
        <div className="bg-indigo-900/80 px-2 py-0.5 rounded border border-indigo-700 flex items-center gap-1">
          <span className="text-yellow-400 text-[10px]">⭐</span>
          <span className="font-black text-white text-xs tabular-nums">{score}</span>
        </div>
        <span
          className={`border text-[9px] font-black px-1.5 py-0.5 rounded tracking-tight transition-all ${
            canDoubleJump
              ? 'bg-cyan-900/80 text-cyan-200 border-cyan-700/60 shadow-sm'
              : 'bg-slate-800/60 text-slate-400 border-slate-700/50'
          }`}
        >
          🚀 DOBLE SALTO
        </span>
      </div>
    </div>
  );
};
