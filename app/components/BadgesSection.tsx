'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import CredlyBadge from './CredlyBadge'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const badges = [
  '5666c0c4-e3e8-41b5-afa8-f0e14ac3ae85',
  '3e0210b2-b5a7-42ed-8ba8-b099d35348ca',
  '7f62f225-3005-4043-b762-eb608f07636b',
  '947a0b6f-ebd4-4089-9158-48dc187c5068',
  '0ce03a22-0f7a-42a4-b12d-408ccf4441d9',
  'c1cb7ff3-a435-4f34-a046-dd5a1a885d09',
  'f61b26e5-f236-4f74-a963-90a7daa9d8c1',
  '1e2ca8f1-6abd-4487-979b-0d2d22077df4'
]

export default function BadgesSection() {
  return (
    <section className="mt-12">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-2">🏆 Certificações AWS</h2>
        <p className="text-sm text-[color:var(--muted)]">
          Certificações oficiais da Amazon Web Services
        </p>
      </div>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="badges-swiper"
      >
        {badges.map((badgeId) => (
          <SwiperSlide key={badgeId}>
            <div className="flex justify-center">
              <CredlyBadge badgeId={badgeId} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}