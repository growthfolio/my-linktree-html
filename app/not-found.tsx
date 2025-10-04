import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Página não encontrada</h2>
        <Link href="/" className="px-4 py-2 bg-[var(--brand)] text-black rounded-lg">
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}