  'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const initialTheme = (stored as 'dark' | 'light') || (prefersLight ? 'light' : 'dark')
    
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (navigator.vibrate) navigator.vibrate(40)
  }

  return (
    <button 
      onClick={toggleTheme}
      className="btn ring-focus px-3 py-2 bg-[var(--surface-2)] hover:bg-[var(--surface)] transition flex items-center justify-center" 
      aria-label="Alternar entre tema claro e escuro" 
      title="Alternar tema"
    >
      <i className={`ph-bold ${theme === 'dark' ? 'ph-moon-stars' : 'ph-sun'} text-lg`}></i>
    </button>
  )
}