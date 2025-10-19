# 🎨 Guia: Manipulação do Body dos Cards CredlyBadge

## 📋 Índice
1. [Estrutura Atual](#estrutura-atual)
2. [Opções de Manipulação](#opções-de-manipulação)
3. [Exemplos Práticos](#exemplos-práticos)
4. [CSS Customizado](#css-customizado)
5. [Manipulação Avançada](#manipulação-avançada)

---

## 🏗️ Estrutura Atual

O componente `CredlyBadge` atualmente renderiza um **iframe** do Credly dentro de um container. O iframe é gerado pelo script oficial do Credly e tem **limitações de estilização** por ser cross-origin.

### Estados do Card:

1. **Loading** - Skeleton animado
2. **Error** - Card customizado com mensagem
3. **Loaded** - Iframe do Credly

---

## 🎯 Opções de Manipulação

### ✅ **O QUE VOCÊ PODE FAZER:**

#### 1. **Manipular o Container Externo**
Você tem controle total sobre o wrapper do iframe:

```tsx
// Container principal
<div className="w-72 h-80 flex items-center justify-center relative">
  {/* Adicionar elementos decorativos */}
  <div className="absolute top-0 right-0 bg-brand rounded-full w-8 h-8">
    ⭐
  </div>
  
  {/* Container do iframe */}
  <div ref={containerRef} />
</div>
```

#### 2. **Customizar Estado de Loading**
Total controle sobre o skeleton:

```tsx
{!isLoaded && (
  <div className="absolute inset-0 rounded-xl">
    {/* Seu design customizado aqui */}
  </div>
)}
```

#### 3. **Customizar Estado de Erro**
Total controle sobre o fallback:

```tsx
if (hasError) {
  return (
    <div className="custom-error-card">
      {/* Seu design de erro aqui */}
    </div>
  )
}
```

#### 4. **Adicionar Overlay/Decoração**
Elementos por cima ou por baixo do iframe:

```tsx
<div className="relative">
  {/* Background decorativo */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10" />
  
  {/* Iframe */}
  <div ref={containerRef} />
  
  {/* Overlay (ex: badge de destaque) */}
  <div className="absolute top-2 right-2">🏆</div>
</div>
```

### ⚠️ **O QUE VOCÊ NÃO PODE FAZER:**

#### 1. **Manipular Conteúdo Interno do Iframe**
Por segurança (CORS), você **não pode** modificar o HTML/CSS interno do iframe do Credly:

```tsx
// ❌ NÃO FUNCIONA - Cross-origin restriction
const iframe = containerRef.current?.querySelector('iframe')
iframe.contentDocument.body.style.background = 'red'
```

#### 2. **Remover Elementos do Badge Credly**
O conteúdo do badge é controlado pelo Credly.

---

## 💡 Exemplos Práticos

### 1. **Card com Borda Animada**

```tsx
export default function CredlyBadge({ badgeId }: CredlyBadgeProps) {
  // ... código existente ...

  return (
    <div className="relative group">
      {/* Borda animada */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
      
      {/* Card */}
      <div className="relative w-72 h-80 flex items-center justify-center bg-[var(--surface)] rounded-xl">
        {!isLoaded && <LoadingSkeleton />}
        <div ref={containerRef} />
      </div>
    </div>
  )
}
```

### 2. **Card com Badge de Destaque**

```tsx
interface CredlyBadgeProps {
  badgeId: string
  featured?: boolean // Nova prop
  certificationLevel?: 'Associate' | 'Professional' | 'Specialty'
}

export default function CredlyBadge({ badgeId, featured, certificationLevel }: CredlyBadgeProps) {
  // ... código existente ...

  return (
    <div className="relative">
      {/* Badge de destaque */}
      {featured && (
        <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          ⭐ Destaque
        </div>
      )}
      
      {/* Badge de nível */}
      {certificationLevel && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 bg-[var(--surface-2)] text-[var(--brand)] text-xs font-semibold px-4 py-1 rounded-full border-2 border-[var(--brand)]">
          {certificationLevel}
        </div>
      )}
      
      {/* Card principal */}
      <div className="w-72 h-80 flex items-center justify-center relative">
        {!isLoaded && <LoadingSkeleton />}
        <div ref={containerRef} />
      </div>
    </div>
  )
}
```

### 3. **Card com Informações Extras**

```tsx
interface CredlyBadgeProps {
  badgeId: string
  title?: string
  date?: string
  description?: string
}

export default function CredlyBadge({ badgeId, title, date, description }: CredlyBadgeProps) {
  // ... código existente ...

  return (
    <div className="flex flex-col gap-3">
      {/* Informações extras acima */}
      {title && (
        <div className="text-center">
          <h3 className="text-lg font-bold text-[var(--text)]">{title}</h3>
          {date && <p className="text-sm text-[var(--muted)]">{date}</p>}
        </div>
      )}
      
      {/* Card do badge */}
      <div className="w-72 h-80 flex items-center justify-center relative rounded-xl overflow-hidden">
        {!isLoaded && <LoadingSkeleton />}
        <div ref={containerRef} />
      </div>
      
      {/* Descrição abaixo */}
      {description && (
        <p className="text-sm text-[var(--muted)] text-center max-w-[288px]">
          {description}
        </p>
      )}
    </div>
  )
}
```

### 4. **Card com Hover Effect e Tooltip**

```tsx
export default function CredlyBadge({ badgeId }: CredlyBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  
  // ... código existente ...

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Card com hover effect */}
      <div className="w-72 h-80 flex items-center justify-center relative rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
        {!isLoaded && <LoadingSkeleton />}
        <div ref={containerRef} />
      </div>
      
      {/* Tooltip na hover */}
      {showTooltip && isLoaded && (
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-4 py-2 rounded-lg whitespace-nowrap animate-slide-in">
          Clique para ver detalhes →
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
        </div>
      )}
    </div>
  )
}
```

### 5. **Card com Background Decorativo**

```tsx
export default function CredlyBadge({ badgeId }: CredlyBadgeProps) {
  // ... código existente ...

  return (
    <div className="relative w-72 h-80">
      {/* Background pattern decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, var(--brand) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] via-[var(--surface-2)] to-[var(--surface)] rounded-xl"></div>
      
      {/* Card */}
      <div className="relative w-full h-full flex items-center justify-center">
        {!isLoaded && <LoadingSkeleton />}
        <div ref={containerRef} />
      </div>
    </div>
  )
}
```

---

## 🎨 CSS Customizado para o Container

### Opção 1: Adicionar Classes Tailwind

```tsx
<div className="
  w-72 h-80 
  flex items-center justify-center 
  relative rounded-xl
  bg-gradient-to-br from-gray-800 to-gray-900
  border-2 border-orange-500/20
  shadow-xl shadow-orange-500/10
  hover:border-orange-500/50
  hover:shadow-2xl hover:shadow-orange-500/20
  transition-all duration-300
  transform hover:scale-[1.02]
">
  <div ref={containerRef} />
</div>
```

### Opção 2: Estilos Inline Dinâmicos

```tsx
const [isHovered, setIsHovered] = useState(false)

<div 
  style={{
    width: '288px',
    height: '320px',
    background: isHovered 
      ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
      : '#111827',
    border: `2px solid ${isHovered ? '#ff9900' : 'rgba(255, 153, 0, 0.2)'}`,
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <div ref={containerRef} />
</div>
```

---

## 🚀 Manipulação Avançada

### 1. **Interceptar Cliques no Iframe**

Como o iframe é cross-origin, você pode adicionar um overlay transparente para capturar cliques:

```tsx
const [showModal, setShowModal] = useState(false)

<div className="relative">
  {/* Overlay invisível para capturar cliques */}
  <div 
    className="absolute inset-0 z-10 cursor-pointer"
    onClick={() => setShowModal(true)}
    title="Clique para mais detalhes"
  />
  
  {/* Iframe */}
  <div ref={containerRef} />
  
  {/* Modal com detalhes */}
  {showModal && (
    <Modal badgeId={badgeId} onClose={() => setShowModal(false)} />
  )}
</div>
```

### 2. **Lazy Loading com Intersection Observer**

```tsx
const [shouldLoad, setShouldLoad] = useState(false)
const observerRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setShouldLoad(true)
      }
    },
    { threshold: 0.1 }
  )

  if (observerRef.current) {
    observer.observe(observerRef.current)
  }

  return () => observer.disconnect()
}, [])

return (
  <div ref={observerRef}>
    {shouldLoad ? (
      <div ref={containerRef} />
    ) : (
      <div className="w-72 h-80 flex items-center justify-center">
        <LoadingPlaceholder />
      </div>
    )}
  </div>
)
```

### 3. **Adicionar Métricas e Analytics**

```tsx
useEffect(() => {
  if (isLoaded) {
    // Track quando o badge carrega
    console.log(`Badge ${badgeId} carregado`)
    // Ou usar analytics: analytics.track('badge_loaded', { badgeId })
  }
}, [isLoaded, badgeId])

<div 
  onClick={() => {
    console.log(`Badge ${badgeId} clicado`)
    // analytics.track('badge_clicked', { badgeId })
  }}
>
  <div ref={containerRef} />
</div>
```

---

## 📊 Componente Completo Exemplo

```tsx
'use client'

import { useEffect, useState, useRef } from 'react'

interface CredlyBadgeProps {
  badgeId: string
  featured?: boolean
  title?: string
  level?: string
}

export default function CredlyBadge({ 
  badgeId, 
  featured = false,
  title,
  level 
}: CredlyBadgeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // ... lógica de carregamento existente ...

  return (
    <div className="flex flex-col gap-3">
      {/* Título */}
      {title && (
        <h3 className="text-center font-semibold text-[var(--text)]">
          {title}
        </h3>
      )}
      
      {/* Card Container */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge de destaque */}
        {featured && (
          <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            ⭐ Destaque
          </div>
        )}
        
        {/* Borda animada */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl blur transition duration-300 ${isHovered ? 'opacity-75' : 'opacity-0'}`}></div>
        
        {/* Card principal */}
        <div className={`
          relative w-72 h-80 
          flex items-center justify-center 
          bg-[var(--surface)] rounded-xl
          border-2 border-[var(--surface-2)]
          transition-all duration-300
          ${isHovered ? 'scale-105 border-[var(--brand)]/50' : ''}
        `}>
          {!isLoaded && <LoadingSkeleton />}
          {hasError && <ErrorState badgeId={badgeId} />}
          <div 
            ref={containerRef}
            className={isLoaded ? 'opacity-100' : 'opacity-0'}
          />
        </div>
        
        {/* Badge de nível */}
        {level && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 bg-[var(--surface-2)] text-[var(--brand)] text-xs font-semibold px-4 py-1 rounded-full border-2 border-[var(--brand)]">
            {level}
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## ✅ Resumo

### **Você TEM controle sobre:**
- ✅ Container externo (tamanho, posição, efeitos)
- ✅ Estados de loading e erro
- ✅ Overlays e decorações
- ✅ Animações e transições
- ✅ Informações extras (títulos, badges, descrições)
- ✅ Eventos (hover, click no container)

### **Você NÃO TEM controle sobre:**
- ❌ Conteúdo interno do iframe Credly
- ❌ Estilos internos do badge
- ❌ Estrutura HTML do badge

---

**Precisa de um exemplo específico?** Me diga o que você quer fazer e eu crio o código! 🚀
