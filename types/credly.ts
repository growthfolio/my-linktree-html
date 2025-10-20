/**
 * Tipos TypeScript para dados do Credly
 * Baseados na estrutura da API do Credly
 */

export interface CredlyIssuer {
  name: string
  url?: string
  image?: string
}

export interface CredlySkill {
  name: string
  category?: string
}

export interface CredlyBadgeData {
  // Identificação
  id: string
  badge_template_id?: string
  
  // Informações principais
  name: string
  description: string
  image_url: string
  
  // Emissor
  issuer: CredlyIssuer
  
  // Datas
  issued_at: string
  expires_at?: string | null
  
  // Metadados
  state: 'accepted' | 'pending' | 'rejected'
  public: boolean
  
  // Skills e critérios
  skills?: CredlySkill[]
  criteria_url?: string
  evidence_url?: string
  
  // URLs
  badge_url?: string
  share_url?: string
  
  // Extras
  locale?: string
  recipient_email?: string
}

export interface CredlyAPIResponse {
  data: CredlyBadgeData
  metadata?: {
    issued_to?: string
    issued_on?: string
  }
}

// Tipo simplificado para componente
export interface BadgeDisplayData {
  id: string
  name: string
  description: string
  imageUrl: string
  issuerName: string
  issuerUrl?: string
  issuedAt: string
  expiresAt?: string | null
  skills?: string[]
  badgeUrl?: string
  criteriaUrl?: string
}

// Helper para transformar resposta da API
export function transformBadgeData(apiData: CredlyBadgeData): BadgeDisplayData {
  return {
    id: apiData.id,
    name: apiData.name,
    description: apiData.description,
    imageUrl: apiData.image_url,
    issuerName: apiData.issuer.name,
    issuerUrl: apiData.issuer.url,
    issuedAt: apiData.issued_at,
    expiresAt: apiData.expires_at,
    skills: apiData.skills?.map(skill => skill.name) || [],
    badgeUrl: apiData.badge_url || apiData.share_url,
    criteriaUrl: apiData.criteria_url
  }
}
