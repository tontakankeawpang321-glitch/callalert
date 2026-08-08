import React from 'react';
import {
  Siren,
  Flashlight,
  Volume2,
  VolumeX,
  Radio,
  Compass,
  MapPin,
  RefreshCw,
  PhoneCall,
  Activity,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useEmergencyTools } from '../hooks/useEmergencyTools';

interface EmergencyToolsTabProps {
  tools: ReturnType<typeof useEmergencyTools>;
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  onRequestLocation: () => void;
  loadingLocation: boolean;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const EmergencyToolsTab: React.FC<EmergencyToolsTabProps> = ({
  tools,
  latitude,
  longitude,
  accuracy,
  onRequestLocation,
  loadingLocation,
  onShowToast,
}) => {
  const {
    isSirenActive,
    toggleSiren,
    isFlashlightActive,
    isScreenStrobeActive,
    toggleFlashlight,
    toggleScreenStrobe,
    isVibratingSOS,
    triggerSOSMorseVibrate,
    speakText,
    stopSpeech,
    isSpeaking,
  } = tools;

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeech();
      onShowToast('ปิดเสียงนำทางฉุกเฉินแล้ว', 'info');
    } else {
      const text = `นี่คือระบบนำทางฉุกเฉิน โกลบอล อีเมอร์เจนซี่ ฮับ หากคุณประสบเหตุร้าย โปรดกดปุ่มสีแดงเพื่อโทร 191 หรือ 1669 หรือกดค้างปุ่ม SOS เพื่อส่งพิกัดให้ทีมกู้ชีพทันที`;
      speakText(text);
      onShowToast('กำลังเล่นเสียงนำทางฉุกเฉิน (Speech Synthesis)', 'success');
    }
  };

  const handleToggleMorse = () => {
    const active = triggerSOSMorseVibrate();
    if (active) {
      onShowToast('เริ่มการสั่นรหัสมอร์ส SOS (... --- ...) แล้ว', 'success');
    } else {
      onShowToast('หยุดการสั่นรหัสมอร์สแล้ว', 'info');
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white p-5 sm:p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Emergency Hardware & Sensor Utilities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            🛠️ ชุดเครื่องมือฉุกเฉินสนาม (Emergency Toolbox)
          </h2>
          <p className="text-xs text-red-100 font-medium">
            เครื่องมือสร้างสัญญาณเสียง ไซเรน แฟลชสโตรบ สั่นรหัสมอร์ส และเสียงสังเคราะห์
          </p>
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* 1. Siren Audio Synthesizer */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${isSirenActive ? 'bg-yellow-400 text-slate-900 animate-bounce' : 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400'}`}>
                <Siren className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  ไซเรนฉุกเฉิน (Audio Siren)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  สร้างคลื่นเสียงแหลมสลับ 600-1300Hz ขอความช่วยเหลือ
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={toggleSiren}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md ${
              isSirenActive
                ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950 animate-pulse'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            <Siren className={`w-4 h-4 ${isSirenActive ? 'animate-spin' : ''}`} />
            <span>{isSirenActive ? '🚨 กำลังเปิดเสียงไซเรน (กดเพื่อปิด)' : '🔊 เปิดเสียงไซเรนฉุกเฉิน'}</span>
          </button>
        </div>

        {/* 2. Flashlight & Screen Strobe */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${isFlashlightActive ? 'bg-amber-400 text-slate-900' : 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400'}`}>
                <Flashlight className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  ไฟฉาย / หน้าจอกระพริบ (Torch & Strobe)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  เปิดไฟแฟลชกล้องหลัง หรือใช้หน้าจอสว่างสูงสุดเพื่อส่งสัญญาณ
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={toggleFlashlight}
              className={`py-3.5 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm ${
                isFlashlightActive
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              <Flashlight className="w-4 h-4" />
              <span>{isFlashlightActive ? 'ปิดไฟฉาย' : 'เปิดไฟฉาย'}</span>
            </button>

            <button
              onClick={toggleScreenStrobe}
              className={`py-3.5 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm ${
                isScreenStrobeActive
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>{isScreenStrobeActive ? 'ปิดแฟลชจอ' : 'แฟลชหน้าจอ'}</span>
            </button>
          </div>
        </div>

        {/* 3. SOS Morse Vibration */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${isVibratingSOS ? 'bg-purple-600 text-white animate-pulse' : 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400'}`}>
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  สั่นรหัสมอร์ส SOS (... --- ...)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  สั่นเตือนสัญญาณสากล สั้น 3 ยาว 3 สั้น 3 วนซ้ำ
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleMorse}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md ${
              isVibratingSOS
                ? 'bg-purple-600 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{isVibratingSOS ? '📳 กำลังสั่นรหัสมอร์ส SOS (กดเพื่อหยุด)' : '📳 เริ่มสั่นรหัสมอร์ส SOS'}</span>
          </button>
        </div>

        {/* 4. Thai Voice Assistant Synthesizer */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${isSpeaking ? 'bg-emerald-500 text-white animate-pulse' : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'}`}>
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  เสียงบรรยายนำทางฉุกเฉิน (Voice Guide)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  อ่านวิธีปฏิบัติและเบอร์ช่วยเหลือด้วยเสียงพูดสังเคราะห์
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleVoice}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md ${
              isSpeaking
                ? 'bg-emerald-600 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? '🔇 กำลังอ่านออกเสียง (กดเพื่อหยุด)' : '🗣️ เปิดเสียงบรรยายวิธีแจ้งเหตุ'}</span>
          </button>
        </div>

      </div>

      {/* GPS & Sensor Diagnostics Card */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                สถานะเซนเซอร์และพิกัดดาวเทียม (GPS & Diagnostics)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ตรวจสอบความพร้อมของฮาร์ดแวร์ก่อนส่งสัญญาณกู้ชีพ
              </p>
            </div>
          </div>

          <button
            onClick={onRequestLocation}
            disabled={loadingLocation}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl transition-all cursor-pointer"
            title="รีเฟรช GPS"
          >
            <RefreshCw className={`w-4 h-4 ${loadingLocation ? 'animate-spin text-red-600' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              ละติจูด (Latitude)
            </span>
            <span className="text-sm font-mono font-extrabold text-slate-900 dark:text-slate-100 mt-1 block">
              {latitude ? latitude.toFixed(6) : 'กำลังค้นหา...'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              ลองจิจูด (Longitude)
            </span>
            <span className="text-sm font-mono font-extrabold text-slate-900 dark:text-slate-100 mt-1 block">
              {longitude ? longitude.toFixed(6) : 'กำลังค้นหา...'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              ความแม่นยำ (Accuracy)
            </span>
            <span className="text-sm font-mono font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
              {accuracy ? `±${Math.round(accuracy)} เมตร` : 'ดาวเทียมสแตนด์บาย'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>เซนเซอร์ทั้งหมดทำงานแบบ Client-Side เพื่อความเป็นส่วนตัวและความรวดเร็วสูงสุด</span>
        </div>
      </div>
    </div>
  );
};
