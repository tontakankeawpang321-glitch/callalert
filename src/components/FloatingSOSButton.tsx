import React, { useState } from 'react';
import {
  Siren,
  PhoneCall,
  Share2,
  Flashlight,
  HeartPulse,
  Plus,
  X,
  Radio,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { CountryData } from '../types';

interface FloatingSOSButtonProps {
  country: CountryData;
  latitude: number | null;
  longitude: number | null;
  onToggleSiren: () => void;
  isSirenActive: boolean;
  onToggleFlashlight: () => void;
  isFlashlightActive: boolean;
  onOpenICECard: () => void;
  onShareLocation: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const FloatingSOSButton: React.FC<FloatingSOSButtonProps> = ({
  country,
  latitude,
  longitude,
  onToggleSiren,
  isSirenActive,
  onToggleFlashlight,
  isFlashlightActive,
  onOpenICECard,
  onShareLocation,
  onShowToast,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop overlay when speed dial is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[140] transition-opacity animate-in fade-in"
        />
      )}

      {/* Floating Action Speed Dial Container */}
      <div className="fixed bottom-20 right-4 z-[150] flex flex-col items-end gap-2.5 select-none">
        
        {/* Speed Dial Menu Items */}
        {isOpen && (
          <div className="flex flex-col items-end gap-2 mb-1 animate-in slide-in-from-bottom-5 duration-200">
            
            {/* Action 1: Call Police */}
            <a
              href={`tel:${country.police}`}
              onClick={() => {
                onShowToast(`โทรตำรวจฉุกเฉิน ${country.police}...`, 'info');
                setIsOpen(false);
              }}
              className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer font-bold text-xs group"
            >
              <span className="text-[11px] font-bold">โทรตำรวจ ({country.police})</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
            </a>

            {/* Action 2: Call Ambulance / Medical */}
            <a
              href={`tel:${country.amb}`}
              onClick={() => {
                onShowToast(`โทรสายด่วนกู้ชีพฉุกเฉิน ${country.amb}...`, 'info');
                setIsOpen(false);
              }}
              className="flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer font-bold text-xs group"
            >
              <span className="text-[11px] font-bold">โทรพยาบาล/กู้ชีพ ({country.amb})</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <HeartPulse className="w-4 h-4" />
              </div>
            </a>

            {/* Action 3: Share GPS Location */}
            <button
              onClick={() => {
                onShareLocation();
                setIsOpen(false);
              }}
              className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer font-bold text-xs group"
            >
              <span className="text-[11px] font-bold">แชร์พิกัด GPS ด่วน</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
            </button>

            {/* Action 4: Toggle Siren */}
            <button
              onClick={() => {
                onToggleSiren();
                setIsOpen(false);
              }}
              className={`flex items-center gap-2.5 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer font-bold text-xs group ${
                isSirenActive ? 'bg-yellow-500 text-slate-950 animate-pulse' : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              <span className="text-[11px] font-bold">{isSirenActive ? 'ปิดเสียงไซเรน' : 'เปิดเสียงไซเรน'}</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Siren className="w-4 h-4" />
              </div>
            </button>

            {/* Action 5: Flashlight / Screen Strobe */}
            <button
              onClick={() => {
                onToggleFlashlight();
                setIsOpen(false);
              }}
              className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer font-bold text-xs group"
            >
              <span className="text-[11px] font-bold">ไฟฉาย / แฟลชฉุกเฉิน</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Flashlight className="w-4 h-4" />
              </div>
            </button>

            {/* Action 6: ICE Medical Card */}
            <button
              onClick={() => {
                onOpenICECard();
                setIsOpen(false);
              }}
              className="flex items-center gap-2.5 bg-purple-600 hover:bg-purple-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer font-bold text-xs group"
            >
              <span className="text-[11px] font-bold">บัตรข้อมูลแพทย์ ICE</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <HeartPulse className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all transform active:scale-90 cursor-pointer ${
            isOpen
              ? 'bg-slate-900 text-white rotate-90 ring-4 ring-slate-400/40'
              : 'bg-gradient-to-tr from-red-600 to-rose-500 text-white hover:shadow-red-500/50 hover:scale-105 ring-4 ring-red-400/30'
          }`}
          title="ปุ่มลอยฉุกเฉินด่วน (Quick Emergency Actions)"
          aria-label="ปุ่มลอยฉุกเฉินด่วน"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Siren className="w-6 h-6 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
};
