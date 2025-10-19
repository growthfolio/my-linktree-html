'use client'

import { useEffect, useState, useRef } from 'react'

interface CredlyBadgeProps {
  badgeId: string
  // Novas props para customização
  featured?: boolean
  title?: string
  date?: string
  level?: 'Associate' | 'Professional' | 'Specialty'
  onClick?: () => void
  showHoverEffect?: boolean
}

export default function CredlyBadge({ 
  badgeId,
  featured = false,
  title,
  date,
  level,
  onClick,
  showHoverEffect = true
}: CredlyBadgeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [badgeData, setBadgeData] = useState<{
    name?: string
    issuedOn?: string
  }>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Busca os dados reais do badge da API do Credly
  useEffect(() => {
    if (!isMounted) return

    const fetchBadgeData = async () => {
      try {
        const response = await fetch(`https://www.credly.com/api/v1/obi/v2/badges/${badgeId}`)
        if (response.ok) {
          const data = await response.json()
          setBadgeData({
            name: data.badge?.name || data.name,
            issuedOn: data.issuedOn || data.issued_on
          })
        }
      } catch (error) {
        console.log('Não foi possível buscar metadados do badge, usando dados do iframe')
      }
    }

    fetchBadgeData()
  }, [badgeId, isMounted])

  useEffect(() => {
    if (!isMounted || !containerRef.current) return

    const loadBadge = () => {
      try {
        // Limpa conteúdo anterior
        containerRef.current!.innerHTML = ''

        // Cria o div do badge exatamente como no código oficial
        const badgeDiv = document.createElement('div')
        badgeDiv.setAttribute('data-iframe-width', '280')
        badgeDiv.setAttribute('data-iframe-height', '320')
        badgeDiv.setAttribute('data-share-badge-id', badgeId)
        badgeDiv.setAttribute('data-share-badge-host', 'https://www.credly.com')

        // Cria o script exatamente como no código oficial
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = '//cdn.credly.com/assets/utilities/embed.js'

        // Adiciona os elementos ao container
        containerRef.current!.appendChild(badgeDiv)
        containerRef.current!.appendChild(script)

        // Monitora o carregamento
        script.onload = () => {
          // Aguarda um tempo para o iframe ser criado
          setTimeout(() => {
            const iframe = containerRef.current?.querySelector('iframe')
            if (iframe) {
              setIsLoaded(true)
              // Adiciona listener para quando o iframe carregar completamente
              iframe.onload = () => {
                setIsLoaded(true)
              }
            } else {
              // Se não encontrou iframe, tenta novamente após mais tempo
              setTimeout(() => {
                const retryIframe = containerRef.current?.querySelector('iframe')
                if (retryIframe) {
                  setIsLoaded(true)
                } else {
                  setHasError(true)
                }
              }, 2000)
            }
          }, 1000)
        }

        script.onerror = () => {
          setHasError(true)
        }

        // Timeout de segurança
        setTimeout(() => {
          if (!isLoaded && !hasError) {
            const iframe = containerRef.current?.querySelector('iframe')
            if (iframe) {
              setIsLoaded(true)
            } else {
              setHasError(true)
            }
          }
        }, 5000)

      } catch (error) {
        console.error('Erro ao carregar badge Credly:', error)
        setHasError(true)
      }
    }

    // Pequeno delay para garantir que o DOM está pronto
    const timer = setTimeout(loadBadge, 100)
    return () => clearTimeout(timer)
  }, [badgeId, isMounted, isLoaded, hasError])

  if (!isMounted) {
    return null
  }

  // Estado de erro customizado
  if (hasError) {
    return (
      <div className="flex flex-col gap-2">
        {(title || badgeData.name) && (
          <h3 className="text-center font-semibold text-[var(--text)] truncate">
            {title || badgeData.name}
          </h3>
        )}
        
        <div className="w-72 h-80 rounded-xl border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 to-orange-500/10 flex flex-col items-center justify-center p-6 gap-3">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold mb-1 text-[var(--text)]">Erro ao Carregar Badge</h3>
            <p className="text-xs text-[var(--muted)] mb-3">Badge ID: {badgeId.slice(0, 8)}...</p>
          </div>
          <a 
            href={`https://www.credly.com/badges/${badgeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-orange-400 hover:text-orange-300 underline transition-colors"
          >
            Ver no Credly →
          </a>
        </div>
        
        {(date || badgeData.issuedOn) && (
          <p className="text-xs text-center text-[var(--muted)]">
            {date || (badgeData.issuedOn ? new Date(badgeData.issuedOn).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : '')}
          </p>
        )}
      </div>
    )
  }

  const displayTitle = title || badgeData.name
  const displayDate = date || (badgeData.issuedOn ? new Date(badgeData.issuedOn).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : undefined)

  return (
    <div className="flex flex-col gap-3">
      {/* Header com título e data */}
      {(displayTitle || displayDate) && (
        <div className="text-center space-y-1">
          {displayTitle && (
            <h3 className="font-semibold text-[var(--text)] truncate max-w-[288px]">
              {displayTitle}
            </h3>
          )}
          {displayDate && (
            <p className="text-xs text-[var(--muted)]">{displayDate}</p>
          )}
        </div>
      )}
      
      {/* Card Container */}
      <div 
        className="relative group"
        onMouseEnter={() => showHoverEffect && setIsHovered(true)}
        onMouseLeave={() => showHoverEffect && setIsHovered(false)}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {/* Badge de destaque (canto superior direito) */}
        {featured && (
          <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            ⭐ Destaque
          </div>
        )}
        
        {/* Borda brilhante animada (aparece no hover) */}
        {showHoverEffect && (
          <div 
            className={`absolute -inset-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-xl blur transition-all duration-300 ${
              isHovered ? 'opacity-60 animate-pulse' : 'opacity-0'
            }`}
          />
        )}
        
        {/* Card principal */}
        <div 
          className={`
            relative w-72 h-80 
            flex items-center justify-center 
            bg-[var(--surface)] rounded-xl
            border-2 transition-all duration-300
            ${isHovered && showHoverEffect
              ? 'border-[var(--brand)] shadow-2xl shadow-[var(--brand)]/20 scale-[1.02]' 
              : 'border-[var(--surface-2)] shadow-lg'
            }
          `}
        >
          {/* Background decorativo */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, var(--brand) 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />
          </div>
          
          {/* Loading skeleton */}
          {!isLoaded && (
            <div className="absolute inset-0 rounded-xl animate-pulse flex flex-col items-center justify-center gap-3 bg-[var(--surface-2)]">
              <div className="w-20 h-20 rounded-full bg-[var(--surface)]" />
              <div className="space-y-2">
                <div className="w-32 h-3 rounded bg-[var(--surface)]" />
                <div className="w-24 h-3 rounded bg-[var(--surface)]" />
              </div>
              <div className="text-xs text-[var(--muted)] mt-2">
                Carregando badge...
              </div>
            </div>
          )}
          
          {/* Container do iframe */}
          <div 
            ref={containerRef} 
            className={`relative z-10 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              width: '280px',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
          
          {/* Overlay de hover (opcional - para analytics) */}
          {onClick && isLoaded && (
            <div className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors rounded-xl z-20" />
          )}
        </div>
        
        {/* Badge de nível (canto inferior) */}
        {level && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-[var(--surface-2)] to-[var(--surface)] text-[var(--brand)] text-xs font-bold px-4 py-1 rounded-full border-2 border-[var(--brand)] shadow-lg">
            {level}
          </div>
        )}
        
        {/* Tooltip de hover */}
        {isHovered && showHoverEffect && onClick && (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap animate-slide-in pointer-events-none">
            Clique para mais detalhes
          </div>
        )}
      </div>
    </div>
  )
}