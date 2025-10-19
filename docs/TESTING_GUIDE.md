# 🧪 Guia de Testes - My Linktree Next.js

## ✅ Checklist de Funcionalidades para Testar

### 1. 🎨 Tema Dark/Light

**Como testar:**
1. Abra a aplicação
2. Clique no botão de tema (lua/sol) no header
3. Verifique se o tema alterna suavemente
4. Recarregue a página e veja se o tema persiste
5. Teste a preferência do sistema (se seu OS estiver em dark/light mode)

**Comportamentos esperados:**
- ✅ Transição suave entre temas
- ✅ Persistência no localStorage
- ✅ Ícone muda (lua → sol)
- ✅ Todas as cores mudam adequadamente
- ✅ Feedback háptico em mobile (se disponível)

### 2. 🖼️ Profile Component

**Como testar:**
1. Observe o carregamento da página
2. Veja o skeleton loading enquanto a imagem carrega
3. A imagem deve aparecer suavemente do GitHub

**Comportamentos esperados:**
- ✅ Skeleton loading animado
- ✅ Imagem carrega do GitHub (@felipemacedo1)
- ✅ Border laranja (AWS brand color)
- ✅ Animação de entrada sequencial (imagem → título → descrição)
- ✅ Shadow e efeitos visuais

### 3. 🏆 Badges AWS (Carousel)

**Como testar:**
1. Role até a seção de badges
2. Teste a navegação com as setas
3. Teste os dots de paginação
4. Aguarde o autoplay
5. Redimensione a janela para testar responsividade

**Comportamentos esperados:**
- ✅ Loading spinner enquanto badges carregam
- ✅ Badges da Credly aparecem corretamente
- ✅ Navegação funcional (prev/next)
- ✅ Autoplay a cada 4 segundos
- ✅ Paginação funcional
- ✅ Responsivo (1 badge mobile, 2 tablet, 3 desktop)
- ✅ Retry em caso de falha (até 3x)
- ✅ Fallback UI se falhar

### 4. 🔗 Social Links

**Como testar:**
1. Clique em cada link social
2. Verifique se abre em nova aba
3. Teste o hover effect

**Comportamentos esperados:**
- ✅ Links funcionam corretamente
- ✅ Abrem em nova aba (target="_blank")
- ✅ Hover effect suave
- ✅ Ícones corretos para cada plataforma

### 5. 📋 Share Button

**Como testar:**
1. Clique no botão de compartilhar
2. Em mobile, teste a Web Share API
3. Em desktop, o link deve ser copiado

**Comportamentos esperados:**
- ✅ Toast de sucesso aparece
- ✅ Link copiado para clipboard
- ✅ Feedback háptico em mobile
- ✅ Web Share API em mobile (se disponível)
- ✅ Fallback para clipboard

### 6. 🎯 Toast Notifications

**Como testar:**
1. Clique no share button (deve mostrar toast de sucesso)
2. Teste Ctrl+C (deve copiar e mostrar toast)
3. Observe o auto-dismiss após 3 segundos
4. Clique no X para fechar manualmente

**Comportamentos esperados:**
- ✅ Toast aparece no topo da tela
- ✅ Ícone correto para cada tipo (✓ success, ✕ error, ℹ info)
- ✅ Cor de borda de acordo com o tipo
- ✅ Auto-dismiss após tempo configurado
- ✅ Botão fechar funcional
- ✅ Múltiplos toasts empilham corretamente
- ✅ Animação de entrada suave

### 7. ⌨️ Keyboard Shortcuts

**Como testar:**
1. Pressione `Ctrl+C` ou `Cmd+C` (Mac)
2. Pressione `Ctrl+K` ou `Cmd+K` (Mac)
3. Pressione `Tab` para navegar

**Comportamentos esperados:**
- ✅ `Ctrl+C`: Copia link da página (toast de confirmação)
- ✅ `Cmd+C`: Funciona em Mac
- ✅ `Ctrl+K`: Mostra toast com atalhos disponíveis
- ✅ `Tab`: Navegação por elementos focáveis
- ✅ Skip to content link aparece ao pressionar Tab

### 8. 🕐 Relógio em Tempo Real

**Como testar:**
1. Observe a seção de status (Online, São Paulo, BR)
2. Veja o relógio ao lado
3. Aguarde 1 minuto e veja se atualiza

**Comportamentos esperados:**
- ✅ Relógio mostra hora atual
- ✅ Formato HH:MM
- ✅ Atualiza a cada minuto
- ✅ Ícone de relógio ao lado

### 9. 🎬 Animações

