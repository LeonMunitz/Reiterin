import React from 'react';

interface ChaosInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChaos: () => void;
}

export const ChaosInfoModal: React.FC<ChaosInfoModalProps> = ({
  isOpen,
  onClose,
  onStartChaos,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 p-5 flex flex-col justify-center items-center text-center overflow-y-auto">
      <div className="w-full max-w-sm bg-gradient-to-b from-purple-950/90 to-slate-900/95 border-2 border-yellow-400 rounded-2xl p-5 shadow-2xl flex flex-col items-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center text-3xl mb-3 shadow-lg border-2 border-white">
          ⚡
        </div>
        <h3 className="title-font text-xl font-black text-yellow-300 leading-tight mb-1">
          ¡TORRE DEL CAOS MEJORADA!
        </h3>
        <p className="text-[11px] text-purple-200 font-bold mb-3">
          Ahora con zonas amplias, portales separados y sin errores accidentales
        </p>

        <div className="w-full space-y-2 text-left mb-4 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-950/80 border border-blue-500/60">
            <span className="text-xl">🔵</span>
            <div>
              <div className="font-extrabold text-blue-300">PORTAL AZUL: Sustantivo Propio</div>
              <div className="text-[10px] text-blue-100 font-semibold">
                Nombres de personas, países (con Mayúscula)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/60">
            <span className="text-xl">🟢</span>
            <div>
              <div className="font-extrabold text-emerald-300">PORTAL VERDE: Sustantivo Común</div>
              <div className="text-[10px] text-emerald-100 font-semibold">
                Objetos, animales, cosas del mundo
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-950/80 border border-amber-500/60">
            <span className="text-xl">🟠</span>
            <div>
              <div className="font-extrabold text-amber-300">PORTAL NARANJA: Adjetivo</div>
              <div className="text-[10px] text-amber-100 font-semibold">
                Cualidades: cómo es o cómo está algo
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-fuchsia-950/80 border border-fuchsia-500/60">
            <span className="text-xl">🟣</span>
            <div>
              <div className="font-extrabold text-fuchsia-300">PORTAL VIOLETA: Sinónimo / Antónimo</div>
              <div className="text-[10px] text-fuchsia-100 font-semibold">
                Palabras parecidas u opuestas
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-yellow-400/20 border border-yellow-300/40 text-[11px] text-yellow-200 font-bold mb-4">
          ✨ <b>Novedad:</b> Los portales están en extremos opuestos con plataformas anchas y requieren entrar al centro del portal. ¡Espacio de sobra para saltar y elegir bien!
        </div>

        <button
          onClick={onStartChaos}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm game-button shadow-xl flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>¡ENTENDIDO! EMPEZAR TORRE DEL CAOS</span>
          <span>🚀</span>
        </button>
      </div>
    </div>
  );
};
