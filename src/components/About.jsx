import { useTranslation } from 'react-i18next'
import { site } from '../data/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <SectionHeading id="about-title" title={t('about.title')} />
        <p className="max-w-prose text-lg">{t('about.bio')}</p>
      </Reveal>
      <Reveal className="mt-10 grid gap-4 md:grid-cols-3">
        {['build', 'business', 'ship'].map((k) => (
          <div key={k} className="glass p-5">
            <h3 className="font-display text-lg font-semibold">{t(`about.focus.${k}.title`)}</h3>
            <p className="mt-2 text-sm text-mute">{t(`about.focus.${k}.text`)}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-12">
        <h3 className="mb-4 font-display text-xl font-semibold">{t('about.stackTitle')}</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {site.stackGroups.map((g) => (
            <div key={g.id} className="glass p-5">
              <h4 className="mb-3 font-display text-sm text-link">{t(`about.groups.${g.id}`)}</h4>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((i) => <li key={i} className="rounded-full border border-line px-3 py-1 font-mono text-xs">{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
