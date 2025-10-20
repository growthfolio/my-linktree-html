'use client'

import { Suspense } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import CredlyBadgeCard from './CredlyBadgeCard'
import type { BadgeDisplayData } from '@/types/credly'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface BadgeCarouselProps {
  badges: Array<BadgeDisplayData & { featured?: boolean }>
}

// Loading component
function CarouselSkeleton() {
  return (
    <div className="px-4">
      <div className="flex justify-center">
        <div className="w-72 h-80" style={{ backgroundColor: '#374151' }} />
      </div>
    </div>
  )
}

function BadgeCarouselContent({ badges }: BadgeCarouselProps) {
  return (
    <div className="px-4">
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          background: var(--brand);
          width: 12px;
          height: 12px;
        }
      `}</style>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 32,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 44,
            centeredSlides: false,
          },
        }}
        className="pb-16 !px-2"
      >
        {badges.map((badge) => (
          <SwiperSlide key={badge.id} className="flex justify-center px-2">
            <CredlyBadgeCard badge={badge} />
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