import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md ${
          isSuccess
            ? 'bg-rose-900/95 text-white border-rose-700/50 shadow-rose-900/30'
            : 'bg-gray-900/95 text-white border-gray-700/50 shadow-black/30'
        }`}
      >
        {isSuccess ? (
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
        ) : (
          <Info className="w-5 h-5 text-rose-400 shrink-0" />
        )}
        <p className="text-xs font-medium leading-snug">{toastMessage.message}</p>
      </div>
    </div>
  );
};

