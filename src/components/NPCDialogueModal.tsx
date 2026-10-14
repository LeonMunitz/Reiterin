import React, { useState } from 'react';
import { NPC } from '../types';

interface NPCDialogueModalProps {
  npc: NPC | null;
  onClose: () => void;
}

export const NPCDialogueModal: React.FC<NPCDialogueModalProps> = ({ npc, onClose }) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);

  if (!npc) return null;

  const currentLine = npc.dialogue[dialogueIndex] || npc.dialogue[0];
  const isLastLine = dialogueIndex >= npc.dialogue.length - 1;

  const handleNext = () => {
    if (isLastLine) {
      setDialogueIndex(0);
      onClose();
    } else {
      setDialogueIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-24 z-50 flex items-center justify-center p-3 pointer-events-auto select-none animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900/98 border-2 border-amber-400 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 relative backdrop-blur-md">
        <button
          onClick={() => {
            setDialogueIndex(0);
            onClose();
          }}
          className="absolute top-2.5 right-3 text-slate-400 hover:text-white font-bold text-sm cursor-pointer"
        >
          ✕
        </button>

        {/* NPC Profile Tag */}
        <div className="flex items-center gap-2.5 border-b border-indigo-900/80 pb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow border border-white/60 font-black"
            style={{ backgroundColor: npc.avatarColor }}
          >
            🙂
          </div>
          <div>
            <h4 className="title-font text-sm font-black text-amber-300 leading-tight">
              {npc.name}
            </h4>
            <span className="text-[10px] text-cyan-300 font-bold">{npc.role}</span>
          </div>
        </div>

        {/* Dialogue speech text */}
        <p className="text-xs text-slate-100 font-semibold leading-relaxed min-h-[44px] flex items-center">
          {currentLine}
        </p>

        {/* Action Button */}
        <div className="flex justify-between items-center pt-1 border-t border-indigo-950">
          <span className="text-[10px] text-slate-400 font-bold">
            {dialogueIndex + 1} de {npc.dialogue.length}
          </span>
          <button
            onClick={handleNext}
            className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black rounded-xl text-xs game-button cursor-pointer"
          >
            {isLastLine ? '¡Entendido! 👍' : 'Continuar ➔'}
          </button>
        </div>
      </div>
    </div>
  );
};
