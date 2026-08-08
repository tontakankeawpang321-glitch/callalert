import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { FloatingSOSButton } from './components/FloatingSOSButton';
import { SOSButton } from './components/SOSButton';
import { CountrySelectorHorizontal } from './components/CountrySelectorHorizontal';
import { CountryDrawer } from './components/CountryDrawer';
import { LocationShare } from './components/LocationShare';
import { EmergencyMap } from './components/EmergencyMap';
import { HotlineCategory } from './components/HotlineCategory';
import { EmergencyAssistant } from './components/EmergencyAssistant';
import { NearbyHelp } from './components/NearbyHelp';
import { FirstAidCard } from './components/FirstAidCard';
import { DisasterGuide } from './components/DisasterGuide';
import { MedicalID } from './components/MedicalID';
import { MedicalCardModal } from './components/MedicalCardModal';
import { EmergencyToolsTab } from './components/EmergencyToolsTab';
import { Toast, ToastMessage } from './components/Toast';

import { countries } from './data/countries';
import { emergencyHotlines } from './data/emergencyHotlines';
import { useTheme } from './hooks/useTheme';
import { useGeolocation } from './hooks/useGeolocation';
import { useEmergencyTools } from './hooks/useEmergencyTools';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CountryData, MedicalIDData, TabType } from './types';
import { shareEmergencyLocation } from './utils/sharing';

import { Search, PhoneCall, ShieldAlert, HeartPulse, X, Radio } from 'lucide-react';

