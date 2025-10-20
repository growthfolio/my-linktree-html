'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface CustomCredlyBadgeProps {
  badgeId: string
}

interface BadgeData {
  name: string
  description: string
  image: string
  issuer: {
    name: string
    url?: string
  }
  issuedOn: string
  expiresAt?: string
  skills?: Array<{ name: string }>
  criteriaUrl?: string
  badgeUrl?: string
}

export default function CustomCredlyBadge({ badgeId }: CustomCredlyBadgeProps) {
  const [badgeData, setBadgeData] = useState<BadgeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBadgeData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://www.credly.com/api/v1/obi/v2/badges/${badgeId}`)
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do badge')
        }

        const data = await response.json()
        console.log('Dados da API Credly:', data)

        setBadgeData({
          name: data.badge?.name || data.name || 'Certificação',
          description: data.badge?.description || data.description || '',
          image: data.badge?.image || data.image || '',
          issuer: {
            name: data.badge?.issuer?.name || data.issuer?.name || 'Credly',
            url: data.badge?.issuer?.url || data.issuer?.url
          },
          issuedOn: data.issuedOn || data.issued_on || new Date().toISOString(),
          expiresAt: data.expiresAt || data.expires_at,
          skills: data.badge?.skills || data.skills || [],
          criteriaUrl: data.badge?.criteria_url || data.criteria_url,
          badgeUrl: `https://www.credly.com/badges/${badgeId}`
        })
      } catch (err) {
        console.error('Erro ao buscar badge:', err)
        setError('Não foi possível carregar o badge')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBadgeData()
  }, [badgeId])

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-[var(--surface)] animate-pulse">
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-[color:var(--muted)]/20"></div>
          <div className="w-3/4 h-6 rounded bg-[color:var(--muted)]/20"></div>
          <div className="w-full h-4 rounded bg-[color:var(--muted)]/20"></div>
          <div className="w-full h-4 rounded bg-[color:var(--muted)]/20"></div>
        </div>
      </div>
    )
  }

  if (error || !badgeData) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-[var(--surface)] border-2 border-red-500/20">
        <p className="text-center text-red-500">❌ {error || 'Erro desconhecido'}</p>
      </div>
    )
  }

  const formattedDate = new Date(badgeData.issuedOn).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-[var(--surface)] shadow-lg border-2 border-[var(--border)] hover:border-[var(--brand)] transition-all duration-300 hover:shadow-xl hover:shadow-[var(--brand)]/20">
      {/* Cabeçalho com imagem do badge */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-[var(--brand)]/30 hover:ring-[var(--brand)] transition-all duration-300">
          {badgeData.image ? (
            <img 
              src={badgeData.image} 
              alt={badgeData.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] flex items-center justify-center">
              <span className="text-4xl">🏆</span>
            </div>
          )}
        </div>

        {/* Nome do badge */}
        <h3 className="text-xl font-bold text-center text-[var(--text)]">
          {badgeData.name}
        </h3>
      </div>

      {/* Descrição */}
      {badgeData.description && (
        <div className="mb-4">
          <p className="text-sm text-[var(--muted)] line-clamp-3">
            {badgeData.description}
          </p>
        </div>
      )}

      {/* Informações */}
      <div className="space-y-3 mb-4">
        {/* Emissor */}
        <div className="flex items-center gap-2 text-sm">
          <i className="ph-bold ph-building text-[var(--brand)]"></i>
          <span className="text-[var(--muted)]">Emissor:</span>
          {badgeData.issuer.url ? (
            <a 
              href={badgeData.issuer.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--brand)] hover:underline font-medium"
            >
              {badgeData.issuer.name}
            </a>
          ) : (
            <span className="text-[var(--text)] font-medium">{badgeData.issuer.name}</span>
          )}
        </div>

        {/* Data de emissão */}
        <div className="flex items-center gap-2 text-sm">
          <i className="ph-bold ph-calendar text-[var(--brand)]"></i>
          <span className="text-[var(--muted)]">Emitido em:</span>
          <span className="text-[var(--text)] font-medium">{formattedDate}</span>
        </div>

        {/* Expiração (se houver) */}
        {badgeData.expiresAt && (
          <div className="flex items-center gap-2 text-sm">
            <i className="ph-bold ph-clock text-[var(--brand)]"></i>
            <span className="text-[var(--muted)]">Expira em:</span>
            <span className="text-[var(--text)] font-medium">
              {new Date(badgeData.expiresAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
        )}
      </div>

      {/* Skills */}
      {badgeData.skills && badgeData.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-[var(--muted)] mb-2 flex items-center gap-2">
            <i className="ph-bold ph-star text-[var(--brand)]"></i>
            Habilidades:
          </p>
          <div className="flex flex-wrap gap-2">
            {badgeData.skills.slice(0, 5).map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex gap-2 mt-6">
        {badgeData.badgeUrl && (
          <a
            href={badgeData.badgeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 rounded-lg bg-[var(--brand)] text-white font-medium text-sm text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <i className="ph-bold ph-arrow-square-out"></i>
            Ver no Credly
          </a>
        )}
        
        {badgeData.criteriaUrl && (
          <a
            href={badgeData.criteriaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 rounded-lg border-2 border-[var(--brand)] text-[var(--brand)] font-medium text-sm text-center hover:bg-[var(--brand)]/10 transition-colors flex items-center justify-center gap-2"
          >
            <i className="ph-bold ph-info"></i>
            Critérios
          </a>
        )}
      </div>
    </div>
  )
}
