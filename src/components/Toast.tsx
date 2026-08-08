import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] flex flex-col items-center gap-2 max-w-[90vw] pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => onDismiss(t.id)}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 dark:bg-slate-100/95 text-white dark:text-slate-900 shadow-2xl backdrop-blur-md text-xs font-semibold border border-slate-700/50 dark:border-slate-300/50 cursor-pointer"
          >
            {t.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 dark:text-red-600 shrink-0" />
            ) : t.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-400 dark:text-blue-600 shrink-0" />
            )}
            <span>{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
