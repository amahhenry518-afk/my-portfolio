import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

export default function Lightbox({ images, index, onClose }) {
  const { t } = useTranslation()
  const [i, setI] = useState(index)
  const box = useRef(null)
  const touch = useRef(null)
  const n = images.length
  const go = (d) => setI((v) => (v + d + n) % n)

  useEffect(() => {
    const prev = document.activeElement
    const closeBtn = box.current?.querySelector('button')
    closeBtn?.focus()
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        const f = box.current.querySelectorAll('button')
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', key)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; prev?.focus() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { // preload neighbours
    [1, -1].forEach((d) => { const im = new Image(); im.src = images[(i + d + n) % n].src })
  }, [i, images, n])

  const cur = images[i]
  return createPortal(
    <div ref={box} role="dialog" aria-modal="true" aria-label={cur.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1) }}>
      <button type="button" onClick={onClose} aria-label={t('common.close')} className="absolute end-4 top-4 h-11 w-11 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20">×</button>
      {n > 1 && <button type="button" onClick={() => go(-1)} aria-label={t('common.previous')} className="absolute start-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20">‹</button>}
      <figure className="max-h-full max-w-5xl">
        <img src={cur.src} alt={cur.alt} className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain" />
        <figcaption className="mt-2 text-center text-sm text-white/80">{cur.alt}{n > 1 && ` (${t('common.imageCount', { from: i + 1, to: n })})`}</figcaption>
      </figure>
      {n > 1 && <button type="button" onClick={() => go(1)} aria-label={t('common.next')} className="absolute end-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20">›</button>}
    </div>,
    document.body
  )
}
