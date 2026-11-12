import { useTranslation } from 'react-i18next'
import { site } from '../data/site'
import SmartImage from './SmartImage'

export default function Hero() {
  const { t } = useTranslation()
  return (
    <section id="home" className="relative mx-auto grid min-h-screen overflow-x-clip max-w-6xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 md:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="font-mono text-sm text-link">{t('hero.role')} · {t('hero.location')}</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-6xl">
          <span className="grad-text">{site.handle}</span>
        </h1>
        <p className="mt-2 font-display text-xl text-mute">{site.name}</p>
        <p className="mt-5 max-w-prose text-lg text-mute">{t('hero.tagline')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="grad-bg inline-flex h-12 items-center rounded-full px-6 font-display font-semibold">{t('hero.ctaProjects')}</a>
          <a href="#contact" className="inline-flex h-12 items-center rounded-full border border-line px-6 font-display font-semibold hover:bg-panel">{t('hero.ctaContact')}</a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {site.stack.map((s) => <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-mute">{s}</li>)}
        </ul>
      </div>
      <div className="relative mx-auto w-full max-w-sm">
        <svg viewBox="0 0 100 100" className="hex-ring absolute inset-0 h-full w-full" aria-hidden="true">
          <polygon points="50,2 94,26 94,74 50,98 6,74 6,26" fill="none" stroke="var(--a1)" strokeWidth="0.6" strokeDasharray="3 3" />
        </svg>
        <div className="hex p-[6%]"><div className="hex grad-bg p-[1.5%]">
          <SmartImage src={site.profileImage} alt={t('hero.photoAlt', { alt: site.handle })} eager ratio="1 / 1" className="hex" />
        </div></div>
      </div>
    </section>
  )
}
