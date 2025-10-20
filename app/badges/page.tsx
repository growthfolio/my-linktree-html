import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { BADGE_IDS, getBadgeIds } from '@/config/badges'
import CredlyBadgeCard from '../components/CredlyBadgeCard'
import { transformBadgeData } from '@/types/credly'
import type { CredlyBadgeData, BadgeDisplayData } from '@/types/credly'

/**
 * Configuração de revalidação (ISR)
 * Revalida a cada 1 hora (3600 segundos)
 */
export const revalidate = 3600

/**
 * Metadata da página
 */
export const metadata: Metadata = {
  title: 'Certificações | Felipe Macedo',
  description: 'Minhas certificações profissionais na AWS e outras plataformas',
  openGraph: {
    title: 'Certificações | Felipe Macedo',
    description: 'Certificações profissionais validadas pelo Credly',
    type: 'website',
  }
}

/**
 * Busca dados de um badge via API interna
 */
async function fetchBadgeData(badgeId: string): Promise<BadgeDisplayData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/credly/${badgeId}`, {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      console.error(`Erro ao buscar badge ${badgeId}: ${response.status}`)
      return null
    }

    const data: CredlyBadgeData = await response.json()
    return transformBadgeData(data)
  } catch (error) {
    console.error(`Erro ao processar badge ${badgeId}:`, error)
    return null
  }
}

/**
 * Busca todos os badges em paralelo
 */
async function fetchAllBadges(): Promise<BadgeDisplayData[]> {
  const badgeIds = getBadgeIds()
  
  // Promise.all para buscar todos em paralelo
  const badges = await Promise.all(
    badgeIds.map(id => fetchBadgeData(id))
  )

  // Filtra badges que falharam
  return badges.filter((badge): badge is BadgeDisplayData => badge !== null)
}

/**
 * Loading skeleton para badges
 */
function BadgesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="w-full max-w-sm p-6 rounded-2xl bg-[var(--surface)] border-2 border-[var(--border)] animate-pulse"
        >
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 rounded-full bg-[var(--muted)]/20"></div>
          </div>
          <div className="h-6 bg-[var(--muted)]/20 rounded mb-2"></div>
          <div className="h-4 bg-[var(--muted)]/20 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-[var(--muted)]/20 rounded"></div>
            <div className="h-3 bg-[var(--muted)]/20 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Componente de conteúdo (Server Component)
 */
async function BadgesContent() {
  const badges = await fetchAllBadges()

  if (badges.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😔</div>
        <h2 className="text-2xl font-bold mb-2 text-[var(--text)]">
          Nenhum badge encontrado
        </h2>
        <p className="text-[var(--muted)] mb-6">
          Não foi possível carregar as certificações no momento.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-[var(--brand)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Voltar para Home
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-[var(--surface)] border-2 border-[var(--border)] text-center">
          <div className="text-3xl font-bold text-[var(--brand)] mb-1">
            {badges.length}
          </div>
          <div className="text-xs text-[var(--muted)]">Certificações</div>
        </div>
        
        <div className="p-4 rounded-lg bg-[var(--surface)] border-2 border-[var(--border)] text-center">
          <div className="text-3xl font-bold text-[var(--brand)] mb-1">
            {badges.filter(b => BADGE_IDS.find(c => c.id === b.id)?.featured).length}
          </div>
          <div className="text-xs text-[var(--muted)]">Em Destaque</div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--surface)] border-2 border-[var(--border)] text-center">
          <div className="text-3xl font-bold text-[var(--brand)] mb-1">
            {new Set(badges.map(b => b.issuerName)).size}
          </div>
          <div className="text-xs text-[var(--muted)]">Emissores</div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--surface)] border-2 border-[var(--border)] text-center">
          <div className="text-3xl font-bold text-[var(--brand)] mb-1">
            {badges.reduce((acc, b) => acc + (b.skills?.length || 0), 0)}
          </div>
          <div className="text-xs text-[var(--muted)]">Habilidades</div>
        </div>
      </div>

      {/* Grid de Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => {
          const config = BADGE_IDS.find(c => c.id === badge.id)
          return (
            <CredlyBadgeCard 
              key={badge.id} 
              badge={badge}
              featured={config?.featured}
            />
          )
        })}
      </div>
    </>
  )
}

/**
 * Página principal de badges
 */
export default function BadgesPage() {
  return (
    <main className="relative mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--brand)] transition-colors mb-4"
        >
          <i className="ph-bold ph-arrow-left"></i>
          <span>Voltar</span>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text)]">
          🏆 Minhas Certificações
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Certificações profissionais validadas e verificáveis através do Credly.
          Todas as credenciais são autênticas e podem ser verificadas online.
        </p>
      </div>

      {/* Conteúdo com Suspense */}
      <Suspense fallback={<BadgesSkeleton />}>
        <BadgesContent />
      </Suspense>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-[var(--muted)]">
        <p>
          Todas as certificações são verificadas e emitidas através do{' '}
          <a 
            href="https://www.credly.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--brand)] hover:underline"
          >
            Credly
          </a>
        </p>
        <p className="mt-2 text-xs opacity-70">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </footer>
    </main>
  )
}
