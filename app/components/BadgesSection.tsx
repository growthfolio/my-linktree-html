import BadgeCarousel from './BadgeCarousel'

interface BadgeData {
  id: string
  title: string
  date?: string
  level?: 'Associate' | 'Professional' | 'Specialty'
  featured?: boolean
}

const badges: BadgeData[] = [
  {
    id: '5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85',
    title: 'AWS Solutions Architect',
    date: 'Jan 2024',
    level: 'Professional',
    featured: true
  },
  {
    id: '3e0210b2-b5a7-42ed-8ba8-b099d35348ca',
    title: 'AWS Developer',
    date: 'Dez 2023',
    level: 'Associate'
  },
  {
    id: '7f62f225-3005-4043-b762-eb608f07636b',
    title: 'AWS SysOps Administrator',
    date: 'Nov 2023',
    level: 'Associate'
  },
  {
    id: '947a0b6f-ebd4-4089-9158-48dc187c5068',
    title: 'AWS Security',
    date: 'Out 2023',
    level: 'Specialty',
    featured: true
  },
  {
    id: '0ce03a22-0f7a-42a4-b12d-408ccf4441d9',
    title: 'AWS Machine Learning',
    date: 'Set 2023',
    level: 'Specialty'
  },
  {
    id: 'c1cb7ff3-a435-4f34-a046-dd5a1a885d09',
    title: 'AWS DevOps Engineer',
    date: 'Ago 2023',
    level: 'Professional'
  },
  {
    id: 'f61b26e5-f236-4f74-a963-90a7daa9d8c1',
    title: 'AWS Data Analytics',
    date: 'Jul 2023',
    level: 'Specialty'
  },
  {
    id: '1e2ca8f1-6abd-4487-979b-0d2d22077df4',
    title: 'AWS Advanced Networking',
    date: 'Jun 2023',
    level: 'Specialty'
  }
]

export default function BadgesSection() {
  return (
    <section className="mt-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">🏆 Certificações AWS</h2>
        <p className="text-sm text-[color:var(--muted)]">
          Certificações oficiais da Amazon Web Services
        </p>
      </div>
      
      {/* Badge Carousel */}
      <BadgeCarousel badges={badges} />
    </section>
  )
}