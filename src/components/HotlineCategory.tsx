import React from 'react';
import {
  ChevronDown,
  ShieldAlert,
  CreditCard,
  Search,
  Scale,
  HeartPulse,
  Car,
  Zap,
  Phone,
  Layers
} from 'lucide-react';
import { HotlineCategoryData } from '../types';
import { HotlineCard } from './HotlineCard';

interface HotlineCategoryProps {
  category: HotlineCategoryData;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  filterText?: string;
  onCallAction?: (tel: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'shield-alert':
      return ShieldAlert;
    case 'credit-card':
    case 'user-x':
      return CreditCard;
    case 'search':
      return Search;
    case 'scale':
    case 'gavel':
      return Scale;
    case 'heart-pulse':
      return HeartPulse;
    case 'car':
      return Car;
    case 'zap':
      return Zap;
    case 'phone':
      return Phone;
    default:
      return Layers;
  }
};

export const HotlineCategory: React.FC<HotlineCategoryProps> = ({
  category,
  isCollapsed,
  onToggleCollapse,
  filterText = '',
  onCallAction,
}) => {
  const Icon = getCategoryIcon(category.icon);

  const filteredNumbers = category.numbers.filter(
    (n) =>
      n.name.toLowerCase().includes(filterText.toLowerCase()) ||
      (n.nameEn && n.nameEn.toLowerCase().includes(filterText.toLowerCase())) ||
      (n.tel && n.tel.includes(filterText)) ||
      (n.email && n.email.toLowerCase().includes(filterText.toLowerCase())) ||
      n.desc.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filteredNumbers.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all">
      {/* Category Accordion Header */}
      <button
        onClick={onToggleCollapse}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
        aria-expanded={!isCollapsed}
      >
        <div className="flex items-center gap-3.5 min-w-0 pr-2">
          <div className="bg-red-50 dark:bg-red-950/60 p-2.5 rounded-2xl text-red-600 dark:text-red-400 shrink-0 border border-red-100 dark:border-red-900/40">
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-snug">
              {category.category}
            </h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              {filteredNumbers.length} หมายเลขในหมวดนี้
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
            isCollapsed ? '-rotate-90' : 'rotate-0'
          }`}
        />
      </button>

      {/* Accordion Content */}
      {!isCollapsed && (
        <div className="px-4 py-1 space-y-1 border-t border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900 animate-in fade-in-50 duration-200">
          {filteredNumbers.map((number, idx) => (
            <HotlineCard
              key={`${number.name}-${idx}`}
              number={number}
              searchTerm={filterText}
              onCallAction={onCallAction}
            />
          ))}
        </div>
      )}
    </div>
  );
};
