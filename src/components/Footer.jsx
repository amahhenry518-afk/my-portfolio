import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { site } from '../data/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const icons = {
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z',
  email: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.500L4.200 7H19.800L12 12.500zM4 9v8h16V9l-8 5.600L4 9z',
  whatsapp: 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.4-.2-2.600.7.700-2.500-.3-.4A8 8 0 0 1 12 4zm-3.200 3.500c-.3 0-.7.100-1 .500-.3.400-1 1-1 2.400s1 2.800 1.200 3c.1.200 2 3.100 4.900 4.300 2.400 1 2.900.8 3.400.7.600-.1 1.700-.7 1.900-1.400.2-.7.200-1.200.2-1.400-.1-.1-.3-.2-.7-.4l-1.800-.9c-.3-.1-.5-.1-.7.200l-.8 1c-.1.200-.3.200-.6.100-.3-.1-1.200-.4-2.300-1.400-.8-.8-1.400-1.700-1.500-2-.2-.3 0-.4.100-.6l.4-.5c.1-.2.200-.3.300-.5.100-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.5-.6-.5h-.5z',
}

function Tile({ href, label, icon, external = true }) {
  return (
    <a href={href} aria-label={label} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="hex grad-bg flex h-20 w-20 items-center justify-center transition-transform hover:scale-105">
      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d={icons[icon]} /></svg>
    </a>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const { email, github, facebook } = site.links
  const wa = /^\d{8,15}$/.test(site.whatsapp.number)
    ? `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}` : null

  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
  }

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading title={t('footer.title')} intro={t('footer.text')} />
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${email}`} dir="ltr" className="font-mono text-lg text-link underline-offset-4 hover:underline">{email}</a>
            <button type="button" onClick={copy} className="h-10 rounded-full border border-line px-4 text-sm hover:bg-panel" aria-live="polite">
              {copied ? t('footer.copied') : t('footer.copy')}
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Tile href={github} label="GitHub" icon="github" />
            <Tile href={facebook} label="Facebook" icon="facebook" />
            <Tile href={`mailto:${email}`} label="Email" icon="email" external={false} />
            {wa && <Tile href={wa} label="WhatsApp" icon="whatsapp" />}
          </div>
          <p className="mt-8 text-mute">{site.location}</p>
        </Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-mute">
          <p>© {new Date().getFullYear()} {site.name} ({site.handle}). {t('footer.rights')}</p>
          <a href="#" className="rounded-full border border-line px-4 py-2 hover:bg-panel">{t('footer.top')}</a>
        </div>
      </div>
    </footer>
  )
}
