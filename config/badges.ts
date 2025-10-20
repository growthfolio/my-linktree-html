/**
 * Configuração centralizada de badges do Credly
 * IDs extraídos das certificações AWS
 */

export interface BadgeConfig {
  id: string
  featured?: boolean
  category?: string
}

export const BADGE_IDS: BadgeConfig[] = [
  {
    id: '5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85',
    featured: true,
    category: 'AWS'
  },
  {
    id: '3e0210b2-b5a7-42ed-8ba8-b099d35348ca',
    category: 'AWS'
  },
  {
    id: '7f62f225-3005-4043-b762-eb608f07636b',
    category: 'AWS'
  },
  {
    id: '947a0b6f-ebd4-4089-9158-48dc187c5068',
    featured: true,
    category: 'AWS'
  },
  {
    id: '0ce03a22-0f7a-42a4-b12d-408ccf4441d9',
    category: 'AWS'
  },
  {
    id: 'c1cb7ff3-a435-4f34-a046-dd5a1a885d09',
    category: 'AWS'
  },
  {
    id: 'f61b26e5-f236-4f74-a963-90a7daa9d8c1',
    category: 'AWS'
  },
  {
    id: '1e2ca8f1-6abd-4487-979b-0d2d22077df4',
    category: 'AWS'
  }
]

// Helper para extrair apenas os IDs
export const getBadgeIds = (): string[] => BADGE_IDS.map(badge => badge.id)

// Helper para buscar badge por ID
export const getBadgeConfig = (id: string): BadgeConfig | undefined => 
  BADGE_IDS.find(badge => badge.id === id)
