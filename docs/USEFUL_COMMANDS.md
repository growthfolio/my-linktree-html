# 🛠️ Comandos Úteis - My Linktree Next.js

## 📦 Gerenciamento de Pacotes

```bash
# Instalar dependências
npm install

# Atualizar dependências
npm update

# Verificar dependências desatualizadas
npm outdated

# Audit de segurança
npm audit
npm audit fix
```

## 🚀 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Iniciar em porta específica
npm run dev -- -p 3001

# Iniciar com Turbopack (experimental)
npx next dev --turbo
```

## 🏗️ Build e Produção

```bash
# Build de produção
npm run build

# Analisar bundle size
npm run build -- --profile

# Iniciar servidor de produção (após build)
npm start

# Exportar para static (já configurado)
npm run build
# Arquivos em: ./out/
```

## 🧹 Linting e Formatação

```bash
# Executar linter
npm run lint

# Executar linter com fix automático
npm run lint -- --fix

# Verificar tipos TypeScript
npx tsc --noEmit
```

## 🔍 Debugging

```bash
# Verificar estrutura de rotas
npx next info

# Limpar cache do Next.js
rm -rf .next
npm run dev

# Limpar cache completo
rm -rf .next out node_modules
npm install
npm run build
```

## 📊 Análise e Performance

```bash
# Analisar bundle size com @next/bundle-analyzer
npm install --save-dev @next/bundle-analyzer
# Adicionar no next.config.js:
# const withBundleAnalyzer = require('@next/bundle-analyzer')({
#   enabled: process.env.ANALYZE === 'true',
# })
# module.exports = withBundleAnalyzer(nextConfig)

# Executar análise
ANALYZE=true npm run build
```

## 🧪 Testes (Para implementar)

```bash
# Instalar Jest e React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Instalar Playwright para E2E
npm install --save-dev @playwright/test

# Executar testes unitários
npm test

# Executar testes E2E
npm run test:e2e

# Executar testes com coverage
npm run test:coverage
```

## 🎨 Styling

```bash
# Gerar configuração completa do Tailwind
npx tailwindcss init --full

# Verificar classes Tailwind não utilizadas
npx tailwindcss-cli build src/input.css -o dist/output.css --minify
```

## 📱 Deploy

### GitHub Pages

```bash
# Build
npm run build

# Deploy manual (se não usar GitHub Actions)
# 1. Copie conteúdo de ./out/ para gh-pages branch
# 2. Push para GitHub
```

### Vercel

```bash
# Instalar CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Netlify

```bash
# Instalar CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy para produção
netlify deploy --prod
```

## 🔧 Troubleshooting

### Problema: Hydration mismatch

```bash
# Limpar cache
rm -rf .next
npm run dev
```

### Problema: Imagens não carregam

```bash
# Verificar next.config.js
# Certifique-se que images.unoptimized = true para static export
```

### Problema: Swiper não funciona

```bash
# Verificar se dynamic import está correto
# Verificar se 'use client' está no topo do arquivo
```

### Problema: Toast não aparece

```bash
# Verificar se ToastProvider envolve os componentes
# Verificar console para erros
```

### Problema: Tema não persiste

```bash
# Limpar localStorage
localStorage.clear()
# Recarregar página
```

## 📝 Scripts Personalizados Úteis

Adicione ao `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next out node_modules",
    "reinstall": "npm run clean && npm install",
    "analyze": "ANALYZE=true npm run build",
    "export": "next build && next export"
  }
}
```

## 🔐 Environment Variables

Criar `.env.local`:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API Keys (se necessário)
NEXT_PUBLIC_API_KEY=your-api-key

# Environment
NEXT_PUBLIC_ENV=development
```

## 📦 Dependências Opcionais

```bash
# Bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Testing
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# E2E Testing
npm install --save-dev @playwright/test

# Linting adicional
npm install --save-dev eslint-plugin-jsx-a11y eslint-plugin-import

# Prettier
npm install --save-dev prettier eslint-config-prettier

# Storybook
npx storybook init
```

## 🎯 Git Workflow

```bash
# Criar branch para feature
git checkout -b feature/nome-da-feature

# Commit com mensagem descritiva
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push para remote
git push origin feature/nome-da-feature

# Merge para main (após PR aprovado)
git checkout main
git merge feature/nome-da-feature
git push origin main

# Delete branch local
git branch -d feature/nome-da-feature

# Delete branch remota
git push origin --delete feature/nome-da-feature
```

## 📊 Monitoring

```bash
# Verificar build size
npm run build
# Olhar para "First Load JS" no output

# Verificar tree-shaking
# Verificar se apenas o código usado está no bundle

# Performance profiling
# Chrome DevTools → Performance → Record
```

## 🔄 Update Next.js

```bash
# Atualizar Next.js para última versão
npm install next@latest react@latest react-dom@latest

# Verificar breaking changes
# https://nextjs.org/docs/upgrading
```

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Swiper Docs](https://swiperjs.com/react)

---

**Need help?** Abra uma issue no GitHub ou consulte a documentação oficial.
