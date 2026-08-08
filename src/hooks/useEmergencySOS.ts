import React, { useState, useRef, useCallback, useEffect, SyntheticEvent, MouseEvent } from 'react';

interface UseEmergencySOSOptions {
  holdDurationMs?: number;
  onTrigger: () => void;
}

export function useEmergencySOS({
  holdDurationMs = 3000,
  onTrigger
}: UseEmergencySOSOptions) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [countdown, setCountdown] = useState(3);
  const [isTriggered, setIsTriggered] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSecondRef = useRef<number>(3);

  // Play subtle warning audio tick
  const playBeep = useCallback((freq: number, duration = 0.08) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio might be blocked if user has not interacted
    }
  }, []);

  const triggerVibration = useCallback((pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }, []);

  const cancelHold = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    startTimeRef.current = null;
    setIsHolding(false);
    setProgress(0);
    setCountdown(3);
    lastSecondRef.current = 3;
  }, []);

  const tick = useCallback(() => {
    if (!startTimeRef.current) return;
    const elapsed = Date.now() - startTimeRef.current;
    const currentProgress = Math.min(100, (elapsed / holdDurationMs) * 100);
    const remainingSeconds = Math.max(1, Math.ceil((holdDurationMs - elapsed) / 1000));

    setProgress(currentProgress);
    setCountdown(remainingSeconds);

    if (remainingSeconds !== lastSecondRef.current) {
      lastSecondRef.current = remainingSeconds;
      triggerVibration(40);
      playBeep(remainingSeconds === 1 ? 880 : remainingSeconds === 2 ? 660 : 440);
    }

    if (elapsed >= holdDurationMs) {
      // Completed 3 seconds!
      setIsHolding(false);
      setProgress(100);
      setIsTriggered(true);
      triggerVibration([200, 100, 300, 100, 500]); // intense confirmation vibration
      playBeep(1200, 0.4);
      onTrigger();
    } else {
      animationFrameRef.current = requestAnimationFrame(tick);
    }
  }, [holdDurationMs, onTrigger, playBeep, triggerVibration]);

  const startHold = useCallback((e?: React.SyntheticEvent) => {
    if (e) {
      // prevent default context menu or drag
      if ('button' in e && (e as React.MouseEvent).button !== 0) return;
    }
    cancelHold();
    setIsHolding(true);
    setIsTriggered(false);
    startTimeRef.current = Date.now();
    lastSecondRef.current = 3;
    triggerVibration(50);
    playBeep(440);
    animationFrameRef.current = requestAnimationFrame(tick);
  }, [cancelHold, playBeep, tick, triggerVibration]);

  const resetTriggered = useCallback(() => {
    setIsTriggered(false);
    cancelHold();
  }, [cancelHold]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return {
    isHolding,
    progress,
    countdown,
    isTriggered,
    startHold,
    cancelHold,
    resetTriggered,
  };
}
