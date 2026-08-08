import React from 'react';
import { Hospital, Shield, Flame, Pill, Ambulance, Navigation, Phone, ExternalLink } from 'lucide-react';
import { getGoogleMapsSearchUrl } from '../utils/location';

interface NearbyHelpProps {
  latitude: number | null;
  longitude: number | null;
  onCallHotline?: (tel: string) => void;
}

interface FacilityCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: typeof Hospital;
  query: string;
  hotline: string;
  desc: string;
  colorClass: string;
}

const facilityCategories: FacilityCategory[] = [
  {
    id: 'hospital',
    name: 'โรงพยาบาลและศูนย์การแพทย์ฉุกเฉิน',
    nameEn: 'Hospitals & Emergency Medical',
    icon: Hospital,
    query: 'hospital emergency room',
    hotline: '1669',
    desc: 'ห้องฉุกเฉิน ER, ศูนย์กู้ชีพ, รถพยาบาลส่งต่อ',
    colorClass: 'text-red-600 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900/50',
  },
  {
    id: 'police',
    name: 'สถานีตำรวจนครบาล / ภูธร',
    nameEn: 'Police Stations',
    icon: Shield,
    query: 'police station',
    hotline: '191',
    desc: 'แจ้งความเหตุร้าย, คดีประทุษร้าย, ระงับเหตุวิวาท',
    colorClass: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900/50',
  },
  {
    id: 'fire',
    name: 'สถานีดับเพลิงและกู้ภัย',
    nameEn: 'Fire & Disaster Stations',
    icon: Flame,
    query: 'fire station',
    hotline: '199',
    desc: 'ดับเพลิง, ช่วยคนติดค้าง, จับสัตว์มีพิษ',
    colorClass: 'text-orange-600 bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-900/50',
  },
  {
    id: 'pharmacy',
    name: 'ร้านขายยา 24 ชั่วโมง',
    nameEn: '24-Hour Pharmacies',
    icon: Pill,
    query: '24 hour pharmacy drugstore',
    hotline: '1323',
    desc: 'ยาสามัญ, เวชภัณฑ์ทำแผล, ปรึกษาเภสัชกร',
    colorClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900/50',
  },
  {
    id: 'rescue',
    name: 'มูลนิธิกู้ภัย / จุดพักรถฉุกเฉิน',
    nameEn: 'Rescue Foundation Stations',
    icon: Ambulance,
    query: 'rescue foundation unit',
    hotline: '1418',
    desc: 'หน่วยอาสากู้ภัย, เคลื่อนย้ายผู้ป่วย, ป่อเต็กตึ๊ง, ร่วมกตัญญู',
    colorClass: 'text-purple-600 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-900/50',
  },
];

export const NearbyHelp: React.FC<NearbyHelpProps> = ({
  latitude,
  longitude,
  onCallHotline,
}) => {
  const handleNavigate = (query: string) => {
    const url = getGoogleMapsSearchUrl(query, latitude, longitude);
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800">
        <h2 className="font-extrabold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
          🏥 สถานที่และหน่วยช่วยเหลือใกล้ฉัน (Nearby Help)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          ค้นหาเส้นทางนำทางและติดต่อหน่วยบริการที่ใกล้พิกัด GPS ของคุณที่สุด
        </p>

        <div className="mt-4 space-y-3">
          {facilityCategories.map((facility) => {
            const Icon = facility.icon;
            return (
              <div
                key={facility.id}
                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`p-3 rounded-2xl shrink-0 border ${facility.colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                      {facility.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {facility.desc}
                    </p>
                    <span className="text-[10px] font-mono text-red-600 dark:text-red-400 font-extrabold">
                      สายด่วนตรง: {facility.hotline}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
                  <button
                    onClick={() => handleNavigate(facility.query)}
                    className="flex-1 sm:flex-initial py-2.5 px-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>นำทาง</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </button>

                  <a
                    href={`tel:${facility.hotline}`}
                    onClick={() => onCallHotline?.(facility.hotline)}
                    className="py-2.5 px-3.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    title={`โทร ${facility.hotline}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>โทร {facility.hotline}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
