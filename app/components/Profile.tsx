import Image from 'next/image'
import { profileImageBase64 } from '@/app/lib/profile-image'

export default function Profile() {
  return (
    <section className="flex flex-col items-center text-center">
      {/* Foto de Perfil */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-[var(--brand)] ring-offset-4 ring-offset-[var(--background)]">
        <Image
          src={profileImageBase64}
          alt="Felipe Macedo"
          fill
          className="object-cover"
          priority
          sizes="128px"
        />
      </div>
      {/* Nome e Descrição */}
      <h1 className="mt-6 text-3xl font-bold tracking-tight">Felipe Macedo</h1>
      <p className="mt-2 max-w-md text-[color:var(--muted)]">
        Full Cycle Developer • AWS Certified •<br />
        Aspiring Computer Science Specialist
      </p>
    </section>
  )
}