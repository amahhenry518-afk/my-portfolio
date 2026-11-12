import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useTheme from '../hooks/useTheme'

const accents = ['kelly', 'leaf', 'flame', 'bloom', 'gold', 'spectrum']
const dots = {
  kelly: 'linear-gradient(135deg,#22D3EE,#2563EB,#7C3AED)', leaf: 'linear-gradient(135deg,#6EE7B7,#10B981,#14B8A6)',
  flame: 'linear-gradient(135deg,#FBBF24,#F97316,#EF4444)', bloom: 'linear-gradient(135deg,#F9A8D4,#EC4899,#A855F7)',
  gold: 'linear-gradient(135deg,#FDE047,#FACC15,#F59E0B)', spectrum: 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)',
}

export default function ThemeControl() {
  const { t } = useTranslation()
  const { mode, accent, setMode, setAccent } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const out = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', out); document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', out); document.removeEventListener('keydown', esc) }
  }, [])
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={`${t('theme.accent')} / ${t('theme.mode')}`}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:bg-panel">
        <span className="h-5 w-5 rounded-full" style={{ background: dots[accent] }} />
      </button>
      {open && (
        <div className="glass absolute end-0 mt-2 w-60 p-4 shadow-xl">
          <p className="mb-2 text-xs text-mute">{t('theme.mode')}</p>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {['dark', 'light'].map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)} aria-pressed={mode === m}
                className={`h-10 rounded-lg border text-sm ${mode === m ? 'grad-bg border-transparent' : 'border-line'}`}>{t(`theme.${m}`)}</button>
            ))}
          </div>
          <p className="mb-2 text-xs text-mute">{t('theme.accent')}</p>
          <div className="grid grid-cols-3 gap-2">
            {accents.map((a) => (
              <button key={a} type="button" onClick={() => setAccent(a)} aria-pressed={accent === a}
                className={`flex h-11 flex-col items-center justify-center gap-1 rounded-lg border text-[11px] ${accent === a ? 'border-link' : 'border-line'}`}>
                <span className="h-4 w-4 rounded-full" style={{ background: dots[a] }} />{t(`theme.${a}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
