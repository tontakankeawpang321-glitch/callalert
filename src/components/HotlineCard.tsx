import React from 'react';
import { Phone, Mail, Clock, ShieldCheck, PhoneCall } from 'lucide-react';
import { HotlineNumber } from '../types';

interface HotlineCardProps {
  number: HotlineNumber;
  searchTerm?: string;
  onCallAction?: (tel: string) => void;
}

export const HotlineCard: React.FC<HotlineCardProps> = ({ number, onCallAction }) => {
  return (
    <div className="flex justify-between items-center py-3.5 border-b border-slate-100 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-1 rounded-xl transition-colors">
      <div className="flex-1 pr-3 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
            {number.name}
          </span>
          {number.tollFree && (
            <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded">
              โทรฟรี
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
          {number.desc}
        </p>

        {number.tel && (
          <a
            href={`tel:${number.tel}`}
            onClick={() => onCallAction?.(number.tel!)}
            className="text-red-600 dark:text-red-400 font-black text-lg sm:text-xl mt-1 inline-flex items-center gap-1.5 hover:underline tracking-tight font-mono cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-red-500 inline" />
            {number.tel}
          </a>
        )}

        {number.email && (
          <a
            href={`mailto:${number.email}`}
            className="text-blue-600 dark:text-blue-400 text-xs mt-1 block break-all font-semibold hover:underline cursor-pointer"
          >
            ✉️ {number.email}
          </a>
        )}

        {/* Verification and Hours Info */}
        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
          {number.hours && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {number.hours}
            </span>
          )}
          <span className="flex items-center gap-1 truncate" title={number.source}>
            <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="truncate">{number.source}</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {number.tel && (
          <a
            href={`tel:${number.tel}`}
            onClick={() => onCallAction?.(number.tel!)}
            className="w-11 h-11 bg-red-600 hover:bg-red-700 active:scale-90 text-white rounded-2xl shadow-md flex items-center justify-center transition-all cursor-pointer"
            title={`โทรทันที ${number.tel}`}
            aria-label={`โทรทันที ${number.name} เบอร์ ${number.tel}`}
          >
            <Phone className="w-5 h-5" />
          </a>
        )}

        {number.email && (
          <a
            href={`mailto:${number.email}`}
            className="w-11 h-11 bg-blue-600 hover:bg-blue-700 active:scale-90 text-white rounded-2xl shadow-md flex items-center justify-center transition-all cursor-pointer"
            title={`ส่งอีเมล ${number.email}`}
            aria-label={`ส่งอีเมลถึง ${number.name}`}
          >
            <Mail className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};
