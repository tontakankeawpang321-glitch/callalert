import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Grid,
  Bandage,
  Flame,
  Compass,
  MapPin,
  HeartPulse,
  Wrench,
  X,
  ChevronRight
} from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const isMoreActive = [
    'assistant',
    'nearby',
    'firstaid',
    'disasters',
    'medical',
    'tools',
  ].includes(activeTab);

  const getMoreLabel = () => {
    switch (activeTab) {
      case 'firstaid':
        return 'ปฐมพยาบาล';
      case 'disasters':
        return 'ภัยพิบัติ';
      case 'nearby':
        return 'ช่วยเหลือใกล้ฉัน';
      case 'assistant':
        return 'ตัวช่วยโทร';
      case 'medical':
        return 'ICE แพทย์';
      case 'tools':
        return 'เครื่องมือ';
      default:
        return 'เมนูบริการ';
    }
  };

  const services = [
    {
      id: 'firstaid' as TabType,
      label: 'ปฐมพยาบาล & CPR',
      desc: 'ขั้นตอนช่วยชีวิต CPR เมโทรนอม ห้ามเลือด สำลัก',
      icon: Bandage,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      id: 'disasters' as TabType,
      label: 'คู่มือรับมือภัยพิบัติ',
      desc: 'น้ำท่วม ไฟป่า พายุ แผ่นดินไหว ฟ้าผ่า กราดยิง',
      icon: Flame,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50',
    },
    {
      id: 'nearby' as TabType,
      label: 'หน่วยช่วยเหลือใกล้ฉัน',
      desc: 'ค้นหาโรงพยาบาล สถานีตำรวจ กู้ภัย พร้อมเบอร์โทรและแผนที่',
      icon: MapPin,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50',
    },
    {
      id: 'assistant' as TabType,
      label: 'ตัวช่วยวิเคราะห์แจ้งเหตุ',
      desc: 'ระบบแนะนำเบอร์โทรและแนวทางพูดแจ้งเหตุฉุกเฉิน',
      icon: Compass,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/50',
    },
    {
      id: 'medical' as TabType,
      label: 'บัตรการแพทย์ ICE',
      desc: 'กรุ๊ปเลือด โรคประจำตัว ยาที่แพ้ และเบอร์ติดต่อฉุกเฉิน',
      icon: HeartPulse,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50',
    },
    {
      id: 'tools' as TabType,
      label: 'ชุดเครื่องมือสนาม',
      desc: 'ไซเรน ไฟฉาย หน้าจอสว่าง สั่นมอร์ส SOS เสียงพูดสังเคราะห์',
      icon: Wrench,
      color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/50',
    },
  ];

  return (
    <>
      {/* Services Bottom Sheet / Drawer */}
      {isServicesOpen && (
        <div className="fixed inset-0 z-[130] flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setIsServicesOpen(false)}
          />
          <div className="relative z-10 bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 p-5 max-w-xl mx-auto w-full max-h-[80vh] overflow-y-auto space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-xl">
                  <Grid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                    เมนูบริการและคู่มือทั้งหมด
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    เลือกหมวดหมู่ข้อมูลที่ต้องการเข้าถึงด่วน
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsServicesOpen(false)}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-full text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {services.map((s) => {
                const Icon = s.icon;
                const isSelected = activeTab === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      onTabChange(s.id);
                      setIsServicesOpen(false);
                    }}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'border-red-500 bg-red-50/70 dark:bg-red-950/40 shadow-sm'
                        : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${s.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                          {s.label}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {s.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main 3-Button Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 z-[100] shadow-lg">
        <div className="grid grid-cols-3 max-w-md mx-auto h-16 px-3 items-center">
          
          {/* Button 1: Home */}
          <button
            onClick={() => onTabChange('home')}
            className={`flex flex-col items-center justify-center py-1 transition-all group cursor-pointer active:scale-95 ${
              activeTab === 'home'
                ? 'text-red-600 dark:text-red-400 font-extrabold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <ShieldAlert
                className={`w-6 h-6 transition-transform duration-200 ${
                  activeTab === 'home' ? 'scale-110 stroke-[2.5]' : ''
                }`}
              />
              {activeTab === 'home' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-red-600 dark:bg-red-400 rounded-full" />
              )}
            </div>
            <span className="text-xs tracking-tight mt-1">หน้าหลัก</span>
          </button>

          {/* Button 2: Hotlines */}
          <button
            onClick={() => onTabChange('hotlines')}
            className={`flex flex-col items-center justify-center py-1 transition-all group cursor-pointer active:scale-95 ${
              activeTab === 'hotlines'
                ? 'text-red-600 dark:text-red-400 font-extrabold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <PhoneCall
                className={`w-6 h-6 transition-transform duration-200 ${
                  activeTab === 'hotlines' ? 'scale-110 stroke-[2.5]' : ''
                }`}
              />
              {activeTab === 'hotlines' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-red-600 dark:bg-red-400 rounded-full" />
              )}
            </div>
            <span className="text-xs tracking-tight mt-1">สายด่วน</span>
          </button>

          {/* Button 3: All Services / Menu Sheet */}
          <button
            onClick={() => setIsServicesOpen(true)}
            className={`flex flex-col items-center justify-center py-1 transition-all group cursor-pointer active:scale-95 ${
              isMoreActive
                ? 'text-red-600 dark:text-red-400 font-extrabold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Grid
                className={`w-6 h-6 transition-transform duration-200 ${
                  isMoreActive ? 'scale-110 stroke-[2.5]' : ''
                }`}
              />
              {isMoreActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-red-600 dark:bg-red-400 rounded-full" />
              )}
            </div>
            <span className="text-xs tracking-tight mt-1 truncate max-w-[100px]">
              {getMoreLabel()}
            </span>
          </button>

        </div>
      </nav>
    </>
  );
};
