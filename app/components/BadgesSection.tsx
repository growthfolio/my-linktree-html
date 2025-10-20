import { BADGE_IDS } from '@/config/badges'
import { transformBadgeData } from '@/types/credly'
import type { CredlyBadgeData, BadgeDisplayData } from '@/types/credly'
import BadgeCarousel from './BadgeCarousel'

/**
 * Busca dados de um badge via API interna (SSR)
 */
async function fetchBadgeData(badgeId: string): Promise<BadgeDisplayData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/credly/${badgeId}`, {
      next: { revalidate: 3600 }, // Cache de 1 hora
      cache: 'force-cache'
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
 * Server Component que busca os badges no servidor
 */
export default async function BadgesSection() {
  // Busca todos os badges em paralelo
  const badgeIds = BADGE_IDS.map(b => b.id)
  const badgesData = await Promise.all(
    badgeIds.map(id => fetchBadgeData(id))
  )

  // Filtra badges que falharam e adiciona flag de featured
  const badges: Array<BadgeDisplayData & { featured?: boolean }> = badgesData
    .filter((badge): badge is BadgeDisplayData => badge !== null)
    .map(badge => ({
      ...badge,
      featured: BADGE_IDS.find(b => b.id === badge.id)?.featured
    }))

  return (
    <section className="mt-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">🏆 Minhas Badges</h2>
        <p className="text-sm text-[color:var(--muted)]">
          Certificações oficiais com dados do Credly
        </p>
      </div>
      
      {/* Badge Carousel */}
      <BadgeCarousel badges={badges} />
    </section>
  )
}