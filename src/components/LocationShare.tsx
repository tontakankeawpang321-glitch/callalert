import React, { useState } from 'react';
import {
  MapPin,
  Share2,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Navigation
} from 'lucide-react';
import { copyToClipboard, shareEmergencyPayload } from '../utils/sharing';
import { formatEmergencySms } from '../utils/emergency';

interface LocationShareProps {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  loading: boolean;
  error: string | null;
  onRequestLocation: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const LocationShare: React.FC<LocationShareProps> = ({
  latitude,
  longitude,
  accuracy,
  loading,
  error,
  onRequestLocation,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  const mapsUrl = latitude && longitude
    ? `https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`
    : '';

  const handleCopy = async () => {
    if (!mapsUrl) {
      onRequestLocation();
      onShowToast('กำลังระบุพิกัด กรุณารอสักครู่', 'info');
      return;
    }
    const success = await copyToClipboard(mapsUrl);
    if (success) {
      setCopied(true);
      onShowToast('คัดลอกลิงก์พิกัด Google Maps เรียบร้อยแล้ว', 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    const text = formatEmergencySms({
      lat: latitude || 0,
      lng: longitude || 0,
      accuracy
    });
    const res = await shareEmergencyPayload({
      title: '🚨 ขอความช่วยเหลือด่วน - พิกัดปัจจุบัน',
      text,
      url: mapsUrl
    });
    if (res.method === 'copy') {
      onShowToast('คัดลอกข้อความและพิกัดลงคลิปบอร์ดแล้ว', 'success');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 rounded-xl">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
              พิกัด GPS ขอความช่วยเหลือฉุกเฉิน
            </h3>
            <p className="text-[10px] text-slate-400">
              {accuracy ? `ความแม่นยำประมาณ ${Math.round(accuracy)} เมตร` : 'ระบุตำแหน่งจากดาวเทียมและเครือข่ายมือถือ'}
            </p>
          </div>
        </div>

        <button
          onClick={onRequestLocation}
          disabled={loading}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
          title="อัปเดตพิกัด GPS อีกครั้ง"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-red-600' : ''}`} />
        </button>
      </div>

      {error ? (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs rounded-xl border border-red-200 dark:border-red-900">
          ⚠️ {error}
        </div>
      ) : (
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-200 break-all flex items-center justify-between gap-2">
          <span className="truncate">
            {latitude && longitude
              ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
              : 'กำลังค้นหาตำแหน่ง GPS...'}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
            {latitude ? 'GPS ออนไลน์' : 'กำลังค้นหา'}
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        <button
          onClick={handleCopy}
          className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอกพิกัด'}</span>
        </button>

        <button
          onClick={handleShare}
          className="py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>แชร์ / SMS</span>
        </button>

        {mapsUrl ? (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Navigation className="w-4 h-4" />
            <span>เปิดแผนที่</span>
          </a>
        ) : (
          <button
            onClick={onRequestLocation}
            className="py-2.5 px-3 bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 opacity-60 cursor-not-allowed"
          >
            <Navigation className="w-4 h-4" />
            <span>เปิดแผนที่</span>
          </button>
        )}
      </div>
    </div>
  );
};
