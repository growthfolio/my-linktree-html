import Image from 'next/image'
import type { BadgeDisplayData } from '@/types/credly'

interface CredlyBadgeProps {
  badge: BadgeDisplayData
  featured?: boolean
}

/**
 * Componente otimizado para exibir badge do Credly
 * Recebe dados já resolvidos (não faz fetch)
 * Perfeito para SSR/SSG
 */
export default function CredlyBadgeCard({ badge, featured = false }: CredlyBadgeProps) {
  // Formata data
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return 'Data inválida'
    }
  }

  const issuedDate = formatDate(badge.issuedAt)
  const expiresDate = badge.expiresAt ? formatDate(badge.expiresAt) : null

  return (
    <article 
      className={`
        relative w-full max-w-[274px] min-w-[244px] px-6 py-3 rounded-2xl rounded-tl-none rounded-tr-none
        bg-[var(--surface)] 
        border-2
      `}
    >
      {/* Badge Featured */}
      {featured && (
        <div className="absolute -top-3 -right-3 bg-[var(--brand)] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
          <span>⭐</span>
          <span>Destaque</span>
        </div>
      )}

      {/* Imagem do Badge */}
      <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32 rounded-full 
        bg-white overflow-hidden ring-2 ring-white">
          {badge.imageUrl ? (
            <Image
              src={badge.imageUrl}
              alt={badge.name}
              fill
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
              quality={95}
              className="object-cover"
              priority={featured}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] flex items-center justify-center">
              <span className="text-4xl">🏆</span>
            </div>
          )}
        </div>
      </div>

      {/* Nome do Badge */}
      <h3 className="text-lg font-bold text-center text-[var(--text)] mb-2 line-clamp-2 min-h-[3.5rem]">
        {badge.name}
      </h3>

      {/* Descrição */}
      <p className="text-sm text-[var(--muted)] text-center mb-4 line-clamp-3 min-h-[4rem]">
        {badge.description}
      </p>

      {/* Informações */}
      <div className="space-y-2 mb-4">
        {/* Emissor */}
        <div className="flex items-center gap-2 text-xs">
          <i className="ph-bold ph-building text-[var(--brand)]"></i>
          <span className="text-[var(--muted)]">Emissor:</span>
          {badge.issuerUrl ? (
            <a 
              href={badge.issuerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand)] hover:underline font-medium flex-1 truncate"
            >
              {badge.issuerName}
            </a>
          ) : (
            <span className="text-[var(--text)] font-medium flex-1 truncate">
              {badge.issuerName}
            </span>
          )}
        </div>

        {/* Data de Emissão */}
        <div className="flex items-center gap-2 text-xs">
          <i className="ph-bold ph-calendar text-[var(--brand)]"></i>
          <span className="text-[var(--muted)]">Emitido:</span>
          <span className="text-[var(--text)] font-medium">{issuedDate}</span>
        </div>

        {/* Expiração */}
        {expiresDate && (
          <div className="flex items-center gap-2 text-xs">
            <i className="ph-bold ph-clock text-[var(--brand)]"></i>
            <span className="text-[var(--muted)]">Expira:</span>
            <span className="text-[var(--text)] font-medium">{expiresDate}</span>
          </div>
        )}
      </div>

      {/* Skills */}
      {badge.skills && badge.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-[var(--muted)] mb-2 flex items-center gap-1">
            <i className="ph-bold ph-star text-[var(--brand)]"></i>
            <span>Habilidades:</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {badge.skills.slice(0, 4).map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20"
              >
                {skill}
              </span>
            ))}
            {badge.skills.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-full bg-[var(--muted)]/10 text-[var(--muted)]">
                +{badge.skills.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer com botão integrado */}
      {badge.badgeUrl && (
        <a
          href={badge.badgeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="-mx-6 -mb-3 mt-4 px-6 py-3 border-t-2 border-white/20 bg-white/5 text-white font-medium text-sm text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2 rounded-b-2xl"
        >
          <i className="ph-bold ph-arrow-square-out text-base"></i>
          <span>Ver Badge</span>
        </a>
      )}
    </article>
  )
}

