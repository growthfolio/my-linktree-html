import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Felipe Macedo | Desenvolvedor Full-Stack',
  description: 'Felipe Macedo - Desenvolvedor Web Full-Stack, entusiasta de finanças e economia. Conecte-se comigo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" data-theme="dark" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>" />
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
        <script async src="https://cdn.credly.com/assets/utilities/embed.js"></script>
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  )
}