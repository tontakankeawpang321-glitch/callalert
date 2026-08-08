export interface CountryData {
  id: string;
  name: string;
  nameEn: string;
  flag: string;
  mainSos: string;
  police: string;
  amb: string;
  fire: string;
  desc: string;
  source: string;
  lastVerified: string;
}

export interface HotlineNumber {
  name: string;
  nameEn?: string;
  tel?: string;
  email?: string;
  desc: string;
  hours?: string;
  tollFree?: boolean;
  source: string;
  lastVerified: string;
}

export interface HotlineCategoryData {
  id: string;
  category: string;
  icon: string;
  numbers: HotlineNumber[];
}

export interface EmergencyGuideItem {
  id: string;
  title: string;
  icon: string;
  keywords: string[];
  recommendedNumber: string;
  recommendedService: string;
  reason: string;
  immediateAction: string[];
  firstAidRefId?: string;
  severity: 'critical' | 'high' | 'medium';
}

export interface FirstAidStep {
  step: number;
  title: string;
  desc: string;
  warning?: string;
}

export interface FirstAidTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  urgency: 'critical' | 'urgent' | 'moderate';
  callNumber: string;
  steps: FirstAidStep[];
  donts: string[];
  cprCadence?: boolean; // if 100-120 bpm rhythm applies
}

export interface DisasterTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  immediateDos: string[];
  donts: string[];
  hotlines: { name: string; tel: string }[];
  alertLevel?: string;
}

export interface MedicalIDData {
  fullName: string;
  birthDate?: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-' | 'unknown' | '';
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  secondaryContactPhone?: string;
  chronicDiseases: string;
  allergies: string;
  medications: string;
  organDonor: boolean;
  hospitalPreference?: string;
  nationalIdOrPassport?: string;
  notes?: string;
  lastUpdated?: string;
}

export interface GeolocationPositionState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number | null;
  loading: boolean;
  error: string | null;
}

export type TabType = 'home' | 'hotlines' | 'assistant' | 'nearby' | 'firstaid' | 'disasters' | 'medical' | 'tools';
