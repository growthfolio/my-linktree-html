# 🎨 Exemplo Prático: CredlyBadge Melhorado

Aqui está uma versão melhorada do componente `CredlyBadge` com várias opções de customização do "body" (container):

## 📦 Componente com Todas as Features

```tsx
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

export default function CredlyBadgeEnhanced({ 
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !containerRef.current) return

    const loadBadge = () => {
      try {
        containerRef.current!.innerHTML = ''

        const badgeDiv = document.createElement('div')
        badgeDiv.setAttribute('data-iframe-width', '280')
        badgeDiv.setAttribute('data-iframe-height', '320')
        badgeDiv.setAttribute('data-share-badge-id', badgeId)
        badgeDiv.setAttribute('data-share-badge-host', 'https://www.credly.com')

        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = '//cdn.credly.com/assets/utilities/embed.js'

        containerRef.current!.appendChild(badgeDiv)
        containerRef.current!.appendChild(script)

        script.onload = () => {
          setTimeout(() => {
            const iframe = containerRef.current?.querySelector('iframe')
            if (iframe) {
              setIsLoaded(true)
              iframe.onload = () => setIsLoaded(true)
            } else {
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

        script.onerror = () => setHasError(true)

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
        {title && <h3 className="text-center font-semibold text-[var(--text)] truncate">{title}</h3>}
        
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
        
        {date && <p className="text-xs text-center text-[var(--muted)]">{date}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header com título e data */}
      {(title || date) && (
        <div className="text-center space-y-1">
          {title && (
            <h3 className="font-semibold text-[var(--text)] truncate max-w-[288px]">
              {title}
            </h3>
          )}
          {date && (
            <p className="text-xs text-[var(--muted)]">{date}</p>
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
```

## 🎯 Como Usar

### Exemplo 1: Badge Simples
```tsx
<CredlyBadgeEnhanced badgeId="5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85" />
```

### Exemplo 2: Badge com Título e Data
```tsx
<CredlyBadgeEnhanced 
  badgeId="5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85"
  title="AWS Solutions Architect"
  date="Obtido em Jan 2024"
/>
```

### Exemplo 3: Badge Destaque com Nível
```tsx
<CredlyBadgeEnhanced 
  badgeId="5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85"
  featured={true}
  level="Professional"
  title="AWS Solutions Architect"
  date="Obtido em Jan 2024"
/>
```

### Exemplo 4: Badge com Click Handler
```tsx
<CredlyBadgeEnhanced 
  badgeId="5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85"
  title="AWS Solutions Architect"
  onClick={() => {
    console.log('Badge clicado!')
    // Abrir modal, navegar, etc.
  }}
/>
```

### Exemplo 5: Badge sem Hover Effect
```tsx
<CredlyBadgeEnhanced 
  badgeId="5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85"
  showHoverEffect={false}
/>
```

## 🎨 Customizações Visuais Disponíveis

| Feature | Descrição | Prop |
|---------|-----------|------|
| **Badge Destaque** | Selo "⭐ Destaque" no canto | `featured={true}` |
| **Título** | Título acima do card | `title="..."` |
| **Data** | Data abaixo do título | `date="..."` |
| **Nível** | Badge inferior com nível | `level="Professional"` |
| **Hover Effect** | Borda animada + escala | `showHoverEffect={true}` |
| **Click Handler** | Ação ao clicar | `onClick={() => {}}` |
| **Tooltip** | Dica no hover | Automático se `onClick` |

## 🚀 Próximos Passos

Se quiser implementar, posso:

1. ✅ Substituir o componente atual
2. ✅ Atualizar o BadgesSection.tsx com os novos parâmetros
3. ✅ Adicionar dados estruturados (títulos, datas, níveis)
4. ✅ Testar o build

**Quer que eu implemente isso no projeto?** 🎯
