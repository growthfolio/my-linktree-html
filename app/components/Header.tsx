import ThemeToggle from './ThemeToggle'
import ShareButton from './ShareButton'

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-2xl px-4 py-3 flex items-center justify-end gap-2">
        <ShareButton />
        <ThemeToggle />
      </div>
    </header>
  )
}