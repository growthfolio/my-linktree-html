'use client'

import { useEffect } from 'react'
import { useToast, type Toast as ToastType } from '@/app/hooks/useToast'

interface ToastProps {
  toast: ToastType
}

function Toast({ toast }: ToastProps) {
  const { removeToast } = useToast()

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  }

  const colors = {
    success: 'var(--success)',
    error: 'var(--error)',
    info: 'var(--info)'
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className="mb-2 min-w-[300px] max-w-md animate-slide-in flex items-center gap-3 rounded-lg bg-[color:var(--surface)] px-4 py-3 shadow-lg border-l-4"
      style={{ borderLeftColor: colors[toast.type] }}
    >
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full font-bold text-white text-sm"
        style={{ backgroundColor: colors[toast.type] }}
      >
        {icons[toast.type]}
      </div>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors"
        aria-label="Fechar notificação"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
