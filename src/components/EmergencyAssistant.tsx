import React, { useState } from 'react';
import {
  Compass,
  PhoneCall,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { emergencyGuides } from '../data/emergencyGuides';
import { EmergencyGuideItem } from '../types';

interface EmergencyAssistantProps {
  onSelectFirstAidTopic?: (topicId: string) => void;
  onCallHotline?: (tel: string) => void;
}

export const EmergencyAssistant: React.FC<EmergencyAssistantProps> = ({
  onSelectFirstAidTopic,
  onCallHotline,
}) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(emergencyGuides[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedGuide =
    emergencyGuides.find((g) => g.id === selectedGuideId) || emergencyGuides[0];

  const filteredGuides = emergencyGuides.filter((g) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      g.title.toLowerCase().includes(q) ||
      g.recommendedNumber.includes(q) ||
      g.recommendedService.toLowerCase().includes(q) ||
      g.reason.toLowerCase().includes(q) ||
      g.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-5 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>ระบบแนะนำเบอร์ฉุกเฉินอัจฉริยะ</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">
            🧭 ฉันควรโทรเบอร์ไหน? (Emergency Assistant)
          </h2>
          <p className="text-xs text-red-100 font-medium">
            เลือกเหตุการณ์หรือพิมพ์อาการ ระบบจะวิเคราะห์และแนะนำเบอร์ที่ถูกต้องพร้อมแนวทางทันที
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
          placeholder="พิมพ์เหตุการณ์ เช่น รถชน, ไฟไหม้, คนหมดสติ, โดนโกงเงิน, เด็กหาย..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
        />
      </div>

      {/* Scenario Chips Selection Carousel */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          เลือกเหตุการณ์ที่พบเจอ:
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filteredGuides.map((guide) => {
            const isSelected = guide.id === selectedGuideId;
            return (
              <button
                key={guide.id}
                onClick={() => setSelectedGuideId(guide.id)}
                className={`whitespace-nowrap px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-red-600 border-red-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{guide.title.split(' / ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Recommendation Card */}
      {selectedGuide && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 space-y-4">
          
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                selectedGuide.severity === 'critical'
                  ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
              }`}>
                {selectedGuide.severity === 'critical' ? '🚨 ภาวะวิกฤติฉุกเฉิน' : '⚠️ เหตุเร่งด่วน'}
              </span>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 mt-1">
                {selectedGuide.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                เหตุการณ์นี้แนะนำให้ติดต่อ: <strong className="text-red-600 dark:text-red-400">{selectedGuide.recommendedService}</strong>
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-3xl sm:text-4xl font-black text-red-600 dark:text-red-500 font-mono block">
                {selectedGuide.recommendedNumber}
              </span>
            </div>
          </div>

          {/* Reason Section */}
          <div className="bg-red-50/70 dark:bg-red-950/30 p-3.5 rounded-2xl border border-red-100 dark:border-red-900/50">
            <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <Compass className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-700 dark:text-red-400">เหตุผลที่ควรโทรเบอร์นี้: </strong>
                {selectedGuide.reason}
              </div>
            </div>
          </div>

          {/* Immediate Action Steps Checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              สิ่งที่ควรทำทันทีขณะเกิดเหตุ:
            </h4>
            <div className="space-y-1.5 pl-1">
              {selectedGuide.immediateAction.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Call Button & First Aid Link */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <a
              href={`tel:${selectedGuide.recommendedNumber}`}
              onClick={() => onCallHotline?.(selectedGuide.recommendedNumber)}
              className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>กดโทร {selectedGuide.recommendedNumber} ทันที</span>
            </a>

            {selectedGuide.firstAidRefId && onSelectFirstAidTopic && (
              <button
                onClick={() => onSelectFirstAidTopic(selectedGuide.firstAidRefId!)}
                className="py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <span>ดูวิธีปฐมพยาบาล</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
