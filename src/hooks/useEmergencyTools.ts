import { useState, useRef, useCallback, useEffect } from 'react';

export function useEmergencyTools() {
  // 1. Siren Synthesizer State
  const [isSirenActive, setIsSirenActive] = useState(false);
  const sirenAudioCtxRef = useRef<AudioContext | null>(null);
  const sirenOscRef = useRef<OscillatorNode | null>(null);
  const sirenGainRef = useRef<GainNode | null>(null);
  const sirenIntervalRef = useRef<number | null>(null);

  // 2. Flashlight & Screen Strobe State
  const [isFlashlightActive, setIsFlashlightActive] = useState(false);
  const [isScreenStrobeActive, setIsScreenStrobeActive] = useState(false);
  const [torchSupported, setTorchSupported] = useState<boolean | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // 3. SOS Vibration State
  const [isVibratingSOS, setIsVibratingSOS] = useState(false);
  const vibrateTimerRef = useRef<number | null>(null);

  // 4. Voice Speech Synthesis State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);

  // Check speech API support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // --- SIREN SYNTHESIZER ---
  const startSiren = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      sirenAudioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      let isHigh = false;
      const modulate = () => {
        if (!sirenAudioCtxRef.current || sirenAudioCtxRef.current.state === 'closed') return;
        const now = sirenAudioCtxRef.current.currentTime;
        if (isHigh) {
          osc.frequency.exponentialRampToValueAtTime(600, now + 0.4);
        } else {
          osc.frequency.exponentialRampToValueAtTime(1300, now + 0.4);
        }
        isHigh = !isHigh;
      };

      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.start();
      sirenOscRef.current = osc;
      sirenGainRef.current = gain;

      sirenIntervalRef.current = window.setInterval(modulate, 450);
      setIsSirenActive(true);
    } catch (e) {
      console.warn('Could not start siren audio:', e);
    }
  }, []);

  const stopSiren = useCallback(() => {
    if (sirenIntervalRef.current) {
      clearInterval(sirenIntervalRef.current);
      sirenIntervalRef.current = null;
    }
    if (sirenOscRef.current) {
      try {
        sirenOscRef.current.stop();
        sirenOscRef.current.disconnect();
      } catch (e) {}
      sirenOscRef.current = null;
    }
    if (sirenAudioCtxRef.current && sirenAudioCtxRef.current.state !== 'closed') {
      try {
        sirenAudioCtxRef.current.close();
      } catch (e) {}
      sirenAudioCtxRef.current = null;
    }
    setIsSirenActive(false);
  }, []);

  const toggleSiren = useCallback(() => {
    if (isSirenActive) {
      stopSiren();
    } else {
      startSiren();
    }
  }, [isSirenActive, startSiren, stopSiren]);

  // --- CAMERA TORCH / SCREEN FLASHLIGHT ---
  const toggleFlashlight = useCallback(async () => {
    if (isFlashlightActive) {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      setIsFlashlightActive(false);
      setIsScreenStrobeActive(false);
      return;
    }

    // Try hardware camera torch first
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            // @ts-expect-error torch constraint in modern browsers
            advanced: [{ torch: true }]
          }
        });
        const track = stream.getVideoTracks()[0] as any;
        const capabilities = track?.getCapabilities?.();
        if (capabilities && 'torch' in capabilities) {
          await track.applyConstraints({ advanced: [{ torch: true }] });
          mediaStreamRef.current = stream;
          setIsFlashlightActive(true);
          setTorchSupported(true);
          return;
        } else {
          // Fallback to screen flash
          mediaStreamRef.current = stream;
          setIsFlashlightActive(true);
          setIsScreenStrobeActive(true);
          setTorchSupported(false);
          return;
        }
      }
    } catch (e) {
      // Permission denied or not supported -> Screen Flash fallback
      setTorchSupported(false);
      setIsFlashlightActive(true);
      setIsScreenStrobeActive(true);
    }
  }, [isFlashlightActive]);

  const toggleScreenStrobe = useCallback(() => {
    setIsScreenStrobeActive(prev => !prev);
  }, []);

  // --- MORSE CODE SOS VIBRATION ---
  // ... --- ... (3 short, 3 long, 3 short)
  const triggerSOSMorseVibrate = useCallback(() => {
    if (!('vibrate' in navigator)) return false;

    if (isVibratingSOS) {
      navigator.vibrate(0);
      if (vibrateTimerRef.current) clearInterval(vibrateTimerRef.current);
      setIsVibratingSOS(false);
      return false;
    }

    // [dot, pause, dot, pause, dot, long-pause, dash, pause, dash, pause, dash, long-pause, dot, pause, dot, pause, dot]
    const morsePattern = [
      150, 100, 150, 100, 150, 300,
      400, 100, 400, 100, 400, 300,
      150, 100, 150, 100, 150, 800
    ];

    navigator.vibrate(morsePattern);
    setIsVibratingSOS(true);

    // Repeat pattern every 4 seconds
    vibrateTimerRef.current = window.setInterval(() => {
      navigator.vibrate(morsePattern);
    }, 3800);

    return true;
  }, [isVibratingSOS]);

  const stopSOSMorseVibrate = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(0);
    }
    if (vibrateTimerRef.current) {
      clearInterval(vibrateTimerRef.current);
      vibrateTimerRef.current = null;
    }
    setIsVibratingSOS(false);
  }, []);

  // --- WEB SPEECH SYNTHESIS ---
  const speakText = useCallback((text: string, lang = 'th-TH') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // clear queue
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95; // calm, clear rate
    utterance.pitch = 1.0;

    // Try to pick a Thai or high-quality voice if available
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(v => v.lang.includes('th') || v.name.includes('Thai'));
    if (thaiVoice) {
      utterance.voice = thaiVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSiren();
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      stopSOSMorseVibrate();
      stopSpeech();
    };
  }, [stopSiren, stopSOSMorseVibrate, stopSpeech]);

  return {
    isSirenActive,
    toggleSiren,
    startSiren,
    stopSiren,
    isFlashlightActive,
    isScreenStrobeActive,
    torchSupported,
    toggleFlashlight,
    toggleScreenStrobe,
    isVibratingSOS,
    triggerSOSMorseVibrate,
    stopSOSMorseVibrate,
    speakText,
    stopSpeech,
    isSpeaking,
    speechSupported
  };
}
