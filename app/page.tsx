import Header from './components/Header'
import Profile from './components/Profile'
import SocialLinks from './components/SocialLinks'
import BadgesSection from './components/BadgesSection'

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-[var(--surface)] focus:text-[var(--text)] focus:px-3 focus:py-2 focus:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2">Pular para conteúdo</a>
      
      <Header />
      
      <a href="https://felipemacedo1.github.io/" target="_blank" rel="noopener noreferrer" className="group fixed bottom-6 left-6 z-30" aria-label="Visitar Terminal Portfolio">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-black/90 border-2 border-[color:var(--brand)] shadow-[0_8px_24px_rgba(255,153,0,.35)] grid place-items-center transition-transform duration-300 group-hover:scale-110">
            <i className="ph-bold ph-terminal text-2xl text-[color:var(--brand)] animate-pulse"></i>
          </div>
          <div className="pointer-events-none absolute top-[60%] -translate-y-1/2 left-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[color:var(--brand)] text-sm font-mono bg-black px-3 py-2 rounded-md border border-[color:var(--brand)] shadow-lg whitespace-nowrap">
            💻 Terminal Portfolio — ~/felipe-macedo
            <span className="absolute top-1/2 -translate-y-1/2 -left-2 border-y-8 border-y-transparent border-r-8 border-r-[color:var(--brand)]"></span>
          </div>
        </div>
      </a>

      <main id="conteudo" className="relative mx-auto max-w-2xl px-4 pt-24 pb-14">
        <Profile />
        <SocialLinks />
        <BadgesSection />
        
        <section className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-[color:var(--muted)]">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[color:var(--success)]"></span><span>Online</span></div>
          <div className="flex items-center gap-2"><i className="ph-bold ph-map-pin text-sm"></i><span>São Paulo, BR</span></div>
        </section>

        <footer className="mt-10 text-center text-xs text-[color:var(--muted)]">
          <p>© 2024 Felipe Macedo • Desenvolvedor Full-Stack</p>
          <p className="mt-1 opacity-80">Ctrl+C para copiar link</p>
        </footer>
      </main>
      
      <div id="toast-root" className="fixed top-4 left-1/2 -translate-x-1/2 z-50" aria-live="polite" aria-atomic="true"></div>
    </>
  )
}