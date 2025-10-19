const links = [
  {
    href: 'https://github.com/felipemacedo1',
    icon: 'ph-duotone ph-github-logo',
    title: 'GitHub',
    description: 'Projetos e código'
  },
  {
    href: 'https://www.linkedin.com/in/felipemacedo1',
    icon: 'ph-duotone ph-linkedin-logo',
    title: 'LinkedIn',
    description: 'Rede profissional'
  },
  {
    href: 'https://github.com/growthfolio',
    icon: 'ph-bold ph-folder',
    title: 'Portfolio Acadêmico',
    description: 'Projetos universitários'
  },
  {
    href: 'mailto:contato.dev.macedo@gmail.com',
    icon: 'ph-duotone ph-envelope',
    title: 'E-mail',
    description: 'contato.dev.macedo@gmail.com'
  },
  {
    href: 'https://wa.me/5511997534105',
    icon: 'ph-duotone ph-whatsapp-logo',
    title: 'WhatsApp',
    description: 'Chat rápido'
  }
]

export default function SocialLinks() {
  return (
    <nav className="mt-8 grid gap-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-card flex items-center gap-4 bg-[var(--surface)] hover:bg-[var(--surface-2)] transition p-4"
        >
          <i className={`${link.icon} text-2xl`}></i>
          <div className="text-left">
            <span className="font-semibold">{link.title}</span>
            <span className="block text-sm text-[color:var(--muted)]">{link.description}</span>
          </div>
        </a>
      ))}
    </nav>
  )
}