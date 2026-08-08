import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bandage,
  ChevronDown,
  AlertTriangle,
  Heart,
  Volume2,
  VolumeX,
  PhoneCall,
  ShieldCheck,
  Info
} from 'lucide-react';
import { FirstAidTopic } from '../types';
import { firstAidTopics, firstAidDisclaimer } from '../data/firstAid';

interface FirstAidCardProps {
  initialTopicId?: string;
  onCallHotline?: (tel: string) => void;
}

export const FirstAidCard: React.FC<FirstAidCardProps> = ({
  initialTopicId,
  onCallHotline,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || firstAidTopics[0].id
  );
  const [isMetronomePlaying, setIsMetronomePlaying] = useState(false);
  const [metronomeBeat, setMetronomeBeat] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const metronomeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
    }
  }, [initialTopicId]);

  const selectedTopic =
    firstAidTopics.find((t) => t.id === selectedTopicId) || firstAidTopics[0];

  // 110 BPM CPR Metronome Sound
  const playCprTick = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}

    // Visual heart flash
    setMetronomeBeat(true);
    setTimeout(() => setMetronomeBeat(false), 120);
  }, []);

  const toggleCprMetronome = () => {
    if (isMetronomePlaying) {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
      setIsMetronomePlaying(false);
    } else {
      playCprTick();
      // 110 BPM = 60,000 / 110 ≈ 545 ms per beat
      metronomeIntervalRef.current = window.setInterval(playCprTick, 545);
      setIsMetronomePlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Medical Disclaimer Alert */}
      <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>ข้อควรระวังทางการแพทย์: </strong>
          {firstAidDisclaimer}
        </div>
      </div>

      {/* Topic Horizontal Selector */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          เลือกหัวข้อปฐมพยาบาล:
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {firstAidTopics.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`whitespace-nowrap px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-red-600 border-red-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{topic.title.split(' / ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Guide Detail */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-5">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span
              className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                selectedTopic.urgency === 'critical'
                  ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                  : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
              }`}
            >
              {selectedTopic.urgency === 'critical' ? '🚨 วิกฤติเร่งด่วน' : '🩹 ปฐมพยาบาล'}
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 mt-1">
              {selectedTopic.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {selectedTopic.subtitle}
            </p>
          </div>

          <a
            href={`tel:${selectedTopic.callNumber}`}
            onClick={() => onCallHotline?.(selectedTopic.callNumber)}
            className="py-2 px-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>โทร {selectedTopic.callNumber}</span>
          </a>
        </div>

        {/* CPR Metronome Interactive Tool if topic is CPR */}
        {selectedTopic.cprCadence && (
          <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div
                className={`p-3 rounded-full transition-transform duration-100 ${
                  metronomeBeat
                    ? 'bg-red-600 text-white scale-125 shadow-lg'
                    : 'bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-300 scale-100'
                }`}
              >
                <Heart className={`w-6 h-6 ${metronomeBeat ? 'fill-white' : ''}`} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-red-900 dark:text-red-200">
                  เครื่องเคาะจังหวะ CPR (110 BPM Cadence)
                </h4>
                <p className="text-[11px] text-red-700 dark:text-red-300">
                  กดตามจังหวะเสียงเคาะ 100-120 ครั้ง/นาที เพลง Stayin' Alive
                </p>
              </div>
            </div>

            <button
              onClick={toggleCprMetronome}
              className={`py-2.5 px-4 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer ${
                isMetronomePlaying
                  ? 'bg-red-700 text-white animate-pulse'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isMetronomePlaying ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>หยุดเคาะจังหวะ</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>เริ่มเคาะจังหวะ CPR</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step-by-Step Procedure */}
        <div className="space-y-3.5">
          <h4 className="font-bold text-xs text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            ขั้นตอนการปฏิบัติแบบ Step-by-Step:
          </h4>
          <div className="space-y-3">
            {selectedTopic.steps.map((step) => (
              <div
                key={step.step}
                className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  {step.step}
                </span>
                <div className="space-y-1">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    {step.title}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                  {step.warning && (
                    <div className="text-[11px] text-red-600 dark:text-red-400 font-bold bg-red-50 dark:bg-red-950/60 p-2 rounded-lg mt-1">
                      ⚠️ {step.warning}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What NOT to do (สิ่งที่ไม่ควรทำ) */}
        {selectedTopic.donts && selectedTopic.donts.length > 0 && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900/40 space-y-2">
            <h4 className="font-bold text-xs text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              ข้อห้ามเด็ดขาด (สิ่งที่ห้ามทำ):
            </h4>
            <div className="space-y-1 pl-1">
              {selectedTopic.donts.map((dont, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span>{dont}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
