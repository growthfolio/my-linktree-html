'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Credly?: {
      embedBadge: () => void
    }
  }
}

export function useCredlyScript() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Se já está carregado, não faz nada
    if (window.Credly?.embedBadge) {
      setIsLoaded(true)
      return
    }

    // Se já está carregando, não carrega novamente
    if (isLoading) return

    setIsLoading(true)

    // Verifica se o script já existe
    const existingScript = document.querySelector('script[src*="credly.com"]')
    if (existingScript) {
      // Script existe, aguarda carregar
      const checkLoaded = () => {
        if (window.Credly?.embedBadge) {
          setIsLoaded(true)
          setIsLoading(false)
        } else {
          setTimeout(checkLoaded, 100)
        }
      }
      checkLoaded()
      return
    }

    // Carrega o script
    const script = document.createElement('script')
    script.src = 'https://cdn.credly.com/assets/utilities/embed.js'
    script.async = true
    
    script.onload = () => {
      setTimeout(() => {
        if (window.Credly?.embedBadge) {
          setIsLoaded(true)
        }
        setIsLoading(false)
      }, 200)
    }

    script.onerror = () => {
      setIsLoading(false)
    }

    document.head.appendChild(script)
  }, [])

  return { isLoaded, isLoading }
}