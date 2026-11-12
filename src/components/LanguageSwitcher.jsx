import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../i18n/languages'

const PER_PAGE = 5

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const out = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', out); document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', out); document.removeEventListener('keydown', esc) }
  }, [])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return [...languages].sort((a, b) => a.name.localeCompare(b.name))
      .filter((l) => !s || l.name.toLowerCase().includes(s) || l.native.toLowerCase().includes(s))
  }, [q])

  if (languages.length < 2) return null // hidden until a second language is added

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const shown = list.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  const current = i18n.resolvedLanguage

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={t('lang.label')}
        className="h-10 rounded-full border border-line px-3 text-sm uppercase hover:bg-panel">{current}</button>
      {open && (
        <div className="glass absolute end-0 mt-2 w-64 p-3 shadow-xl">
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(0) }} placeholder={t('lang.search')} aria-label={t('lang.search')}
            className="mb-2 h-10 w-full rounded-lg border border-line bg-transparent px-3 text-sm" />
          <ul>
            {shown.length === 0 && <li className="p-2 text-sm text-mute">{t('lang.none')}</li>}
            {shown.map((l) => (
              <li key={l.code}>
                <button type="button" lang={l.code} onClick={() => { i18n.changeLanguage(l.code); setOpen(false) }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-sm hover:bg-ink ${current === l.code ? 'text-link' : ''}`}>
                  <span>{l.native}</span><span className="text-mute">{l.name}</span>
                </button>
              </li>
            ))}
          </ul>
          {pages > 1 && (
            <div className="mt-2 flex items-center justify-between text-xs text-mute">
              <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)} className="px-2 py-1 disabled:opacity-40">{t('lang.prev')}</button>
              <span>{t('lang.page', { from: page * PER_PAGE + 1, to: Math.min(list.length, (page + 1) * PER_PAGE), total: list.length })}</span>
              <button type="button" disabled={page >= pages - 1} onClick={() => setPage(page + 1)} className="px-2 py-1 disabled:opacity-40">{t('lang.next')}</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
