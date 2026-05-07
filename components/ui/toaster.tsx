'use client'
import { useState, createContext, useContext, useCallback } from 'react'

type Toast = { id: string; title: string; description?: string; variant?: 'default' | 'destructive' }
type ToastContextType = { toast: (t: Omit<Toast, 'id'>) => void }

const ToastContext = createContext<ToastContextType>({ toast: () => {} })
export const useToast = () => useContext(ToastContext)

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...t, id }])
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(t => (
          <div key={t.id} className={`rounded-xl p-4 shadow-lg border bg-white max-w-sm ${
            t.variant === 'destructive' ? 'border-destructive text-destructive' : 'border-border'
          }`}>
            <p className="font-medium text-sm">{t.title}</p>
            {t.description && <p className="text-xs text-muted-foreground mt-1">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
