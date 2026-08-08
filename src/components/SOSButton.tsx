import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, AlertTriangle, X, Share2, MapPin, Copy, Check, HeartPulse, Flame, Ambulance, Siren } from 'lucide-react';
import { CountryData, MedicalIDData } from '../types';
import { useEmergencySOS } from '../hooks/useEmergencySOS';
import { shareEmergencyPayload, copyToClipboard } from '../utils/sharing';
import { formatEmergencySms } from '../utils/emergency';

interface SOSButtonProps {
  country: CountryData;
  coords: { lat: number | null; lng: number | null; accuracy: number | null };
  onRequestLocation: () => void;
  iceData?: MedicalIDData;
  onOpenICECard?: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const SOSButton: React.FC<SOSButtonProps> = ({
  country,
  coords,
  onRequestLocation,
  iceData,
  onOpenICECard,
  onShowToast,
}) => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false);

  const {
    isHolding,
    progress,
    countdown,
    startHold,
    cancelHold,
  } = useEmergencySOS({
    holdDurationMs: 3000,
    onTrigger: () => {
      setShowEmergencyModal(true);
      onRequestLocation();
      onShowToast('🚨 ยืนยันการส่งสัญญาณฉุกเฉิน SOS สำเร็จ!', 'success');
    }
  });

  // SVG Circle Progress Math
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleShare = async () => {
    const text = formatEmergencySms({
      lat: coords.lat || 0,
      lng: coords.lng || 0,
      accuracy: coords.accuracy
    });
    const url = coords.lat && coords.lng ? `https://maps.google.com/?q=${coords.lat},${coords.lng}` : '';
    const res = await shareEmergencyPayload({ text, url });
    if (res.method === 'copy') {
      onShowToast('คัดลอกข้อความและพิกัดฉุกเฉินแล้ว พร้อมส่งในแชท!', 'success');
    } else {
      onShowToast('เปิดหน้าต่างส่งข้อความฉุกเฉินแล้ว', 'info');
    }
  };

  const handleCopyCoords = async () => {
    if (!coords.lat || !coords.lng) {
      onRequestLocation();
      onShowToast('กำลังระบุพิกัด GPS...', 'info');
      return;
    }
    const mapsLink = `https://maps.google.com/?q=${coords.lat.toFixed(6)},${coords.lng.toFixed(6)}`;
    const success = await copyToClipboard(mapsLink);
    if (success) {
      setCopiedLocation(true);
      onShowToast('คัดลอกลิงก์ Google Maps พิกัดฉุกเฉินแล้ว', 'success');
      setTimeout(() => setCopiedLocation(false), 3000);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-white to-red-50/50 dark:from-slate-900 dark:to-slate-950 border border-red-200 dark:border-red-900/60 rounded-[2.5rem] p-6 sm:p-7 text-center shadow-xl relative overflow-hidden transition-all">
        
        {/* Subtle Watermark Icon */}
        <div className="absolute -right-6 -top-6 p-6 opacity-5 dark:opacity-10 pointer-events-none">
          <PhoneCall className="w-48 h-48 text-red-600" />
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 text-xs font-bold mb-3 border border-red-200 dark:border-red-800">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span>สายด่วนฉุกเฉินหลัก ({country.name.split(' ')[0]})</span>
        </div>

        {/* 3-SECOND PRESS & HOLD SOS TRIGGER */}
        <div className="my-3 flex flex-col items-center justify-center select-none">
          <div className="relative w-48 h-48 flex items-center justify-center">
            
            {/* SVG Progress Ring */}
            <svg className="absolute w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-red-100 dark:stroke-red-950/60"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-red-600 transition-all duration-75 ease-linear"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Hold Button */}
            <button
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              onTouchCancel={cancelHold}
              onContextMenu={(e) => e.preventDefault()}
              aria-label="กดค้าง 3 วินาทีเพื่อเปิดระบบช่วยเหลือฉุกเฉิน"
              className={`sos-btn-pulse relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-transform active:scale-95 cursor-pointer touch-none select-none ${
                isHolding
                  ? 'bg-gradient-to-tr from-red-700 to-red-600 scale-95 ring-8 ring-red-400/40'
                  : 'bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 ring-8 ring-red-100 dark:ring-red-950/60'
              }`}
            >
              {isHolding ? (
                <div className="flex flex-col items-center animate-pulse">
                  <span className="text-4xl font-black">{countdown}</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-100">
                    กำลังยืนยัน...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <PhoneCall className="w-10 h-10 mb-1 animate-bounce" />
                  <span className="text-xs font-black tracking-wider uppercase">กดค้าง 3 วิ</span>
                  <span className="text-[9px] text-red-100 opacity-90">เพื่อขอความช่วยเหลือ</span>
                </div>
              )}
            </button>
          </div>

          <div className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            {isHolding ? (
              <span className="text-red-600 dark:text-red-400 font-bold animate-pulse">
                ⚠️ กดค้างไว้อีก {countdown} วินาที (ปล่อยเพื่อยกเลิก)
              </span>
            ) : (
              <span>กดค้าง 3 วินาที ป้องกันการกดพลาดโดยไม่ตั้งใจ</span>
            )}
          </div>
        </div>

        {/* SOS Hotline Number Display */}
        <p className="text-5xl font-black text-red-600 dark:text-red-500 tracking-tight mt-1 mb-1 font-mono">
          {country.mainSos}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {country.desc}
        </p>

        {/* QUICK THREE CORE EMERGENCY ACTION BUTTONS */}
        <div className="mt-5 grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <a
            href={`tel:${country.police}`}
            className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:border-red-300 dark:hover:border-red-800 active:scale-95 transition-all"
            title={`โทรหาตำรวจ (${country.police})`}
          >
            <ShieldAlert className="w-5 h-5 text-blue-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">ตำรวจ</span>
            <span className="text-[10px] text-slate-400 font-extrabold">{country.police}</span>
          </a>

          <a
            href={`tel:${country.amb}`}
            className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:border-red-300 dark:hover:border-red-800 active:scale-95 transition-all"
            title={`เรียกรถพยาบาลกู้ชีพ (${country.amb})`}
          >
            <Ambulance className="w-5 h-5 text-red-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">กู้ชีพฉุกเฉิน</span>
            <span className="text-[10px] text-slate-400 font-extrabold">{country.amb}</span>
          </a>

          <a
            href={`tel:${country.fire}`}
            className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:border-red-300 dark:hover:border-red-800 active:scale-95 transition-all"
            title={`โทรหาดับเพลิง (${country.fire})`}
          >
            <Flame className="w-5 h-5 text-orange-500 mb-1" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">ดับเพลิง</span>
            <span className="text-[10px] text-slate-400 font-extrabold">{country.fire}</span>
          </a>
        </div>

        {/* QUICK SHARE LOCATION BUTTON */}
        <button
          onClick={handleShare}
          className="w-full mt-3 py-2.5 px-4 bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 border border-red-200/50 dark:border-red-800/40 cursor-pointer active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          <span>ส่งพิกัดฉุกเฉินปัจจุบันผ่าน SMS / LINE ให้ผู้ช่วยชีวิต</span>
        </button>
      </div>

      {/* CONFIRMED EMERGENCY ACTION MODAL */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[250] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-red-200 dark:border-red-900 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-100 dark:bg-red-950 text-red-600 rounded-2xl animate-pulse">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                    🚨 สัญญาณฉุกเฉิน SOS พร้อมทำงาน
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    เลือกวิธีขอความช่วยเหลือด่วน
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Direct Call Big Action */}
            <div className="space-y-2">
              <a
                href={`tel:${country.mainSos}`}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <PhoneCall className="w-6 h-6 animate-bounce" />
                <span>กดโทรสายด่วน {country.mainSos} ทันที</span>
              </a>
            </div>

            {/* GPS Coordinates Ready Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>พิกัด GPS สำหรับแจ้งกู้ภัย:</span>
                </div>
                <button
                  onClick={handleCopyCoords}
                  className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {copiedLocation ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLocation ? 'คัดลอกแล้ว' : 'คัดลอกพิกัด'}
                </button>
              </div>

              <div className="text-xs font-mono text-slate-600 dark:text-slate-300 break-all bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                {coords.lat && coords.lng ? (
                  `https://maps.google.com/?q=${coords.lat.toFixed(6)},${coords.lng.toFixed(6)}`
                ) : (
                  'กำลังตรวจหาพิกัดดาวเทียม...'
                )}
              </div>
            </div>

            {/* Share / SMS Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleShare}
                className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>ส่ง SMS / พิกัดด่วน</span>
              </button>

              {onOpenICECard && (
                <button
                  onClick={() => {
                    setShowEmergencyModal(false);
                    onOpenICECard();
                  }}
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>เปิดข้อมูลแพทย์ (ICE)</span>
                </button>
              )}
            </div>

            {/* Fast Quick Contacts */}
            {iceData && iceData.emergencyContactPhone && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 flex justify-between items-center">
                <div>
                  <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                    เบอร์ญาติฉุกเฉิน (ICE): {iceData.emergencyContactName}
                  </div>
                  <div className="text-xs font-black text-emerald-700 dark:text-emerald-400">
                    {iceData.emergencyContactPhone}
                  </div>
                </div>
                <a
                  href={`tel:${iceData.emergencyContactPhone}`}
                  className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow active:scale-90"
                >
                  โทรหาญาติ
                </a>
              </div>
            )}

            <button
              onClick={() => setShowEmergencyModal(false)}
              className="w-full py-2.5 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
            >
              ปิดหน้าต่างฉุกเฉิน
            </button>

          </div>
        </div>
      )}
    </>
  );
};
