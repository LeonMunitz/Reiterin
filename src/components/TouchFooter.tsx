import React from 'react';

interface TouchFooterProps {
  onLeftPress: () => void;
  onLeftRelease: () => void;
  onRightPress: () => void;
  onRightRelease: () => void;
  onJumpPress: () => void;
  onJumpRelease: () => void;
  onInteract: () => void;
  onToggleSkateboard: () => void;
  onSkateboard: boolean;
  nearNPC: boolean;
}

export const TouchFooter: React.FC<TouchFooterProps> = ({
  onLeftPress,
  onLeftRelease,
  onRightPress,
  onRightRelease,
  onJumpPress,
  onJumpRelease,
  onInteract,
  onToggleSkateboard,
  onSkateboard,
  nearNPC,
}) => {
  return (
    <footer className="p-2 sm:p-3 bg-slate-900/98 border-t border-indigo-900/80 flex items-center justify-between z-30 select-none shrink-0 w-full max-w-5xl mx-auto">
      {/* Left / Right D-Pad Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Mover a la izquierda"
          className="w-14 h-14 bg-indigo-950 text-white rounded-2xl flex flex-col items-center justify-center font-black game-button border-2 border-indigo-700/80 shadow-md active:bg-amber-400 active:text-slate-950 cursor-pointer touch-none"
          onTouchStart={(e) => {
            e.preventDefault();
            onLeftPress();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onLeftRelease();
          }}
          onTouchCancel={(e) => {
            e.preventDefault();
            onLeftRelease();
          }}
          onMouseDown={onLeftPress}
          onMouseUp={onLeftRelease}
          onMouseLeave={onLeftRelease}
        >
          <span className="text-2xl leading-none">◀</span>
          <span className="text-[9px] text-slate-400 font-bold hidden sm:inline">A / ◀</span>
        </button>

        <button
          type="button"
          aria-label="Mover a la derecha"
          className="w-14 h-14 bg-indigo-950 text-white rounded-2xl flex flex-col items-center justify-center font-black game-button border-2 border-indigo-700/80 shadow-md active:bg-amber-400 active:text-slate-950 cursor-pointer touch-none"
          onTouchStart={(e) => {
            e.preventDefault();
            onRightPress();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onRightRelease();
          }}
          onTouchCancel={(e) => {
            e.preventDefault();
            onRightRelease();
          }}
          onMouseDown={onRightPress}
          onMouseUp={onRightRelease}
          onMouseLeave={onRightRelease}
        >
          <span className="text-2xl leading-none">▶</span>
          <span className="text-[9px] text-slate-400 font-bold hidden sm:inline">D / ▶</span>
        </button>
      </div>

      {/* Middle Utility Buttons: Skateboard & Interact */}
      <div className="flex items-center gap-2">
        {/* Skateboard Toggle */}
        <button
          type="button"
          onClick={onToggleSkateboard}
          className={`h-14 px-3 sm:px-4 rounded-2xl border-2 flex flex-col items-center justify-center game-button transition cursor-pointer ${
            onSkateboard
              ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-md'
              : 'bg-indigo-950 text-cyan-300 border-indigo-800 hover:bg-indigo-900'
          }`}
          title="Montar en Patineta"
        >
          <span className="text-xl">🛹</span>
          <span className="text-[9px] font-black uppercase tracking-wider">
            {onSkateboard ? 'Patineta ON' : 'Patineta'}
          </span>
        </button>

        {/* Talk / Interact Button */}
        <button
          type="button"
          onClick={onInteract}
          className={`h-14 px-3 sm:px-4 rounded-2xl border-2 flex flex-col items-center justify-center game-button transition cursor-pointer ${
            nearNPC
              ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-xl animate-pulse'
              : 'bg-indigo-950 text-slate-400 border-indigo-800 hover:bg-indigo-900'
          }`}
          title="Hablar con personajes cercanos"
        >
          <span className="text-xl">💬</span>
          <span className="text-[9px] font-black uppercase tracking-wider">
            {nearNPC ? '¡Hablar!' : 'Hablar'}
          </span>
        </button>
      </div>

      {/* Giant Jump Button with Stud look */}
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Saltar"
          className="w-24 sm:w-28 h-14 bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 rounded-2xl flex flex-col items-center justify-center font-black game-button shadow-lg border-2 border-amber-300 active:from-amber-300 active:to-amber-400 cursor-pointer touch-none"
          onTouchStart={(e) => {
            e.preventDefault();
            onJumpPress();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onJumpRelease();
          }}
          onTouchCancel={(e) => {
            e.preventDefault();
            onJumpRelease();
          }}
          onMouseDown={onJumpPress}
          onMouseUp={onJumpRelease}
          onMouseLeave={onJumpRelease}
        >
          <span className="text-lg leading-none">▲</span>
          <span className="text-[10px] uppercase font-black tracking-wider leading-none mt-0.5">
            SALTAR
          </span>
          <span className="text-[8px] text-amber-950 font-extrabold hidden sm:inline">
            Espacio / W
          </span>
        </button>
      </div>
    </footer>
  );
};
