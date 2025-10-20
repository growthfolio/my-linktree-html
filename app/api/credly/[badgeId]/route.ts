import { NextRequest, NextResponse } from 'next/server'
import type { CredlyBadgeData } from '@/types/credly'

/**
 * API Route para buscar dados de badge do Credly
 * Funciona como proxy para evitar problemas de CORS
 * Cache configurado para 1 hora (3600 segundos)
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { badgeId: string } }
) {
  const { badgeId } = params

  // Validação básica do ID
  if (!badgeId || badgeId.length < 10) {
    return NextResponse.json(
      { error: 'Badge ID inválido' },
      { status: 400 }
    )
  }

  try {
    // Tenta buscar da API oficial do Credly
    const credlyApiUrl = `https://www.credly.com/api/v1/obi/v2/badges/${badgeId}`
    
    const response = await fetch(credlyApiUrl, {
      next: { 
        revalidate: 3600 // Cache de 1 hora
      },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS/14.0)'
      }
    })

    if (!response.ok) {
      console.error(`Erro ao buscar badge ${badgeId}: ${response.status}`)
      
      // Se API falhar, tenta scraping como fallback
      return await scrapeBadgeData(badgeId)
    }

    const data = await response.json()
    
    // Verifica se retornou dados válidos
    if (!data || !data.data) {
      return await scrapeBadgeData(badgeId)
    }

    return NextResponse.json(data.data as CredlyBadgeData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      }
    })

  } catch (error) {
    console.error(`Erro ao processar badge ${badgeId}:`, error)
    
    // Fallback para scraping
    return await scrapeBadgeData(badgeId)
  }
}

/**
 * Fallback: Extrai dados via scraping de meta tags
 */
async function scrapeBadgeData(badgeId: string) {
  try {
    const pageUrl = `https://www.credly.com/badges/${badgeId}`
    const response = await fetch(pageUrl, {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const html = await response.text()
    
    // Extrai meta tags Open Graph
    const getMetaContent = (property: string): string => {
      const regex = new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i')
      const match = html.match(regex)
      return match ? match[1] : ''
    }

    const title = getMetaContent('og:title')
    const description = getMetaContent('og:description')
    const image = getMetaContent('og:image')
    
    // Extrai informações do título (formato: "Badge Name was issued by Issuer to Recipient")
    const titleParts = title.split(' was issued by ')
    const badgeName = titleParts[0]?.trim() || 'Badge do Credly'
    const issuerPart = titleParts[1]?.split(' to ')[0]?.trim() || 'Credly'

    // Monta dados básicos extraídos
    const scrapedData: Partial<CredlyBadgeData> = {
      id: badgeId,
      name: badgeName,
      description: description || 'Certificação profissional',
      image_url: image || '',
      issuer: {
        name: issuerPart,
        url: 'https://www.credly.com'
      },
      issued_at: new Date().toISOString(), // Não temos a data exata
      state: 'accepted',
      public: true,
      badge_url: pageUrl,
      share_url: pageUrl
    }

    return NextResponse.json(scrapedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Data-Source': 'scraped' // Indica que veio do scraping
      }
    })

  } catch (error) {
    console.error(`Erro ao fazer scraping do badge ${badgeId}:`, error)
    
    return NextResponse.json(
      { 
        error: 'Não foi possível carregar o badge',
        badgeId 
      },
      { status: 500 }
    )
  }
}
