import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeControl from './ThemeControl'
import { site } from '../data/site'
import { certificates } from '../data/certificates'

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('home')
  const [menu, setMenu] = useState(false)

  const items = [
    { id: 'about', label: t('nav.about') },
    { id: 'projects', label: t('nav.projects') },
    ...(certificates.length ? [{ id: 'certificates', label: t('nav.certificates') }] : []),
    { id: 'contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setScrolled(h.scrollTop > 8)
      setProgress(h.scrollHeight > h.clientHeight ? (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 : 0)
      let cur = 'home'
      for (const it of items) {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = it.id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificates.length])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors ${scrolled || menu ? 'glass !rounded-none border-x-0 border-t-0' : ''}`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:z-50 focus:rounded focus:bg-panel focus:px-3 focus:py-2">{t('nav.skip')}</a>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="#" className="flex items-center gap-2 font-display font-semibold" aria-label={`${site.handle}, ${t('nav.home')}`}>
          <Logo /> <span>{site.handle}</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} aria-current={active === it.id ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-sm hover:text-link ${active === it.id ? 'text-link' : 'text-mute'}`}>{it.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeControl />
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
            aria-label={t('nav.menu')} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            <span aria-hidden="true">{menu ? '×' : '☰'}</span>
          </button>
        </div>
      </nav>
      {menu && (
        <ul className="mx-auto max-w-6xl px-4 pb-4 md:hidden">
          {items.map((it) => (
            <li key={it.id}><a href={`#${it.id}`} onClick={() => setMenu(false)} className="block rounded-lg px-3 py-3 hover:bg-panel">{it.label}</a></li>
          ))}
        </ul>
      )}
      <div className="grad-bg h-0.5" style={{ width: `${progress}%` }} aria-hidden="true" />
    </header>
  )
}
