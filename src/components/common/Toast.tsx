import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../../context/useApp';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[#141418] border border-neutral-800 shadow-2xl text-white text-sm backdrop-blur-md"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-red-500" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-neutral-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs tracking-tight text-neutral-100">{toast.title}</p>
              {toast.description && (
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-500 hover:text-neutral-300 p-1 rounded-md transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
