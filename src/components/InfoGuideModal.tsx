import React from 'react';

interface InfoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoGuideModal: React.FC<InfoGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 p-5 flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-indigo-900 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">📘</span>
            <h3 className="title-font text-lg font-black text-amber-400">
              Guía de Lenguaje Roblox Obby
            </h3>
          </div>
          <button
            className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
            onClick={onClose}
            aria-label="Cerrar guía"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2.5 text-xs text-slate-200 leading-relaxed">
          <div className="bg-indigo-950/80 p-2.5 rounded-xl border border-indigo-800">
            <h4 className="font-black text-emerald-400 text-xs mb-1 flex items-center gap-1.5">
              <span>🏷️</span> Sustantivos Propios vs Comunes
            </h4>
            <p className="mb-1">
              • <b>Sustantivos Propios (Portal Azul):</b> Nombran a personas, lugares o mascotas individuales. ¡SIEMPRE empiezan con mayúscula! Ejemplos: <i>Nahuel, Argentina, Patagonia, Alada, Luna</i>.
            </p>
            <p>
              • <b>Sustantivos Comunes (Portal Verde):</b> Nombran cosas, animales u objetos generales: <i>dragón, espada, bosque, montaña, río, aprendiz, libro</i>.
            </p>
          </div>

          <div className="bg-indigo-950/80 p-2.5 rounded-xl border border-indigo-800">
            <h4 className="font-black text-amber-400 text-xs mb-1 flex items-center gap-1.5">
              <span>🎨</span> Adjetivos (Portal Naranja)
            </h4>
            <p>
              Palabras que describen cómo es o cómo está un sustantivo (cualidades o estados): <i>valiente, inmenso, dorado, antiguo, veloz, misterioso, sabio, feroz</i>.
            </p>
          </div>

          <div className="bg-indigo-950/80 p-2.5 rounded-xl border border-indigo-800">
            <h4 className="font-black text-cyan-400 text-xs mb-1 flex items-center gap-1.5">
              <span>🔄</span> Sinónimos vs Antónimos (Portal Violeta)
            </h4>
            <p className="mb-1">
              • <b>Sinónimos:</b> Significan lo mismo o casi lo mismo (<i>veloz = rápido, enorme = gigante</i>).
            </p>
            <p>
              • <b>Antónimos:</b> Significan lo contrario (<i>valiente ≠ cobarde, veloz ≠ lento, luz ≠ oscuridad</i>).
            </p>
          </div>

          <div className="bg-rose-950/60 p-2.5 rounded-xl border border-rose-800/80">
            <h4 className="font-black text-rose-300 text-xs mb-1 flex items-center gap-1.5">
              <span>🚨</span> Reglas de la Torre &amp; Salto Cómodo
            </h4>
            <p className="mb-1">
              • <b>Super Salto y Doble Salto:</b> Presiona <b>SALTAR</b> o la barra espaciadora. Toca nuevamente en el aire para impulsarte más alto.
            </p>
            <p className="mb-1">
              • Recoge el pergamino y camina seguro hacia el portal correspondiente. Para evitar errores accidentales, debes colocarte bien centrado en el portal.
            </p>
            <p>
              • Si te equivocas de portal, recibirás una sugerencia pedagógica amable para que lo intentes de nuevo sin frustración.
            </p>
          </div>
        </div>
      </div>

      <button
        className="w-full mt-3 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider game-button cursor-pointer"
        onClick={onClose}
      >
        ¡Entendido! Volver al juego
      </button>
    </div>
  );
};
