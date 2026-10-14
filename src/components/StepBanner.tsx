import React from 'react';

interface StepBannerProps {
  checkpointIndex: number;
}

export const StepBanner: React.FC<StepBannerProps> = ({ checkpointIndex }) => {
  return (
    <div className="px-2.5 py-1 bg-amber-500/20 border-b border-amber-400/40 text-[10px] sm:text-[11px] font-bold text-amber-200 flex items-center justify-between z-20 shrink-0 min-h-[30px]">
      <div className="flex items-center gap-1 text-slate-200 overflow-hidden text-[10px]">
        <span className="bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-black text-[9px]">
          1
        </span>
        <span className="text-amber-300">Salta</span>
        <span className="text-amber-400">➔</span>
        <span className="bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-black text-[9px]">
          2
        </span>
        <span className="text-amber-300">Recoge palabra</span>
        <span className="text-amber-400">➔</span>
        <span className="bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-black text-[9px]">
          3
        </span>
        <span className="text-amber-300">Entra al portal correcto</span>
      </div>
      <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider shrink-0 ml-1">
        CP: {checkpointIndex}
      </span>
    </div>
  );
};
