import React, { useState } from 'react';
import {
  Flame,
  Waves,
  Wind,
  Activity,
  Zap,
  Cloud,
  Building,
  ShieldAlert,
  PhoneCall,
  AlertTriangle,
  CheckCircle2,
  Search,
  ChevronDown
} from 'lucide-react';
import { disasterTopics } from '../data/disasters';
import { DisasterTopic } from '../types';

interface DisasterGuideProps {
  onCallHotline?: (tel: string) => void;
}

const getDisasterIcon = (iconName: string) => {
  switch (iconName) {
    case 'waves':
      return Waves;
    case 'flame':
      return Flame;
    case 'wind':
      return Wind;
    case 'activity':
      return Activity;
    case 'zap':
      return Zap;
    case 'cloud':
      return Cloud;
    case 'building':
      return Building;
    default:
      return ShieldAlert;
  }
};

export const DisasterGuide: React.FC<DisasterGuideProps> = ({ onCallHotline }) => {
  const [selectedDisasterId, setSelectedDisasterId] = useState<string>(disasterTopics[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedDisaster =
    disasterTopics.find((d) => d.id === selectedDisasterId) || disasterTopics[0];

  const filteredDisasters = disasterTopics.filter((d) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.subtitle.toLowerCase().includes(q) ||
      d.immediateDos.some((item) => item.toLowerCase().includes(q)) ||
      d.donts.some((item) => item.toLowerCase().includes(q))
    );
  });

  const SelectedIcon = getDisasterIcon(selectedDisaster.icon);

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white p-5 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
            <span>คู่มือรับมือสาธารณภัยและวิกฤติตามมาตรฐานสากล</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">
            🔥 ภัยพิบัติและเหตุฉุกเฉินระดับชาติ (Disaster Preparedness)
          </h2>
          <p className="text-xs text-red-100 font-medium">
            แนวทางปฏิบัติที่ถูกต้อง สิ่งที่ต้องทำทันที และข้อห้ามเด็ดขาดเพื่อเอาชีวิตรอด
          </p>
        </div>
      </div>

      {/* Quick Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาภัยพิบัติ เช่น น้ำท่วม, ไฟป่า, พายุ, แผ่นดินไหว, ฟ้าผ่า, PM2.5, กราดยิง..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
        />
      </div>

      {/* Scenario Chips Carousel */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          เลือกประเภทภัยพิบัติ:
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filteredDisasters.map((disaster) => {
            const isSelected = disaster.id === selectedDisasterId;
            const Icon = getDisasterIcon(disaster.icon);
            return (
              <button
                key={disaster.id}
                onClick={() => setSelectedDisasterId(disaster.id)}
                className={`whitespace-nowrap px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-red-600 border-red-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{disaster.title.split(' / ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Disaster Detail Card */}
      {selectedDisaster && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-5">
          {/* Disaster Header */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-2xl shrink-0 mt-0.5">
                <SelectedIcon className="w-6 h-6" />
              </div>
              <div>
                {selectedDisaster.alertLevel && (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                    {selectedDisaster.alertLevel}
                  </span>
                )}
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 mt-1">
                  {selectedDisaster.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedDisaster.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Immediate Dos */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              สิ่งที่ต้องทำทันที (Immediate Actions):
            </h4>
            <div className="space-y-2">
              {selectedDisaster.immediateDos.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          {selectedDisaster.donts && selectedDisaster.donts.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="font-bold text-xs text-rose-700 dark:text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                ข้อห้ามเด็ดขาด (สิ่งที่ห้ามทำ):
              </h4>
              <div className="space-y-2">
                {selectedDisaster.donts.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 flex items-start gap-2.5 text-xs text-rose-900 dark:text-rose-200 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Disaster Hotlines */}
          {selectedDisaster.hotlines && selectedDisaster.hotlines.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                สายด่วนรับมือภัยพิบัติตรง:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedDisaster.hotlines.map((h, idx) => (
                  <a
                    key={idx}
                    href={`tel:${h.tel}`}
                    onClick={() => onCallHotline?.(h.tel)}
                    className="p-3 bg-red-50 hover:bg-red-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl border border-red-200/80 dark:border-slate-700 flex flex-col items-center justify-center text-center transition-all active:scale-95 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-red-600 dark:text-red-400 mb-1" />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate w-full">
                      {h.name}
                    </span>
                    <span className="text-xs font-black text-red-600 dark:text-red-400 font-mono mt-0.5">
                      {h.tel}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
