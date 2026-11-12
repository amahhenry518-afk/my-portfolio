import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { certificates } from '../data/certificates'
import SmartImage from './SmartImage'
import Lightbox from './Lightbox'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Certificates() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(null)
  if (!certificates.length) return null // section is hidden until you add real certificates

  const sorted = [...certificates].sort((a, b) => b.issued.localeCompare(a.issued))
  const fmt = (d) => new Intl.DateTimeFormat(i18n.resolvedLanguage, { year: 'numeric', month: 'long' }).format(new Date(d))
  const images = sorted.map((c) => ({ src: c.image, alt: `${c.title}, ${c.issuer}` }))

  return (
    <section id="certificates" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading title={t('certificates.title')} />
      <div className="grid gap-6 sm:grid-cols-2">
        {sorted.map((c, i) => (
          <Reveal as="article" key={c.id} className="glass overflow-hidden">
            <SmartImage src={c.image} alt={images[i].alt} onClick={() => setOpen(i)} />
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold">{c.title}</h3>
              <p className="text-sm text-mute">{c.issuer} · {t('certificates.issued', { date: fmt(c.issued) })}</p>
              <p className="mt-2 text-sm">{t(`certificates.items.${c.id}.description`, { defaultValue: c.description })}</p>
              {c.credentialId && <p dir="ltr" className="mt-2 font-mono text-xs text-mute">{t('certificates.credential', { id: c.credentialId })}</p>}
            </div>
          </Reveal>
        ))}
      </div>
      {open !== null && <Lightbox images={images} index={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
