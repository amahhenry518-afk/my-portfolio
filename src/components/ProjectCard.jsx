import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SmartImage from './SmartImage'
import Lightbox from './Lightbox'
import Reveal from './Reveal'

const tag = { flagship: 'grad-bg', live: 'border border-link text-link', wip: 'border border-line text-mute' }

export default function ProjectCard({ project }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(null)
  const captions = t(`projects.items.${project.id}.captions`, { returnObjects: true })
  const cap = (i) => (Array.isArray(captions) && captions[i]) || `${project.title} ${i + 1}`
  const images = project.images.map((src, i) => ({ src, alt: `${project.title}: ${cap(i)}` }))
  const lead = images.slice(0, 2)
  const extra = images.length - lead.length

  return (
    <Reveal as="article" className="glass overflow-hidden">
      <div className="grid gap-px sm:grid-cols-2">
        {lead.map((im, i) => <SmartImage key={im.src} src={im.src} alt={im.alt} onClick={() => setOpen(i)} />)}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
          <span className={`rounded-full px-3 py-1 text-xs ${tag[project.status]}`}>{t(`projects.status.${project.status}`)}</span>
          <span className="rounded-full border border-line px-3 py-1 text-xs text-mute">{t(`projects.scope.${project.scope}`)}</span>
        </div>
        <p className="mt-3 max-w-prose text-mute">{t(`projects.items.${project.id}.summary`)}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((x) => <li key={x} className="rounded-full border border-line px-3 py-1 font-mono text-xs">{x}</li>)}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.links.map((l) => (
            <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer"
              className={`inline-flex h-11 items-center rounded-full px-5 font-display text-sm font-semibold ${l.primary ? 'grad-bg' : 'border border-line hover:bg-ink'}`}>
              {t(`projects.links.${l.key}`)}<span className="sr-only"> ({t('common.opensNewTab')})</span>
            </a>
          ))}
          {extra > 0 && (
            <button type="button" onClick={() => setOpen(2)} className="h-11 rounded-full border border-line px-5 text-sm text-mute hover:bg-ink">
              {t('projects.moreImages', { count: extra })}
            </button>
          )}
        </div>
      </div>
      {open !== null && <Lightbox images={images} index={open} onClose={() => setOpen(null)} />}
    </Reveal>
  )
}
