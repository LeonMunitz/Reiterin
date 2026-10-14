import React from 'react';

interface HeaderHUDProps {
  score: number;
  coins: number;
  heightMeters: number;
  currentDistrict: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCustomizer: () => void;
  onOpenMap: () => void;
  onOpenInfo: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  score,
  coins,
  heightMeters,
  currentDistrict,
  soundEnabled,
  onToggleSound,
  onOpenCustomizer,
  onOpenMap,
  onOpenInfo,
}) => {
  return (
    <header className="flex items-center justify-between px-3 py-2 bg-slate-900/98 backdrop-blur border-b border-indigo-800/80 z-30 shrink-0">
      {/* Brand & District */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-amber-400 border border-amber-200 flex items-center justify-center font-black text-slate-950 text-lg shadow">
          🧱
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="title-font text-sm font-black text-amber-400 tracking-wide leading-none">
              ROBLOX BROOKHAVEN
            </h1>
            <span className="text-[9px] bg-red-600 text-white font-extrabold px-1 rounded uppercase tracking-wider">
              LENGUAJE
            </span>
          </div>
          <p className="text-[10px] text-cyan-300 font-bold truncate max-w-[190px]">
            📍 {currentDistrict}
          </p>
        </div>
      </div>

      {/* Stats and Action Controls */}
      <div className="flex items-center gap-1.5">
        {/* Stars */}
        <div className="bg-indigo-950 px-2 py-1 rounded-lg border border-indigo-800 flex items-center gap-1">
          <span className="text-yellow-400 text-xs">⭐</span>
          <span className="font-black text-white text-xs tabular-nums">{score}</span>
        </div>

        {/* Coins */}
        <div className="bg-amber-950/60 px-2 py-1 rounded-lg border border-amber-800/80 flex items-center gap-1 hidden sm:flex">
          <span className="text-amber-400 text-xs">🪙</span>
          <span className="font-black text-amber-200 text-xs tabular-nums">{coins}</span>
        </div>

        {/* Height if jumping */}
        {heightMeters > 3 && (
          <div className="bg-indigo-950 px-1.5 py-1 rounded-lg border border-indigo-800 text-[10px] font-bold text-amber-300">
            📏 {heightMeters}m
          </div>
        )}

        {/* Vestidor Avatar Button */}
        <button
          onClick={onOpenCustomizer}
          className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-xs text-amber-300 border border-indigo-700/80 transition active:scale-95 cursor-pointer flex items-center gap-1"
          title="Personalizar Personaje"
          aria-label="Abrir vestidor"
        >
          <span>👕</span>
          <span className="text-[10px] font-bold hidden md:inline">Ropa</span>
        </button>

        {/* Mapa Button */}
        <button
          onClick={onOpenMap}
          className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-xs text-cyan-300 border border-indigo-700/80 transition active:scale-95 cursor-pointer flex items-center gap-1"
          title="Ver Mapa de la Ciudad"
          aria-label="Abrir mapa"
        >
          <span>🗺️</span>
          <span className="text-[10px] font-bold hidden md:inline">Mapa</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          className="p-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-xs text-amber-300 border border-indigo-700/80 transition active:scale-95 cursor-pointer"
          title={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
          aria-label="Alternar sonido"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>

        {/* Info Guide */}
        <button
          onClick={onOpenInfo}
          className="p-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-xs text-indigo-200 border border-indigo-700/80 font-bold transition active:scale-95 cursor-pointer"
          title="Guía Educativa"
          aria-label="Abrir guía"
        >
          ℹ️
        </button>
      </div>
    </header>
  );
};
