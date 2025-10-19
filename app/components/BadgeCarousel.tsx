'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { Suspense } from 'react'
import CredlyBadge from './CredlyBadge'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface BadgeData {
  id: string
  title: string
  date?: string
  level?: 'Associate' | 'Professional' | 'Specialty'
  featured?: boolean
}

interface BadgeCarouselProps {
  badges: BadgeData[]
}

// Loading component
function CarouselSkeleton() {
  return (
    <div className="px-4 pb-12">
      <div className="flex justify-center animate-pulse">
        <div className="w-72 h-80 rounded-xl" style={{ backgroundColor: '#374151' }} />
      </div>
    </div>
  )
}

function BadgeCarouselContent({ badges }: BadgeCarouselProps) {
  return (
    <div className="px-4">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        centeredSlides={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: false,
          },
        }}
        className="pb-12"
      >
        {badges.map((badge) => (
          <SwiperSlide key={badge.id} className="flex justify-center">
            <CredlyBadge 
              badgeId={badge.id}
              title={badge.title}
              date={badge.date}
              level={badge.level}
              featured={badge.featured}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default function BadgeCarousel({ badges }: BadgeCarouselProps) {
  return (
    <Suspense fallback={<CarouselSkeleton />}>
      <BadgeCarouselContent badges={badges} />
    </Suspense>
  )
}