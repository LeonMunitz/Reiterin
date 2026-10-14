import React from 'react';
import { AvatarStyle } from '../types';

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarStyle: AvatarStyle;
  onChangeStyle: (newStyle: AvatarStyle) => void;
}

const SKIN_COLORS = ['#facc15', '#fed7aa', '#fcd34d', '#b45309', '#f472b6', '#38bdf8'];
const HAIR_COLORS = ['#451a03', '#78350f', '#0f172a', '#e2e8f0', '#d97706', '#ec4899'];
const SHIRT_COLORS = ['#0284c7', '#ec4899', '#8b5cf6', '#dc2626', '#10b981', '#f59e0b', '#0f172a'];
const PANTS_COLORS = ['#16a34a', '#1e40af', '#334155', '#475569', '#be123c', '#d97706'];

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  isOpen,
  onClose,
  avatarStyle,
  onChangeStyle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 select-none animate-fadeIn">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-amber-400 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-black p-1 cursor-pointer transition"
          aria-label="Cerrar personalizador"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg border-2 border-white">
            👕
          </div>
          <div>
            <h3 className="title-font text-lg font-black text-amber-300 leading-tight">
              VESTIDOR BROOKHAVEN
            </h3>
            <p className="text-[11px] text-indigo-300 font-semibold">
              ¡Personaliza tu personaje Roblox a tu gusto!
            </p>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="bg-slate-950/80 rounded-2xl p-4 mb-4 border border-indigo-800/80 flex items-center justify-center gap-6">
          {/* Avatar Graphic */}
          <div className="relative w-20 h-28 flex flex-col items-center justify-center">
            {/* Accessory - Star Hat */}
            {avatarStyle.accessory === 'star_hat' && (
              <div className="absolute -top-3 text-lg z-20 animate-bounce">⭐</div>
            )}
            {/* Accessory - Headphones */}
            {avatarStyle.accessory === 'headphones' && (
              <div className="absolute -top-1 w-14 h-4 border-t-4 border-x-4 border-slate-200 rounded-t-full z-20 pointer-events-none" />
            )}
            {/* Hair */}
            <div
              className={`w-12 h-4 rounded-t-lg z-10 ${
                avatarStyle.hairStyle === 'pigtails'
                  ? 'rounded-full'
                  : avatarStyle.hairStyle === 'cap'
                  ? 'rounded-md border-b-2 border-white'
                  : 'rounded-t-lg'
              }`}
              style={{ backgroundColor: avatarStyle.hairColor }}
            />
            {/* Head */}
            <div
              className="w-10 h-8 rounded-md flex flex-col items-center justify-center relative shadow-sm"
              style={{ backgroundColor: avatarStyle.skinColor }}
            >
              <div className="w-2.5 h-1 bg-amber-600/30 rounded -top-1 absolute" />
              {/* Eyes & smile */}
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
                <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
              </div>
              <div className="w-3 h-1 bg-slate-950 rounded-full mt-1" />
              {/* Glasses */}
              {avatarStyle.accessory === 'glasses' && (
                <div className="absolute inset-x-1 top-2.5 h-2 border-2 border-slate-900 bg-cyan-400/30 rounded" />
              )}
            </div>
            {/* Torso */}
            <div
              className="w-12 h-10 rounded-sm relative shadow-sm mt-0.5 flex items-center justify-center"
              style={{ backgroundColor: avatarStyle.shirtColor }}
            >
              {avatarStyle.accessory === 'backpack' && (
                <div className="absolute -right-2 top-1 w-3 h-7 bg-amber-400 rounded-sm border border-slate-950" />
              )}
            </div>
            {/* Legs */}
            <div className="flex gap-1 mt-0.5">
              <div
                className="w-5 h-8 rounded-b-sm"
                style={{ backgroundColor: avatarStyle.pantsColor }}
              />
              <div
                className="w-5 h-8 rounded-b-sm"
                style={{ backgroundColor: avatarStyle.pantsColor }}
              />
            </div>
          </div>

          <div className="text-left text-xs space-y-1">
            <div className="font-extrabold text-amber-300">Estilo Listo</div>
            <div className="text-slate-300 text-[11px]">
              Se actualiza en tiempo real mientras exploras la ciudad.
            </div>
            <span className="inline-block bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 mt-1">
              ✨ Guardado automático
            </span>
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-3.5 text-xs">
          {/* Peinado */}
          <div>
            <label className="font-black text-slate-300 text-[11px] uppercase tracking-wider block mb-1.5">
              Estilo de Cabello
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {(
                [
                  { id: 'classic', label: 'Lacio' },
                  { id: 'pigtails', label: 'Coletas' },
                  { id: 'spiky', label: 'Puntas' },
                  { id: 'curly', label: 'Rulos' },
                  { id: 'cap', label: 'Gorra' },
                ] as const
              ).map((h) => (
                <button
                  key={h.id}
                  onClick={() => onChangeStyle({ ...avatarStyle, hairStyle: h.id })}
                  className={`py-1.5 rounded-xl font-bold text-[10px] border transition cursor-pointer ${
                    avatarStyle.hairStyle === h.id
                      ? 'bg-amber-400 text-slate-950 border-amber-200 shadow'
                      : 'bg-indigo-950/80 text-slate-300 border-indigo-800/80 hover:bg-indigo-900'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color de Cabello */}
          <div>
            <label className="font-black text-slate-300 text-[11px] uppercase tracking-wider block mb-1.5">
              Color de Pelo
            </label>
            <div className="flex gap-2">
              {HAIR_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onChangeStyle({ ...avatarStyle, hairColor: c })}
                  className={`w-7 h-7 rounded-full border-2 transition cursor-pointer ${
                    avatarStyle.hairColor === c ? 'scale-115 border-white shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Color de pelo ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Color de Piel */}
          <div>
            <label className="font-black text-slate-300 text-[11px] uppercase tracking-wider block mb-1.5">
              Tono de Piel
            </label>
            <div className="flex gap-2">
              {SKIN_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onChangeStyle({ ...avatarStyle, skinColor: c })}
                  className={`w-7 h-7 rounded-full border-2 transition cursor-pointer ${
                    avatarStyle.skinColor === c ? 'scale-115 border-white shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Tono de piel ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Color de Remera / Camiseta */}
          <div>
            <label className="font-black text-slate-300 text-[11px] uppercase tracking-wider block mb-1.5">
              Remera / Camiseta
            </label>
            <div className="flex gap-2 flex-wrap">
              {SHIRT_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onChangeStyle({ ...avatarStyle, shirtColor: c })}
                  className={`w-7 h-7 rounded-xl border-2 transition cursor-pointer ${
                    avatarStyle.shirtColor === c ? 'scale-115 border-white shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Color de camiseta ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Color de Pantalón */}
          <div>
            <label className="font-black text-slate-300 text-[11px] uppercase tracking-wider block mb-1.5">
              Pantalón / Pollera
            </label>
            <div className="flex gap-2 flex-wrap">
              {PANTS_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onChangeStyle({ ...avatarStyle, pantsColor: c })}
                  className={`w-7 h-7 rounded-xl border-2 transition cursor-pointer ${
                    avatarStyle.pantsColor === c ? 'scale-115 border-white shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Color de pantalón ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Accesorio */}
          <div>
            <label className="font-black text-slate-300 text-[11px] uppercase tracking-wider block mb-1.5">
              Accesorio Especial
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {(
                [
                  { id: 'none', label: 'Sin accesorio' },
                  { id: 'glasses', label: 'Lentes 🕶️' },
                  { id: 'backpack', label: 'Mochila 🎒' },
                  { id: 'star_hat', label: 'Estrella 🌟' },
                  { id: 'headphones', label: 'Auriculares 🎧' },
                ] as const
              ).map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => onChangeStyle({ ...avatarStyle, accessory: acc.id })}
                  className={`py-1.5 px-1 rounded-xl font-bold text-[10px] border transition cursor-pointer truncate ${
                    avatarStyle.accessory === acc.id
                      ? 'bg-amber-400 text-slate-950 border-amber-200 shadow'
                      : 'bg-indigo-950/80 text-slate-300 border-indigo-800/80 hover:bg-indigo-900'
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider game-button shadow-xl cursor-pointer"
        >
          ¡Listo! Salir a Jugar con este Look 🚀
        </button>
      </div>
    </div>
  );
};
