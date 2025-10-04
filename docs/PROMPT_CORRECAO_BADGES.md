# 🚨 PROMPT PARA CORREÇÃO URGENTE - BADGES CREDLY

## 🎯 PROBLEMA PRINCIPAL
As badges do Credly estão com **texto invisível/ilegível no modo escuro**. O texto permanece escuro mesmo com todas as tentativas de CSS e JavaScript implementadas.

## 📋 SITUAÇÃO ATUAL

### ❌ O que NÃO está funcionando:
1. **CSS com `!important`** - O Credly sobrescreve tudo
2. **JavaScript injetando estilos no iframe** - Cross-origin bloqueia acesso
3. **Filtros CSS (contrast, brightness, invert)** - Não afeta o texto especificamente
4. **Mix-blend-mode** - Afeta a imagem toda, não só o texto

### 🔍 Análise Técnica:
- As badges são **iframes cross-origin** do domínio `credly.com`
- JavaScript não consegue acessar `iframe.contentDocument` devido a CORS
- CSS externo não pode modificar conteúdo dentro do iframe
- O texto do badge (nome e emissor) vem renderizado pelo próprio Credly

## 🎯 MISSÃO DA IA

**ENCONTRE UMA SOLUÇÃO DEFINITIVA** para fazer o texto das badges ser **100% legível no modo escuro**.

## 💡 ABORDAGENS A TENTAR

### 1. **Filtros CSS Específicos para Texto**
```css
/* Tente filtros que afetem especificamente elementos de texto */
[data-theme="dark"] .badge-container iframe {
    filter: invert(1) hue-rotate(180deg) contrast(1.2) brightness(1.1);
}
```

### 2. **Overlay com Mix-Blend-Mode Avançado**
```css
/* Overlay que force o texto a aparecer */
[data-theme="dark"] .badge-container::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(255,255,255,0.9);
    mix-blend-mode: difference;
    pointer-events: none;
}
```

### 3. **Interceptação do Credly Script**
```javascript
// Interceptar e modificar as chamadas do Credly antes da renderização
// Modificar URLs ou parâmetros do embed para forçar tema claro
```

### 4. **Fallback com Screenshot/Cache**
```javascript
// Se não conseguir modificar, criar versão alternativa
// Cache das badges em modo claro e mostrar no modo escuro
```

### 5. **CSS-in-JS Dynamic Injection**
```javascript
// Tentar injetar estilos via diferentes métodos
// postMessage, URL parameters, etc.
```

## 🎨 REQUISITOS OBRIGATÓRIOS

### ✅ DEVE FUNCIONAR:
- [x] Texto **100% legível** no modo escuro
- [x] Texto **100% legível** no modo claro  
- [x] Transição suave entre temas
- [x] Não quebrar funcionalidade existente
- [x] Manter aspecto visual profissional

### 🚫 NÃO PODE:
- [ ] Quebrar a funcionalidade do Credly
- [ ] Remover a autenticidade das badges
- [ ] Causar problemas de performance
- [ ] Afetar outros elementos da página

## 📁 ARQUIVOS PARA MODIFICAR

### Principais:
- `/home/felipe-macedo/projects/my-linktree-html/index.html` (linhas 150-220 CSS, 400-420 HTML, 450+ JavaScript)

### Opcionais:
- `enhanced-badges.css`
- `badge-manager.js`

## 🔧 INSTRUÇÕES ESPECÍFICAS

1. **ANALISE** o problema com olhar fresco
2. **TESTE** cada abordagem progressivamente
3. **COMBINE** múltiplas técnicas se necessário
4. **DOCUMENTE** cada tentativa no código
5. **VALIDE** que funciona em ambos os temas

## 🎯 RESULTADO ESPERADO

**ANTES** (atual): Texto escuro invisível no fundo escuro
**DEPOIS** (meta): Texto branco/claro perfeitamente legível no modo escuro

## 💬 FEEDBACK FINAL

Após implementar, teste alternando entre modo claro/escuro e confirme:
- [ ] Texto das badges é legível em AMBOS os modos
- [ ] Transições funcionam suavemente  
- [ ] Layout não quebrou
- [ ] Performance mantida

---

**🚀 MISSÃO: TORNAR AS BADGES 100% LEGÍVEIS EM QUALQUER TEMA!**
