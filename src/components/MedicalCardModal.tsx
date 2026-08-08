import React from 'react';
import { X, HeartPulse, Phone, AlertCircle, ShieldCheck } from 'lucide-react';
import { MedicalIDData } from '../types';

interface MedicalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  iceData: MedicalIDData;
  onEdit: () => void;
}

export const MedicalCardModal: React.FC<MedicalCardModalProps> = ({
  isOpen,
  onClose,
  iceData,
  onEdit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-6 shadow-2xl border-4 border-red-600 space-y-4 relative overflow-hidden animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Header for Emergency Staff */}
        <div className="flex items-center gap-3 border-b-2 border-red-600 pb-3">
          <div className="p-3 bg-red-600 text-white rounded-2xl">
            <HeartPulse className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-red-600 dark:text-red-400">
              EMERGENCY MEDICAL ID (ICE)
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              บัตรข้อมูลการแพทย์ฉุกเฉิน
            </h2>
          </div>
        </div>

        {/* Big Blood Type Banner */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-50 dark:bg-red-950/60 p-4 rounded-2xl border border-red-200 dark:border-red-900 text-center">
            <span className="text-[11px] font-bold text-red-700 dark:text-red-300 block">
              หมู่เลือด (Blood Type)
            </span>
            <span className="text-4xl font-black text-red-600 dark:text-red-400 font-mono">
              {iceData.bloodType || 'ไม่ระบุ'}
            </span>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center flex flex-col justify-center">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
              ผู้บริจาคอวัยวะ
            </span>
            <span className={`text-base font-extrabold ${iceData.organDonor ? 'text-emerald-600' : 'text-slate-500'}`}>
              {iceData.organDonor ? '✅ บริจาคอวัยวะ' : 'ไม่ได้ระบุ'}
            </span>
          </div>
        </div>

        {/* Patient Name */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            ชื่อ-นามสกุล ผู้ถือเครื่อง
          </span>
          <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            {iceData.fullName || 'ยังไม่ได้กรอกชื่อ'}
          </span>
        </div>

        {/* Emergency Contact Quick Call Button */}
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-1">
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
            เบอร์ติดต่อญาติฉุกเฉิน (In Case of Emergency)
          </span>
          <div className="flex justify-between items-center pt-1">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {iceData.emergencyContactName || 'ผู้ติดต่อฉุกเฉิน'}
                {iceData.emergencyContactRelation ? ` (${iceData.emergencyContactRelation})` : ''}
              </div>
              <div className="text-sm font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {iceData.emergencyContactPhone || 'ยังไม่ได้ระบุเบอร์'}
              </div>
            </div>

            {iceData.emergencyContactPhone && (
              <a
                href={`tel:${iceData.emergencyContactPhone}`}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 active:scale-90 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>โทรหาญาติ</span>
              </a>
            )}
          </div>
        </div>

        {/* Medical Conditions & Allergies */}
        <div className="space-y-2">
          {iceData.chronicDiseases && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs">
              <strong className="text-amber-800 dark:text-amber-300 block mb-0.5">
                🩺 โรคประจำตัว / ภาวะสำคัญ:
              </strong>
              <p className="text-slate-700 dark:text-slate-300">{iceData.chronicDiseases}</p>
            </div>
          )}

          {iceData.allergies && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs">
              <strong className="text-rose-800 dark:text-rose-300 block mb-0.5">
                ⚠️ ประวัติแพ้ยา / แพ้อาหาร:
              </strong>
              <p className="text-slate-700 dark:text-slate-300">{iceData.allergies}</p>
            </div>
          )}

          {iceData.medications && (
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs">
              <strong className="text-blue-800 dark:text-blue-300 block mb-0.5">
                💊 ยาที่ใช้เป็นประจำ:
              </strong>
              <p className="text-slate-700 dark:text-slate-300">{iceData.medications}</p>
            </div>
          )}
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>ข้อมูลนี้เก็บเฉพาะในอุปกรณ์ของคุณ (Local Storage) เพื่อความปลอดภัยสูงสุด</span>
        </div>

        {/* Edit Button */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onEdit();
            }}
            className="flex-1 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl cursor-pointer"
          >
            แก้ไขข้อมูลแพทย์
          </button>
          <button
            onClick={onClose}
            className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
