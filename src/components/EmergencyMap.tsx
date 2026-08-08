import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Crosshair, MapPin, Hospital, Shield, Flame, Pill } from 'lucide-react';
import { getGoogleMapsSearchUrl } from '../utils/location';

interface EmergencyMapProps {
  latitude: number | null;
  longitude: number | null;
  onRequestLocation: () => void;
  loadingLocation: boolean;
}

export const EmergencyMap: React.FC<EmergencyMapProps> = ({
  latitude,
  longitude,
  onRequestLocation,
  loadingLocation,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const userCircleRef = useRef<L.Circle | null>(null);

  const defaultLat = latitude || 13.7563;
  const defaultLng = longitude || 100.5018;

  // Initialize Map safely once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent re-initialization

    const map = L.map(mapContainerRef.current, {
      center: [defaultLat, defaultLng],
      zoom: 14,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center and marker when coords change
  useEffect(() => {
    if (!mapInstanceRef.current || !latitude || !longitude) return;

    const map = mapInstanceRef.current;
    map.setView([latitude, longitude], 15);

    // Custom pulse marker icon
    const customIcon = L.divIcon({
      className: 'custom-emergency-pin',
      html: `<div style="
        width: 24px;
        height: 24px;
        background-color: #dc2626;
        border: 3px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 15px rgba(220, 38, 38, 0.8);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([latitude, longitude]);
    } else {
      userMarkerRef.current = L.marker([latitude, longitude], { icon: customIcon })
        .addTo(map)
        .bindPopup(
          '<div style="font-family: Kanit, sans-serif; font-size: 12px; font-weight: bold;">🚨 คุณอยู่ที่นี่<br/><span style="font-size: 10px; font-weight: normal; color: #64748b;">พิกัดพร้อมขอความช่วยเหลือ</span></div>'
        )
        .openPopup();
    }

    if (userCircleRef.current) {
      userCircleRef.current.setLatLng([latitude, longitude]);
    } else {
      userCircleRef.current = L.circle([latitude, longitude], {
        radius: 120,
        color: '#ef4444',
        fillColor: '#fee2e2',
        fillOpacity: 0.25,
        weight: 1.5,
      }).addTo(map);
    }
  }, [latitude, longitude]);

  const handleCenterUser = () => {
    onRequestLocation();
    if (mapInstanceRef.current && latitude && longitude) {
      mapInstanceRef.current.setView([latitude, longitude], 16);
      if (userMarkerRef.current) userMarkerRef.current.openPopup();
    }
  };

  const handleSearchNearby = (type: string) => {
    const url = getGoogleMapsSearchUrl(type, latitude, longitude);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-4">
      
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-sm sm:text-base flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <MapPin className="text-red-500 w-5 h-5" />
            แผนที่ค้นหาพิกัดกู้ชีพ (Emergency Map)
          </h2>
          <p className="text-[11px] text-slate-400">
            ระบุตำแหน่ง GPS ปัจจุบันเพื่อคำนวณระยะทางถึงโรงพยาบาลและสถานีตำรวจ
          </p>
        </div>

        <span
          className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
            latitude && longitude
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200'
          }`}
        >
          {loadingLocation ? 'กำลังค้นหา GPS...' : latitude ? 'GPS: ออนไลน์' : 'GPS: สแตนด์บาย'}
        </span>
      </div>

      {/* Map Canvas Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-80 sm:h-96 z-10" />

        {/* Floating Center Button */}
        <button
          onClick={handleCenterUser}
          className="absolute bottom-4 right-4 z-[500] bg-white dark:bg-slate-800 p-3 rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="ตำแหน่งของฉัน"
          aria-label="จัดตำแหน่งกึ่งกลางแผนที่บนตำแหน่งของฉัน"
        >
          <Crosshair className={`w-5 h-5 ${loadingLocation ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Quick Location Shortcuts */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          ค้นหาสถานที่ช่วยเหลือด่วนรอบตัว:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => handleSearchNearby('hospital')}
            className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-2xl border border-blue-100 dark:border-blue-900/50 hover:bg-blue-100 text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <Hospital className="w-4 h-4 text-blue-600" />
            <span>โรงพยาบาล</span>
          </button>

          <button
            onClick={() => handleSearchNearby('police station')}
            className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <Shield className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>สถานีตำรวจ</span>
          </button>

          <button
            onClick={() => handleSearchNearby('fire station')}
            className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 rounded-2xl border border-orange-100 dark:border-orange-900/50 hover:bg-orange-100 text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>สถานีดับเพลิง</span>
          </button>

          <button
            onClick={() => handleSearchNearby('pharmacy')}
            className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 hover:bg-emerald-100 text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <Pill className="w-4 h-4 text-emerald-600" />
            <span>ร้านขายยา</span>
          </button>
        </div>
      </div>
    </div>
  );
};
