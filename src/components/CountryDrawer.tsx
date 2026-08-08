import React, { useState } from 'react';
import { X, Search, Check, ShieldCheck } from 'lucide-react';
import { CountryData } from '../types';

interface CountryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  countries: CountryData[];
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
}

export const CountryDrawer: React.FC<CountryDrawerProps> = ({
  isOpen,
  onClose,
  countries,
  selectedCountry,
  onSelectCountry,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      c.mainSos.includes(search) ||
      c.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[150] flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl z-10 flex flex-col overflow-hidden border-r border-slate-100 dark:border-slate-800 animate-in slide-in-from-left duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              🌍 เลือกประเทศที่คุณอยู่
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ระบบจะสลับเบอร์ฉุกเฉินและพิกัดกู้ภัยอัตโนมัติ
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาชื่อประเทศ หรือเบอร์ (เช่น 911, ญี่ปุ่น)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Country List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map((c) => {
            const isSelected = selectedCountry.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCountry(c);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3.5 border cursor-pointer ${
                  isSelected
                    ? 'bg-red-50 dark:bg-red-950/50 border-red-300 dark:border-red-800 text-red-900 dark:text-red-100'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className="text-2xl leading-none pt-0.5">{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{c.name}</span>
                    <span className="text-xs font-black text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/80 px-2 py-0.5 rounded-md">
                      SOS: {c.mainSos}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {c.desc}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 dark:text-slate-500">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span className="truncate">ตรวจทาน: {c.source}</span>
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 self-center" />
                )}
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs">
              ไม่พบประเทศที่ตรงกับคำค้นหา
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
