'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Algo deu errado!</h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[var(--brand)] text-black rounded-lg"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}