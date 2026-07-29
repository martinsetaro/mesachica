'use client';

import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[10001] flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`w-80 rounded-md border border-border bg-white p-4 shadow-md border-l-4 ${
              t.variant === 'destructive' ? 'border-l-destructive' : 'border-l-primary'
            }`}
          >
            <p className="text-sm font-semibold text-foreground">{t.title}</p>
            {t.description && (
              <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fallback silencioso si se usa fuera del provider
    return { toast: () => {} };
  }
  return ctx;
}
