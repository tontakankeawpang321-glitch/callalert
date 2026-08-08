import React, { useState } from 'react';
import { HeartPulse, Save, ShieldCheck, Phone, Check, Eye } from 'lucide-react';
import { MedicalIDData } from '../types';

interface MedicalIDProps {
  iceData: MedicalIDData;
  onSave: (data: MedicalIDData) => void;
  onOpenCard: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const MedicalID: React.FC<MedicalIDProps> = ({
  iceData,
  onSave,
  onOpenCard,
  onShowToast,
}) => {
  const [formData, setFormData] = useState<MedicalIDData>(iceData);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    onShowToast('บันทึกข้อมูลการแพทย์ฉุกเฉิน ICE ในอุปกรณ์เรียบร้อยแล้ว', 'success');
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 rounded-2xl">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              ข้อมูลการแพทย์ฉุกเฉิน (In Case of Emergency - ICE)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              สำหรับทีมกู้ชีพและแพทย์สนามในกรณีที่คุณหมดสติหรือไม่สามารถตอบคำถามได้
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCard}
          className="hidden sm:flex items-center gap-1.5 py-2 px-3.5 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 font-bold text-xs rounded-xl border border-red-200 dark:border-red-900 hover:bg-red-100 cursor-pointer active:scale-95 transition-all"
        >
          <Eye className="w-4 h-4" />
          <span>ดูการ์ดฉุกเฉิน</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            ชื่อ-นามสกุล ผู้ถือเครื่อง
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="เช่น นายธนากร สุขเจริญ"
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              หมู่เลือด (Blood Type)
            </label>
            <select
              value={formData.bloodType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bloodType: e.target.value as MedicalIDData['bloodType'],
                })
              }
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              <option value="">ระบุกลุ่มเลือด</option>
              <option value="A+">A RH Positive (A+)</option>
              <option value="A-">A RH Negative (A-)</option>
              <option value="B+">B RH Positive (B+)</option>
              <option value="B-">B RH Negative (B-)</option>
              <option value="O+">O RH Positive (O+)</option>
              <option value="O-">O RH Negative (O-)</option>
              <option value="AB+">AB RH Positive (AB+)</option>
              <option value="AB-">AB RH Negative (AB-)</option>
              <option value="unknown">ไม่ทราบหมู่เลือด</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              เบอร์ติดต่อญาติฉุกเฉิน (โทรหาได้ทันที)
            </label>
            <input
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) =>
                setFormData({ ...formData, emergencyContactPhone: e.target.value })
              }
              placeholder="08x-xxx-xxxx"
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              ชื่อผู้ติดต่อฉุกเฉิน
            </label>
            <input
              type="text"
              value={formData.emergencyContactName}
              onChange={(e) =>
                setFormData({ ...formData, emergencyContactName: e.target.value })
              }
              placeholder="เช่น คุณแม่, สมชาย (พี่ชาย)"
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              ความสัมพันธ์
            </label>
            <input
              type="text"
              value={formData.emergencyContactRelation}
              onChange={(e) =>
                setFormData({ ...formData, emergencyContactRelation: e.target.value })
              }
              placeholder="เช่น มารดา, สามี/ภรรยา, บุตร"
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            โรคประจำตัว / ภาวะสำคัญ (เช่น โรคหัวใจ, เบาหวาน, ลมชัก, หอบหืด)
          </label>
          <textarea
            rows={2}
            value={formData.chronicDiseases}
            onChange={(e) => setFormData({ ...formData, chronicDiseases: e.target.value })}
            placeholder="เช่น โรคเบาหวานชนิดที่ 2, โรคความดันโลหิตสูง, ใส่ขดลวดหัวใจ..."
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            ประวัติแพ้ยา / แพ้อาหาร (เช่น แพ้เพนิซิลลิน, แพ้อาหารทะเลรุนแรง)
          </label>
          <textarea
            rows={2}
            value={formData.allergies}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            placeholder="เช่น แพ้ยา Penicillin, แพ้ยา Sulfa, แพ้ถั่วลิสง..."
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            ยาที่ต้องรับประทานเป็นประจำ
          </label>
          <textarea
            rows={2}
            value={formData.medications}
            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            placeholder="เช่น ยาละลายลิ่มเลือด Warfarin, อินซูลินฉีดก่อนอาหาร..."
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <input
            type="checkbox"
            id="organDonor"
            checked={formData.organDonor}
            onChange={(e) => setFormData({ ...formData, organDonor: e.target.checked })}
            className="w-5 h-5 accent-red-600 rounded cursor-pointer"
          />
          <label htmlFor="organDonor" className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
            ฉันเป็นผู้บริจาคอวัยวะและดวงตา (Organ Donor)
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'บันทึกเรียบร้อยแล้ว' : 'บันทึกข้อมูลฉุกเฉิน'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenCard}
            className="py-3.5 px-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>เปิดหน้าจอให้เจ้าหน้าที่ดู</span>
          </button>
        </div>
      </form>

      {/* Privacy Guarantee Note */}
      <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong>นโยบายความเป็นส่วนตัวและความปลอดภัย (Strict Privacy): </strong>
          ข้อมูลการแพทย์นี้ถูกจัดเก็บเฉพาะใน LocalStorage ภายในเว็บเบราว์เซอร์ของอุปกรณ์คุณเท่านั้น และไม่มีการส่งข้อมูลส่วนตัวใดๆ ขึ้นเซิร์ฟเวอร์
        </div>
      </div>
    </div>
  );
};
