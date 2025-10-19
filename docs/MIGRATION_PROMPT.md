# 🎯 Prompt de Migração CSS → Tailwind

## Instrução para o Agent

Execute a migração completa de CSS customizado para Tailwind CSS seguindo estas etapas:

### ETAPA 1: Configurar Tailwind (tailwind.config.js)
Adicione as seguintes extensões ao tema do Tailwind:
- `borderRadius.card: '16px'`
- `borderRadius.btn: '10px'`
- Animação customizada `slide-in` com keyframes

### ETAPA 2: Migrar Componentes (4 arquivos)

#### A) `app/components/SocialLinks.tsx`
- Substituir classe `card` por `rounded-card`

#### B) `app/components/ShareButton.tsx`
- Substituir classe `btn` por `rounded-btn`
- Substituir classe `ring-focus` por classes Tailwind de focus-visible

#### C) `app/page.tsx`
- Substituir classe `ring-focus` por classes Tailwind de focus-visible

#### D) `app/components/ui/Toast.tsx`
- Substituir `animate-in show` por `animate-slide-in`

### ETAPA 3: Limpar globals.css
Remover todo o código CSS não utilizado, mantendo apenas:
- Variáveis CSS (`:root`)
- Estilos base (`*`, `html`, `body`)
- Estilos de bibliotecas (`.badges-carousel`, `.credly-badge-container`)
- Utilitário `.scrollbar-hide`
- Media query `prefers-reduced-motion`

### ✅ Validação
Após cada mudança:
1. Verificar que o código compila sem erros
2. Confirmar que a funcionalidade permanece idêntica
3. Garantir que não há regressões visuais

### 📊 Resultado Esperado
- 4 componentes atualizados
- ~80 linhas removidas de globals.css
- 100% Tailwind (exceto overrides de bibliotecas)
- Zero quebras de funcionalidade

---

**Execute esta migração de forma precisa, testando cada etapa.**
