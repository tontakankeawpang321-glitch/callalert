import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CountryData } from '../types';

interface CountrySelectorHorizontalProps {
  countries: CountryData[];
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
  onOpenAll: () => void;
}

export const CountrySelectorHorizontal: React.FC<CountrySelectorHorizontalProps> = ({
  countries,
  selectedCountry,
  onSelectCountry,
  onOpenAll,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center px-1">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          เลือกประเทศที่คุณอยู่ (Data-Driven)
        </span>
        <button
          onClick={onOpenAll}
          className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          ดูทั้งหมด ({countries.length} ประเทศ) <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-0.5">
        {countries.map((c) => {
          const isSelected = selectedCountry.id === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCountry(c)}
              className={`whitespace-nowrap px-3.5 py-2 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0 ${
                isSelected
                  ? 'bg-red-600 border-red-600 text-white shadow-md font-bold'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className="text-base leading-none">{c.flag}</span>
              <span className="text-xs font-bold">{c.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
