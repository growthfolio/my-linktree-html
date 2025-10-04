# 🔧 PROMPT TÉCNICO - SOLUÇÕES AVANÇADAS PARA BADGES CREDLY

## 🎯 CONTEXTO TÉCNICO ESPECÍFICO

Você é um expert em **CSS avançado, Cross-Origin iframes e Web APIs**. As badges do Credly são renderizadas via iframe cross-origin e o texto permanece **ilegível no modo escuro**.

## 🧪 SOLUÇÕES TÉCNICAS A IMPLEMENTAR

### 1. **CSS FILTER CHAIN COMPLEXO**
```css
/* Tentar cadeia de filtros que inverta apenas o texto */
[data-theme="dark"] .badge-container iframe {
    filter: 
        contrast(200%) 
        brightness(150%) 
        saturate(0.8)
        hue-rotate(180deg) 
        invert(0.1)
        drop-shadow(0 0 2px rgba(255,255,255,0.8));
}
```

### 2. **BACKDROP-FILTER + CSS MASKS**
```css
[data-theme="dark"] .badge-container {
    backdrop-filter: contrast(2) brightness(1.5) saturate(1.2);
}

[data-theme="dark"] .badge-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
        rgba(255,255,255,0.1), 
        rgba(255,255,255,0.3)
    );
    mask: radial-gradient(circle at center, black 60%, transparent 70%);
    pointer-events: none;
}
```

### 3. **CSS BLEND MODES MÚLTIPLOS**
```css
[data-theme="dark"] .badge-container {
    background: #000;
}

[data-theme="dark"] .badge-container iframe {
    mix-blend-mode: screen;
    background: rgba(255,255,255,0.95);
}

[data-theme="dark"] .badge-container::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, transparent 40%, rgba(255,255,255,0.3) 70%);
    mix-blend-mode: overlay;
    pointer-events: none;
}
```

### 4. **JAVASCRIPT POSTMESSAGE HACK**
```javascript
// Tentar comunicação com o iframe via postMessage
function tryPostMessageFix(iframe) {
    const message = {
        type: 'THEME_CHANGE',
        theme: document.documentElement.getAttribute('data-theme'),
        styles: {
            color: '#FFFFFF',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            background: 'rgba(0,0,0,0.7)'
        }
    };
    
    iframe.contentWindow.postMessage(message, '*');
}
```

### 5. **URL PARAMETER INJECTION**
```javascript
// Modificar URLs do Credly para forçar tema
function modifyCredlyUrls() {
    document.querySelectorAll('[data-share-badge-host]').forEach(container => {
        const originalHost = container.dataset.shareBadgeHost;
        // Tentar adicionar parâmetros de tema na URL
        container.dataset.shareBadgeHost = `${originalHost}?theme=dark&text_color=white`;
    });
}
```

### 6. **CSS CUSTOM PROPERTIES INJECTION**
```javascript
// Injetar CSS custom properties que podem ser lidas pelo iframe
function injectThemeProperties() {
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --credly-text-color: ${theme === 'dark' ? '#FFFFFF' : '#000000'};
            --credly-bg-color: ${theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'transparent'};
        }
        
        [data-theme="dark"] iframe[src*="credly.com"] {
            filter: 
                brightness(1.4) 
                contrast(1.3) 
                saturate(1.1)
                sepia(0.1)
                hue-rotate(5deg);
        }
    `;
    document.head.appendChild(style);
}
```

### 7. **SVG FILTER EFFECTS**
```css
/* Criar filtro SVG personalizado */
[data-theme="dark"] .badge-container iframe {
    filter: url(#text-enhancement-filter);
}
```

```html
<svg style="position: absolute; width: 0; height: 0;">
    <defs>
        <filter id="text-enhancement-filter">
            <feColorMatrix type="matrix" 
                values="0 0 0 0 1
                        0 0 0 0 1  
                        0 0 0 0 1
                        0 0 0 1 0"/>
            <feGaussianBlur stdDeviation="0.5" result="blur"/>
            <feOffset dx="1" dy="1" result="shadow"/>
            <feMerge>
                <feMergeNode in="shadow"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
</svg>
```

## 🎯 MISSÃO ESPECÍFICA

1. **TESTE CADA SOLUÇÃO** progressivamente
2. **COMBINE TÉCNICAS** se necessário  
3. **MEÇA RESULTADOS** - o texto deve ter contraste mínimo de 4.5:1
4. **OTIMIZE PERFORMANCE** - não quebrar o carregamento

## 📊 MÉTRICAS DE SUCESSO

- [ ] Contraste do texto ≥ 4.5:1 no modo escuro
- [ ] Legibilidade 100% em ambos os temas
- [ ] Tempo de carregamento < 2s
- [ ] Sem quebra de layout
- [ ] Funciona em Chrome, Firefox, Safari

## 🚀 IMPLEMENTAÇÃO IMEDIATA

**PRIORIDADE 1**: Filtros CSS avançados
**PRIORIDADE 2**: Mix-blend-mode + backdrop-filter  
**PRIORIDADE 3**: JavaScript postMessage
**PRIORIDADE 4**: SVG filters

---

**⚡ EXECUTE AGORA E RESOLVA DE UMA VEZ POR TODAS!**