**Como testar:**
1. Recarregue a página
2. Observe a entrada sequencial dos elementos
3. Role a página para ver animações de scroll
4. Passe o mouse sobre elementos interativos

**Comportamentos esperados:**
- ✅ Elementos entram sequencialmente (fade in + translate up)
- ✅ Profile → Social Links → Badges → Status
- ✅ Delay de ~100-150ms entre elementos
- ✅ Smooth scroll
- ✅ Hover effects em botões e links
- ✅ Active state (scale down) ao clicar

### 10. 📱 Responsividade

**Como testar:**
1. Redimensione a janela do navegador
2. Teste em diferentes breakpoints:
   - Mobile: < 640px
   - Tablet: 640px - 1024px
   - Desktop: > 1024px
3. Teste em DevTools com emulação mobile

**Comportamentos esperados:**
- ✅ Layout adapta-se a diferentes tamanhos
- ✅ Badges: 1 coluna (mobile), 2 (tablet), 3 (desktop)
- ✅ Texto legível em todas as telas
- ✅ Botões tocáveis (min 44px)
- ✅ Sem scroll horizontal
- ✅ Imagens responsivas

### 11. ♿ Acessibilidade

**Como testar:**
1. Use um screen reader (NVDA, JAWS, VoiceOver)
2. Navegue apenas com teclado
3. Teste com zoom 200%
4. Use o DevTools Lighthouse

**Comportamentos esperados:**
- ✅ Skip to content link funcional
- ✅ ARIA labels em todos os botões
- ✅ Role attributes corretos
- ✅ Navegação por teclado completa
- ✅ Focus indicators visíveis
- ✅ Contraste adequado (WCAG AA)
- ✅ Textos alternativos em imagens

### 12. 🚀 Performance

**Como testar:**
1. Abra o DevTools
2. Vá em Lighthouse
3. Execute audit em modo Desktop e Mobile
4. Analise Network tab

**Comportamentos esperados:**
- ✅ Performance Score > 90
- ✅ Accessibility Score = 100
- ✅ Best Practices Score > 90
- ✅ SEO Score = 100
- ✅ First Contentful Paint < 1.5s
- ✅ Largest Contentful Paint < 2.5s
- ✅ Time to Interactive < 3.5s
- ✅ Cumulative Layout Shift < 0.1

### 13. 🔍 SEO

**Como testar:**
1. Veja o `<head>` da página (View Source)
2. Use a ferramenta de SEO (Screaming Frog, etc)
3. Teste compartilhamento em redes sociais

**Comportamentos esperados:**
- ✅ Meta tags completas
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ Canonical URL
- ✅ Meta description
- ✅ Title tag otimizado

### 14. 🌐 Navegadores

**Testar em:**
- ✅ Chrome/Edge (últimas versões)
- ✅ Firefox (última versão)
- ✅ Safari (última versão)
- ✅ Safari iOS
- ✅ Chrome Android

### 15. 🐛 Error Handling

**Como testar:**
1. Desconecte a internet
2. Force erros no console
3. Teste com AdBlockers

**Comportamentos esperados:**
- ✅ Error boundaries capturam erros
- ✅ Fallback UI elegante
- ✅ Retry disponível onde aplicável
- ✅ Mensagens de erro amigáveis
- ✅ Loading states adequados

## 🎯 Casos de Uso Específicos

### Terminal Portfolio Button
1. Clique no botão laranja flutuante (canto inferior esquerdo)
2. Deve abrir o Terminal Portfolio em nova aba
3. Hover mostra tooltip

### Reduced Motion
1. Ative "Reduce Motion" no OS
2. Recarregue a página
3. Animações devem ser mínimas

## 📊 Métricas de Sucesso

- [ ] Build sem erros
- [ ] Build sem warnings
- [ ] Zero console errors no browser
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility = 100
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO = 100
- [ ] Todas as funcionalidades testadas ✓
- [ ] Responsivo em todos os breakpoints
- [ ] Funciona em todos os navegadores
- [ ] Acessibilidade WCAG AA compliant

## 🔧 Ferramentas de Teste Recomendadas

- **Chrome DevTools** - Lighthouse, Network, Performance
- **React DevTools** - Component tree, hooks
- **WAVE** - Accessibility testing
- **axe DevTools** - Accessibility testing
- **Responsively** - Multi-device testing
- **BrowserStack** - Cross-browser testing

## 📝 Notas

- Teste sempre em modo incógnito para evitar cache
- Limpe localStorage se necessário
- Teste com e sem JavaScript (Progressive Enhancement)
- Verifique console do browser para warnings/errors
- Teste com diferentes velocidades de conexão (DevTools → Network)

---

**Happy Testing! 🚀**
