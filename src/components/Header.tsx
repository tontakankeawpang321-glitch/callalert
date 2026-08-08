import React from 'react';
import {
  Globe,
  Siren,
  Flashlight,
  HeartPulse,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  ChevronDown,
  Menu
} from 'lucide-react';
import { CountryData } from '../types';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  currentCountry: CountryData;
  onOpenCountryDrawer: () => void;
  onOpenICECard: () => void;
  isSirenActive: boolean;
  onToggleSiren: () => void;
  isFlashlightActive: boolean;
  onToggleFlashlight: () => void;
  isSpeaking: boolean;
  onToggleQuickVoice: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCountry,
  onOpenCountryDrawer,
  onOpenICECard,
  isSirenActive,
  onToggleSiren,
  isFlashlightActive,
  onToggleFlashlight,
  isSpeaking,
  onToggleQuickVoice,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="bg-red-600 dark:bg-red-700 text-white sticky top-0 z-[100] shadow-md backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 transition-colors">
      <div className="container mx-auto px-3 sm:px-4 py-2.5 max-w-4xl flex justify-between items-center gap-2">
        
        {/* Left: Brand & Country Selector */}
        <div className="flex items-center gap-2 shrink-0 min-w-0">
          <button
            onClick={onOpenCountryDrawer}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-700/80 hover:bg-red-800 dark:bg-red-800/90 dark:hover:bg-red-900 rounded-xl transition-all active:scale-95 border border-red-400/40 shrink-0 cursor-pointer shadow-xs"
            title="เปลี่ยนประเทศและเลือกสายด่วน"
            aria-label="เปลี่ยนประเทศ"
          >
            <span className="text-base sm:text-lg leading-none">{currentCountry.flag}</span>
            <span className="text-xs font-bold font-mono tracking-wider">{currentCountry.id}</span>
            <ChevronDown className="w-3 h-3 text-red-200" />
          </button>

          <div className="min-w-0 leading-tight">
            <h1 className="text-sm sm:text-base font-extrabold tracking-tight truncate flex items-center gap-1">
              <span>Global Emergency</span>
            </h1>
            <p className="text-[10px] text-red-100 font-medium truncate">
              ศูนย์ช่วยเหลือฉุกเฉินสากล
            </p>
          </div>
        </div>

        {/* Right: Quick Action Compact Icon Bar */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          {/* Siren Synthesizer */}
          <button
            onClick={onToggleSiren}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all relative active:scale-90 cursor-pointer ${
              isSirenActive
                ? 'bg-yellow-400 text-slate-900 shadow-md animate-bounce ring-2 ring-yellow-200'
                : 'hover:bg-red-700/80 dark:hover:bg-red-800 text-white bg-red-700/40 border border-red-500/30'
            }`}
            title={isSirenActive ? 'ปิดเสียงไซเรน' : 'เปิดเสียงไซเรนฉุกเฉิน'}
            aria-label="เสียงหวอไซเรนฉุกเฉิน"
          >
            <Siren className={`w-4 h-4 ${isSirenActive ? 'text-red-700 animate-spin' : ''}`} />
            {isSirenActive && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
            )}
          </button>

          {/* Flashlight Button */}
          <button
            onClick={onToggleFlashlight}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
              isFlashlightActive
                ? 'bg-white text-slate-900 shadow-md ring-2 ring-white/60'
                : 'hover:bg-red-700/80 dark:hover:bg-red-800 text-white bg-red-700/40 border border-red-500/30'
            }`}
            title="ไฟฉาย / แฟลชหน้าจอฉุกเฉิน"
            aria-label="ไฟฉายฉุกเฉิน"
          >
            <Flashlight className="w-4 h-4" />
          </button>

          {/* Voice Prompt Voice Assistant */}
          <button
            onClick={onToggleQuickVoice}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
              isSpeaking
                ? 'bg-emerald-400 text-slate-900 shadow-md'
                : 'hover:bg-red-700/80 dark:hover:bg-red-800 text-white bg-red-700/40 border border-red-500/30'
            }`}
            title="ระบบเสียงนำทางฉุกเฉิน"
            aria-label="ระบบเสียงนำทางฉุกเฉิน"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* ICE Medical Card Fast View */}
          <button
            onClick={onOpenICECard}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center hover:bg-red-700/80 dark:hover:bg-red-800 transition-all text-white bg-red-700/40 border border-red-500/30 active:scale-90 cursor-pointer"
            title="บัตรการแพทย์ฉุกเฉิน (ICE Card)"
            aria-label="เปิดบัตรข้อมูลการแพทย์ฉุกเฉิน"
          >
            <HeartPulse className="w-4 h-4 text-rose-200" />
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center hover:bg-red-700/80 dark:hover:bg-red-800 transition-all text-white bg-red-700/40 border border-red-500/30 active:scale-90 cursor-pointer"
            title={`เปลี่ยนโหมดสี (ปัจจุบัน: ${theme})`}
            aria-label="เปลี่ยนโหมดสี"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-100" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