const defaultMedicalData: MedicalIDData = {
  fullName: '',
  bloodType: '',
  emergencyContactName: '',
  emergencyContactRelation: '',
  emergencyContactPhone: '',
  chronicDiseases: '',
  allergies: '',
  medications: '',
  organDonor: false,
};

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const geo = useGeolocation();
  const tools = useEmergencyTools();

  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(countries[0]);
  const [isCountryDrawerOpen, setIsCountryDrawerOpen] = useState(false);
  const [isICECardOpen, setIsICECardOpen] = useState(false);
  const [hotlineSearch, setHotlineSearch] = useState('');
  const [selectedFirstAidTopicId, setSelectedFirstAidTopicId] = useState<string | undefined>();
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const [iceData, setIceData] = useLocalStorage<MedicalIDData>(
    'emergency_ice_data',
    defaultMedicalData
  );

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      const id = Date.now().toString() + Math.random().toString().slice(2, 6);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleCallHotline = (tel: string) => {
    showToast(`กำลังโทรออกสายด่วน ${tel}...`, 'info');
  };

  const handleSelectFirstAidTopic = (topicId: string) => {
    setSelectedFirstAidTopicId(topicId);
    setCurrentTab('firstaid');
  };

  const toggleCategoryCollapse = (categoryId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0C10] text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans pb-24 selection:bg-red-500 selection:text-white">
      {/* 1. Header Toolbar */}
      <Header
        currentCountry={selectedCountry}
        onOpenCountryDrawer={() => setIsCountryDrawerOpen(true)}
        onOpenICECard={() => setIsICECardOpen(true)}
        isSirenActive={tools.isSirenActive}
        onToggleSiren={() => {
          tools.toggleSiren();
          if (!tools.isSirenActive) {
            showToast('🚨 เปิดเสียงไซเรนฉุกเฉินแล้ว!', 'error');
          } else {
            showToast('ปิดเสียงไซเรนแล้ว', 'info');
          }
        }}
        isFlashlightActive={tools.isFlashlightActive}
        onToggleFlashlight={() => {
          tools.toggleFlashlight();
          showToast('เปลี่ยนสถานะไฟฉาย / หน้าจอฉุกเฉิน', 'info');
        }}
        isSpeaking={tools.isSpeaking}
        onToggleQuickVoice={() => {
          if (tools.isSpeaking) {
            tools.stopSpeech();
            showToast('หยุดเสียงนำทางฉุกเฉินแล้ว', 'info');
          } else {
            tools.speakText(
              `โกลบอล อีเมอร์เจนซี่ ฮับ สำหรับศูนย์ช่วยเหลือฉุกเฉิน โทร 191 หรือ 1669 เพื่อขอความช่วยเหลือทันที`
            );
            showToast('เปิดระบบเสียงนำทางฉุกเฉิน (Voice Guide)', 'success');
          }
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* 2. Main Content Container */}
      <main className="container mx-auto px-3.5 sm:px-4 py-4 max-w-4xl flex-1 space-y-5">
        {/* TAB 1: HOME */}
        {currentTab === 'home' && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            {/* Quick Country Switcher Bar */}
            <CountrySelectorHorizontal
              countries={countries}
              selectedCountry={selectedCountry}
              onSelectCountry={(c) => {
                setSelectedCountry(c);
                showToast(`สลับเป็นข้อมูลสายด่วน ${c.name} แล้ว`, 'success');
              }}
              onOpenAll={() => setIsCountryDrawerOpen(true)}
            />

            {/* 3-Second Hold SOS Button with SVG Progress Ring */}
            <SOSButton
              country={selectedCountry}
              coords={{
                lat: geo.latitude,
                lng: geo.longitude,
                accuracy: geo.accuracy,
              }}
              onRequestLocation={() => geo.requestLocation(true)}
              iceData={iceData}
              onOpenICECard={() => setIsICECardOpen(true)}
              onShowToast={showToast}
            />

            {/* Location Share & GPS Coordinates Component */}
            <LocationShare
              latitude={geo.latitude}
              longitude={geo.longitude}
              accuracy={geo.accuracy}
              loading={geo.loading}
              error={geo.error}
              onRequestLocation={() => geo.requestLocation(true)}
              onShowToast={showToast}
            />

            {/* Emergency Map with Leaflet */}
            <EmergencyMap
              latitude={geo.latitude}
              longitude={geo.longitude}
              onRequestLocation={() => geo.requestLocation(true)}
              loadingLocation={geo.loading}
            />

            {/* Top Quick Actions Grid */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <span>สายด่วนเร่งด่วนประจำวัน ({selectedCountry.name.split(' ')[0]})</span>
                </h3>
                <button
                  onClick={() => setCurrentTab('hotlines')}
                  className="text-xs text-red-600 dark:text-red-400 font-bold hover:underline cursor-pointer"
                >
                  ดูทั้งหมด
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <a
                  href={`tel:${selectedCountry.police}`}
                  onClick={() => handleCallHotline(selectedCountry.police)}
                  className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/50 flex flex-col items-center justify-center hover:bg-blue-100 transition-all cursor-pointer active:scale-95 text-center"
                >
                  <PhoneCall className="w-4 h-4 text-blue-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">ตำรวจ</span>
                  <span className="text-xs font-mono font-black text-blue-700 dark:text-blue-400">
                    {selectedCountry.police}
                  </span>
                </a>

                <a
                  href={`tel:${selectedCountry.amb}`}
                  onClick={() => handleCallHotline(selectedCountry.amb)}
                  className="p-3 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-100 dark:border-red-900/50 flex flex-col items-center justify-center hover:bg-red-100 transition-all cursor-pointer active:scale-95 text-center"
                >
                  <HeartPulse className="w-4 h-4 text-red-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">กู้ชีพฉุกเฉิน</span>
                  <span className="text-xs font-mono font-black text-red-700 dark:text-red-400">
                    {selectedCountry.amb}
                  </span>
                </a>

                <a
                  href={`tel:${selectedCountry.fire}`}
                  onClick={() => handleCallHotline(selectedCountry.fire)}
                  className="p-3 bg-orange-50 dark:bg-orange-950/40 rounded-2xl border border-orange-100 dark:border-orange-900/50 flex flex-col items-center justify-center hover:bg-orange-100 transition-all cursor-pointer active:scale-95 text-center"
                >
                  <PhoneCall className="w-4 h-4 text-orange-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">ดับเพลิง</span>
                  <span className="text-xs font-mono font-black text-orange-700 dark:text-orange-400">
                    {selectedCountry.fire}
                  </span>
                </a>

                <button
                  onClick={() => setCurrentTab('assistant')}
                  className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-100 dark:border-purple-900/50 flex flex-col items-center justify-center hover:bg-purple-100 transition-all cursor-pointer active:scale-95 text-center"
                >
                  <ShieldAlert className="w-4 h-4 text-purple-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">ตัวช่วยโทร</span>
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-400">
                    วิเคราะห์เบอร์
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOTLINES */}
        {currentTab === 'hotlines' && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            {/* Header & Search */}
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-5 rounded-3xl shadow-lg">
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
                  สารบบเบอร์ฉุกเฉินและสายด่วนครบวงจร
                </span>
                <h2 className="text-xl font-extrabold tracking-tight">
                  📞 รวมเบอร์สายด่วนประเทศไทย (Verified Directory)
                </h2>
                <p className="text-xs text-red-100 font-medium">
                  ครอบคลุมทั้งตำรวจ โรงพยาบาล กู้ภัย ธนาคาร/อายัดบัญชี ภัยออนไลน์ และสาธารณูปโภค
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={hotlineSearch}
                onChange={(e) => setHotlineSearch(e.target.value)}
                placeholder="ค้นหาชื่อหน่วยงาน, เบอร์โทร (เช่น 191, อายัดบัญชี, ไฟดับ, น้ำประปา)..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
              />
            </div>

            {/* Hotlines Category Accordions */}
            <div className="space-y-3">
              {(emergencyHotlines[selectedCountry.id] || emergencyHotlines['TH'] || []).map((category) => (
                <HotlineCategory
                  key={category.id}
                  category={category}
                  isCollapsed={!!collapsedCategories[category.id]}
                  onToggleCollapse={() => toggleCategoryCollapse(category.id)}
                  filterText={hotlineSearch}
                  onCallAction={handleCallHotline}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SMART ASSISTANT */}
        {currentTab === 'assistant' && (
          <div className="animate-in fade-in-50 duration-200">
            <EmergencyAssistant
              onSelectFirstAidTopic={handleSelectFirstAidTopic}
              onCallHotline={handleCallHotline}
            />
          </div>
        )}

        {/* TAB 4: NEARBY HELP */}
        {currentTab === 'nearby' && (
          <div className="animate-in fade-in-50 duration-200">
            <NearbyHelp
              latitude={geo.latitude}
              longitude={geo.longitude}
              onCallHotline={handleCallHotline}
            />
          </div>
        )}

        {/* TAB 5: FIRST AID */}
        {currentTab === 'firstaid' && (
          <div className="animate-in fade-in-50 duration-200">
            <FirstAidCard
              initialTopicId={selectedFirstAidTopicId}
              onCallHotline={handleCallHotline}
            />
          </div>
        )}

        {/* TAB 6: DISASTERS */}
        {currentTab === 'disasters' && (
          <div className="animate-in fade-in-50 duration-200">
            <DisasterGuide onCallHotline={handleCallHotline} />
          </div>
        )}

        {/* TAB 7: MEDICAL ICE */}
        {currentTab === 'medical' && (
          <div className="animate-in fade-in-50 duration-200">
            <MedicalID
              iceData={iceData}
              onSave={(data) => setIceData(data)}
              onOpenCard={() => setIsICECardOpen(true)}
              onShowToast={showToast}
            />
          </div>
        )}

        {/* TAB 8: TOOLS */}
        {currentTab === 'tools' && (
          <div className="animate-in fade-in-50 duration-200">
            <EmergencyToolsTab
              tools={tools}
              latitude={geo.latitude}
              longitude={geo.longitude}
              accuracy={geo.accuracy}
              onRequestLocation={() => geo.requestLocation(true)}
              loadingLocation={geo.loading}
              onShowToast={showToast}
            />
          </div>
        )}
      </main>

      {/* 3. Bottom Navigation Bar */}
      <BottomNavigation activeTab={currentTab} onTabChange={setCurrentTab} />

      {/* 3.1 Floating Emergency SOS Action Button (ปุ่มลอยฉุกเฉิน) */}
      <FloatingSOSButton
        country={selectedCountry}
        latitude={geo.latitude}
        longitude={geo.longitude}
        onToggleSiren={() => {
          tools.toggleSiren();
          if (!tools.isSirenActive) {
            showToast('🚨 เปิดเสียงไซเรนฉุกเฉินแล้ว!', 'error');
          } else {
            showToast('ปิดเสียงไซเรนแล้ว', 'info');
          }
        }}
        isSirenActive={tools.isSirenActive}
        onToggleFlashlight={() => {
          tools.toggleFlashlight();
          showToast('เปลี่ยนสถานะไฟฉาย / หน้าจอฉุกเฉิน', 'info');
        }}
        isFlashlightActive={tools.isFlashlightActive}
        onOpenICECard={() => setIsICECardOpen(true)}
        onShareLocation={() => {
          shareEmergencyLocation(geo.latitude, geo.longitude, geo.accuracy, selectedCountry);
          showToast('แชร์พิกัดฉุกเฉินและคัดลอกลิงก์สำเร็จ', 'success');
        }}
        onShowToast={showToast}
      />

      {/* 4. Fullscreen Screen Strobe Light Overlay if Active */}
      {tools.isScreenStrobeActive && (
        <div
          onClick={tools.toggleScreenStrobe}
          className="fixed inset-0 z-[400] bg-white siren-active-strobe flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none"
        >
          <div className="bg-black/80 text-white p-6 rounded-3xl backdrop-blur-md max-w-sm space-y-3">
            <Radio className="w-12 h-12 text-yellow-300 mx-auto animate-spin" />
            <h2 className="text-2xl font-black">🚨 หน้าจอกำลังกระพริบฉุกเฉิน</h2>
            <p className="text-xs text-slate-300">
              หน้าจอสว่างสูงสุดเพื่อเป็นสัญญาณขอความช่วยเหลือ แตะที่ใดก็ได้เพื่อปิด
            </p>
            <button
              onClick={tools.toggleScreenStrobe}
              className="py-2.5 px-6 bg-red-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
            >
              แตะที่นี่เพื่อปิดแฟลชจอ
            </button>
          </div>
        </div>
      )}

      {/* 5. Country Selection Drawer */}
      <CountryDrawer
        isOpen={isCountryDrawerOpen}
        onClose={() => setIsCountryDrawerOpen(false)}
        countries={countries}
        selectedCountry={selectedCountry}
        onSelectCountry={(c) => {
          setSelectedCountry(c);
          showToast(`เปลี่ยนเป็น ${c.name} แล้ว`, 'success');
        }}
      />

      {/* 6. Medical Card Modal Preview */}
      <MedicalCardModal
        isOpen={isICECardOpen}
        onClose={() => setIsICECardOpen(false)}
        iceData={iceData}
        onEdit={() => {
          setIsICECardOpen(false);
          setCurrentTab('medical');
        }}
      />

      {/* 7. Toast Alerts */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
