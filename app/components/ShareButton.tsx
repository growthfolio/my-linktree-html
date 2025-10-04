'use client'

export default function ShareButton() {
  const handleShare = async () => {
    try {
      const url = window.location.href
      
      if (navigator.share) {
        await navigator.share({ 
          title: document.title, 
          url 
        })
        return
      }
      
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
      } else {
        const ta = document.createElement('textarea')
        ta.value = url
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
      }
      
      // Simple toast notification
      const toast = document.createElement('div')
      toast.className = 'fixed bottom-4 right-4 px-4 py-2 rounded-lg bg-green-500 text-white z-50'
      toast.textContent = 'Link copiado! 📋'
      document.body.appendChild(toast)
      
      setTimeout(() => {
        toast.style.opacity = '0'
        setTimeout(() => toast.remove(), 300)
      }, 2000)
      
    } catch (e) {
      console.error('Share failed:', e)
    }
  }

  return (
    <button 
      onClick={handleShare}
      className="btn ring-focus px-3 py-2 bg-[var(--surface-2)] hover:bg-[var(--surface)] transition flex items-center justify-center" 
      aria-label="Copiar link da página" 
      title="Compartilhar link"
    >
      <i className="ph-bold ph-share text-lg"></i>
    </button>
  )
}