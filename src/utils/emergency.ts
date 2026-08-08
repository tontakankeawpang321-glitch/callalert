import { MedicalIDData } from '../types';

export function formatEmergencySms(coords?: { lat: number; lng: number; accuracy?: number | null }, customNote?: string): string {
  let msg = '🚨 [ขอความช่วยเหลือด่วน!] ฉันประสบเหตุฉุกเฉิน';
  if (customNote) {
    msg += ` (${customNote})`;
  }
  if (coords && coords.lat && coords.lng) {
    msg += `\nพิกัด GPS ปัจจุบันของฉัน:\nhttps://maps.google.com/?q=${coords.lat.toFixed(6)},${coords.lng.toFixed(6)}`;
    if (coords.accuracy) {
      msg += `\n(ความแม่นยำ ~${Math.round(coords.accuracy)} ม.)`;
    }
  }
  msg += '\nโปรดโทรกลับหรือประสานงานหน่วยกู้ภัยด่วนที่สุด!';
  return msg;
}

export function formatMedicalSummary(ice: MedicalIDData): string {
  let summary = `🪪 ข้อมูลการแพทย์ฉุกเฉิน (ICE Card)\n`;
  summary += `ชื่อ-สกุล: ${ice.fullName || 'ไม่ได้ระบุ'}\n`;
  summary += `หมู่เลือด: ${ice.bloodType || 'ไม่ทราบ'}\n`;
  if (ice.emergencyContactPhone) {
    summary += `ผู้ติดต่อฉุกเฉิน: ${ice.emergencyContactName || 'ญาติ'} (${ice.emergencyContactPhone})\n`;
  }
  if (ice.chronicDiseases) {
    summary += `โรคประจำตัว: ${ice.chronicDiseases}\n`;
  }
  if (ice.allergies) {
    summary += `ประวัติแพ้ยา/อาหาร: ${ice.allergies}\n`;
  }
  if (ice.medications) {
    summary += `ยาที่ใช้ประจำ: ${ice.medications}\n`;
  }
  if (ice.organDonor) {
    summary += `บริจาคอวัยวะ: เป็นผู้บริจาคอวัยวะ\n`;
  }
  return summary;
}
