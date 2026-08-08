import { useState, useEffect, useCallback } from 'react';
import { GeolocationPositionState } from '../types';

export function useGeolocation() {
  const [state, setState] = useState<GeolocationPositionState>({
    latitude: 13.7563, // Default center: Bangkok
    longitude: 100.5018,
    accuracy: null,
    heading: null,
    speed: null,
    timestamp: null,
    loading: false,
    error: null,
  });

  const requestLocation = useCallback((highAccuracy: boolean = true) => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'อุปกรณ์หรือเบราว์เซอร์นี้ไม่รองรับการดึงพิกัด GPS'
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp,
          loading: false,
          error: null,
        });
      },
      (error) => {
        let errorMsg = 'ไม่สามารถระบุตำแหน่ง GPS ได้';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = 'ผู้ใช้ไม่อนุญาตให้เข้าถึงตำแหน่ง GPS (โปรดเปิดสิทธิ์ Location ในเบราว์เซอร์)';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = 'สัญญาณดาวเทียมหรือเครือข่ายตำแหน่งไม่พร้อมใช้งานในขณะนี้';
            break;
          case error.TIMEOUT:
            errorMsg = 'หมดเวลาในการค้นหาตำแหน่ง GPS โปรดลองอีกครั้งในที่โล่ง';
            break;
        }
        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMsg
        }));
      },
      {
        enableHighAccuracy: highAccuracy,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  }, []);

  // Request on mount gently
  useEffect(() => {
    requestLocation(false);
  }, [requestLocation]);

  const mapsUrl = state.latitude && state.longitude
    ? `https://maps.google.com/?q=${state.latitude.toFixed(6)},${state.longitude.toFixed(6)}`
    : '';

  const sosMessage = state.latitude && state.longitude
    ? `🚨 ขอความช่วยเหลือด่วน!\nฉันอยู่ที่พิกัด:\n${mapsUrl}\n(ความแม่นยำประมาณ ${state.accuracy ? Math.round(state.accuracy) : 10} เมตร)`
    : '🚨 ขอความช่วยเหลือด่วน! โปรดติดต่อฉันกลับทันที';

  return {
    ...state,
    requestLocation,
    mapsUrl,
    sosMessage,
    hasLocation: state.latitude !== null && state.longitude !== null,
  };
}
