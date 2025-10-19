# Guia de Migração CSS → Tailwind

## 🎯 Objetivo
Substituir classes CSS customizadas por Tailwind mantendo funcionalidade idêntica.

## 📊 Classes Encontradas em Uso

| Classe | Componente | Usos | Ação |
|--------|-----------|------|------|
| `.card` | SocialLinks.tsx | 1x | ✅ Migrar |
| `.btn` | ShareButton.tsx | 1x | ✅ Migrar |
| `.ring-focus` | ShareButton.tsx, page.tsx | 2x | ✅ Migrar |
| `.animate-in.show` | Toast.tsx | 1x | ✅ Migrar |
| `.btn-brand` | - | 0x | ❌ Remover |
| `.btn-accent` | - | 0x | ❌ Remover |
| `.badges-grid` | - | 0x | ❌ Remover |
| `.badge-loading` | - | 0x | ❌ Remover |

## 🚀 Implementação

### ETAPA 1: Configurar Tailwind
Atualizar `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      borderRadius: {
        'card': '16px',
        'btn': '10px',
      },
      ringColor: {
        'focus': 'var(--ring)',
      },
      animation: {
        'slide-in': 'slideIn 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        slideIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(12px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
      },
    },
  },
  plugins: [],
}
```

### ETAPA 2: Migrar Componentes

#### 2.1 - SocialLinks.tsx
**ANTES:**
```tsx
<a
  className="card flex items-center gap-4 bg-[var(--surface)] hover:bg-[var(--surface-2)] transition p-4"
>
```

**DEPOIS:**
```tsx
<a
  className="rounded-card flex items-center gap-4 bg-[var(--surface)] hover:bg-[var(--surface-2)] transition p-4"
>
```

#### 2.2 - ShareButton.tsx
**ANTES:**
```tsx
<button
  className="btn ring-focus px-3 py-2 bg-[var(--surface-2)] hover:bg-[var(--surface)] transition flex items-center justify-center"
>
```

**DEPOIS:**
```tsx
<button
  className="rounded-btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2 px-3 py-2 bg-[var(--surface-2)] hover:bg-[var(--surface)] transition flex items-center justify-center"
>
```

#### 2.3 - page.tsx
**ANTES:**
```tsx
<a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-[var(--surface)] focus:text-[var(--text)] focus:px-3 focus:py-2 focus:rounded-md ring-focus">
```

**DEPOIS:**
```tsx
<a 
  href="#conteudo" 
  className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-[var(--surface)] focus:text-[var(--text)] focus:px-3 focus:py-2 focus:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2"
>
```

#### 2.4 - Toast.tsx
**ANTES:**
```tsx
<div
  className="mb-2 min-w-[300px] max-w-md animate-in show flex items-center gap-3 rounded-lg bg-[color:var(--surface)] px-4 py-3 shadow-lg border-l-4"
>
```

**DEPOIS:**
```tsx
<div
  className="mb-2 min-w-[300px] max-w-md animate-slide-in flex items-center gap-3 rounded-lg bg-[color:var(--surface)] px-4 py-3 shadow-lg border-l-4"
>
```

**Nota:** Remover lógica de classe `.show` se existir no JavaScript/TypeScript.

### ETAPA 3: Limpar globals.css

**Remover estas seções:**
```css
/* REMOVER */
.card {border-radius: var(--radius)}
.btn {border-radius: 10px}
.btn-brand{ background: var(--brand); color:#111; }
.btn-brand:hover{ filter: brightness(.95) }
.btn-accent{ background: var(--accent); color:#fff; }
.btn-accent:hover{ background: var(--accent-hover); }
.ring-focus:focus-visible {outline: 2px solid var(--ring); outline-offset: 2px}

.animate-in {opacity:0; transform: translateY(12px); transition: all .5s cubic-bezier(.22,1,.36,1)}
.animate-in.show {opacity:1; transform:none}

/* Badges Grid */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

.badges-grid > div {
  background: var(--surface);
  border-radius: 16px;
  padding: 1rem;  transition: all 0.3s ease;
  min-height: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badges-grid > div:hover {
  transform: translateY(-4px);
  border-color: var(--brand);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Responsive grid layout */
@media (max-width: 639px) {
  .badges-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .badges-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .badges-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Badge loading states */
.badge-loading {
  background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface) 50%, var(--surface-2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Utility classes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

**Manter estas seções (necessárias para Swiper):**
```css
/* MANTER */
.badges-carousel {
  padding: 20px 0 50px;
}

.badges-carousel .swiper-slide {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badges-carousel .swiper-pagination {
  bottom: 10px;
}

.badges-carousel .swiper-pagination-bullet {
  background: var(--muted);
  opacity: 0.5;
}

.badges-carousel .swiper-pagination-bullet-active {
  background: var(--brand);
  opacity: 1;
}

/* Credly Badge Embed Styles */
.credly-badge-container {
  width: 256px;
  height: 288px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border-radius: 12px;
  border: 1px solid rgba(255, 153, 0, 0.1);
}

.credly-badge-container iframe {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  max-width: 100%;
  max-height: 100%;
}

.credly-badge-container:hover iframe {
  transform: scale(1.02);
}

.badges-carousel .swiper-wrapper {
  align-items: center;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

## ✅ Checklist de Testes

Após a migração, testar:

- [ ] Links sociais têm bordas arredondadas (16px)
- [ ] Botão de compartilhar tem bordas arredondadas (10px)
- [ ] Focus ring aparece corretamente ao usar Tab
- [ ] Toast notifications aparecem com animação suave
- [ ] Badges carousel funciona normalmente
- [ ] Não há regressões visuais
- [ ] Build do Next.js funciona sem erros
- [ ] Bundle CSS reduziu de tamanho

## 📊 Resultado Esperado

### Métricas
- **CSS removido:** ~130 linhas
- **Classes customizadas:** 15+ → 0 (exceto Swiper)
- **Tamanho do bundle:** Redução estimada de 2-3kb

### Benefícios
1. ✅ Código mais consistente (100% Tailwind)
2. ✅ Melhor IntelliSense
3. ✅ Menos manutenção
4. ✅ Bundle menor
5. ✅ Sem CSS morto

## 🔄 Rollback

Se algo der errado, reverter pelo Git:
```bash
git checkout HEAD -- app/globals.css
git checkout HEAD -- app/components/
git checkout HEAD -- tailwind.config.js
```

---

**Tempo estimado:** 30-45 minutos  
**Dificuldade:** Baixa  
**Risco:** Baixo (mudanças reversíveis)
