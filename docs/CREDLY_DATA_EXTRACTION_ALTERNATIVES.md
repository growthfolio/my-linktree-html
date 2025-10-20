# 🔐 Alternativas para Extrair Dados do Credly

## ⚠️ Problema: CORS

A API do Credly **não permite requisições diretas do browser** devido à política CORS (Cross-Origin Resource Sharing). Quando tentamos fazer `fetch()` direto do cliente, recebemos erro de CORS.

---

## 🎯 Alternativas Viáveis

### 1️⃣ **Proxy API via Next.js Route Handler** ⭐ RECOMENDADO

**Como funciona:**
- Criar uma API Route no Next.js (`/app/api/credly/[badgeId]/route.ts`)
- O servidor Next.js faz a requisição para o Credly
- Não há CORS pois é servidor → servidor
- O cliente busca dados da sua própria API

**Vantagens:**
- ✅ Sem problemas de CORS
- ✅ Pode cachear os dados
- ✅ Pode adicionar rate limiting
- ✅ Esconde headers/tokens sensíveis
- ✅ Funciona com SSR e CSR

**Implementação:**
```typescript
// app/api/credly/[badgeId]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { badgeId: string } }
) {
  const response = await fetch(
    `https://www.credly.com/api/v1/obi/v2/badges/${params.badgeId}`
  )
  const data = await response.json()
  return Response.json(data)
}
```

---

### 2️⃣ **Web Scraping do Iframe**

**Como funciona:**
- Carregar o iframe do Credly
- Usar técnicas de scraping para extrair dados do HTML
- **PROBLEMA:** CORS também impede acesso ao conteúdo do iframe

**Status:**
- ❌ Não funciona devido a Same-Origin Policy
- ❌ Conteúdo do iframe fica isolado

---

### 3️⃣ **Credly Public API com Token**

**Como funciona:**
- Se você tem uma conta Credly, pode ter acesso à API oficial
- Requer autenticação OAuth ou API Key
- Documentação: https://www.credly.com/developers

**Vantagens:**
- ✅ API oficial e estável
- ✅ Mais dados disponíveis
- ✅ Melhor performance

**Desvantagens:**
- ❌ Requer conta/plano pago
- ❌ Rate limits mais rigorosos
- ❌ Necessita token secreto (deve ficar no servidor)

---

### 4️⃣ **Server-Side Rendering (SSR) no Next.js**

**Como funciona:**
- Buscar dados durante SSR/SSG
- Passar dados como props para componente
- Cache em build time

**Vantagens:**
- ✅ Melhor SEO
- ✅ Dados carregados instantaneamente
- ✅ Reduz requisições do cliente

**Implementação:**
```typescript
// app/page.tsx
async function getBadgeData(badgeId: string) {
  const res = await fetch(`https://www.credly.com/api/v1/obi/v2/badges/${badgeId}`)
  return res.json()
}

export default async function Page() {
  const badgeData = await getBadgeData('badge-id')
  return <CustomCredlyBadge data={badgeData} />
}
```

---

### 5️⃣ **Serviço de Proxy Externo**

**Como funciona:**
- Usar serviços como CORS Anywhere, AllOrigins
- Adiciona headers CORS às requisições

**Exemplos:**
```typescript
// Usando CORS Anywhere (não recomendado para produção)
fetch(`https://cors-anywhere.herokuapp.com/https://www.credly.com/api/...`)

// Usando AllOrigins
fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(credlyUrl)}`)
```

**Desvantagens:**
- ❌ Não confiável para produção
- ❌ Rate limits agressivos
- ❌ Pode cair a qualquer momento
- ❌ Questões de privacidade

---

### 6️⃣ **Dados Hardcoded com Script de Sync**

**Como funciona:**
- Criar script Node.js que busca dados periodicamente
- Salvar em arquivo JSON local
- App consome JSON estático

**Vantagens:**
- ✅ Zero latência
- ✅ Funciona offline
- ✅ Sem rate limits

**Desvantagens:**
- ❌ Dados podem ficar desatualizados
- ❌ Requer rebuild/redeploy para atualizar
- ❌ Não escala bem para muitos badges

**Implementação:**
```bash
# scripts/sync-badges.js
node scripts/sync-badges.js
# Salva em public/badges-data.json
```

---

### 7️⃣ **Cloudflare Workers / Edge Functions**

**Como funciona:**
- Deploy de função edge que faz proxy
- Roda na edge mais próxima do usuário
- Sem servidor tradicional

**Vantagens:**
- ✅ Latência ultra-baixa
- ✅ Escala automaticamente
- ✅ Free tier generoso

**Plataformas:**
- Cloudflare Workers
- Vercel Edge Functions
- Netlify Edge Functions

---

## 🏆 Recomendação Final

### Para Produção: **Opção 1 (Next.js API Route)** + **Opção 4 (SSR)**

**Fluxo ideal:**
```
1. Build time: SSR busca dados via proxy interno
2. Página carrega com dados já renderizados
3. Cliente pode fazer revalidate via API Route
4. Cache com ISR (Incremental Static Regeneration)
```

**Código exemplo:**
```typescript
// app/api/credly/[badgeId]/route.ts
export async function GET(req, { params }) {
  const res = await fetch(
    `https://www.credly.com/api/v1/obi/v2/badges/${params.badgeId}`,
    { next: { revalidate: 3600 } } // Cache 1 hora
  )
  return Response.json(await res.json())
}

// app/badges/page.tsx
export const revalidate = 3600 // Revalida a cada 1 hora

async function getBadges() {
  const badges = ['id1', 'id2', 'id3']
  return Promise.all(
    badges.map(id => 
      fetch(`http://localhost:3000/api/credly/${id}`)
        .then(r => r.json())
    )
  )
}
```

---

## 📊 Comparação Rápida

| Alternativa | CORS | Performance | Confiabilidade | Complexidade |
|-------------|------|-------------|----------------|--------------|
| 1. Next.js API | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Baixa |
| 2. Iframe Scraping | ❌ | - | - | - |
| 3. API Oficial | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Média |
| 4. SSR | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Baixa |
| 5. Proxy Externo | ⚠️ | ⭐⭐ | ⭐ | Baixa |
| 6. Hardcoded | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Média |
| 7. Edge Functions | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Média |

---

## 🚀 Próximos Passos

Escolha a alternativa e eu implemento para você! Qual prefere?

1. Implementar Next.js API Route (rápido e simples)
2. Implementar SSR completo com cache
3. Usar dados hardcoded por enquanto
4. Explorar API oficial do Credly
