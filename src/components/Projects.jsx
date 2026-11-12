import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'

export default function Projects() {
  const { t } = useTranslation()
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading title={t('projects.title')} intro={t('projects.intro')} />
      <div className="grid gap-8">
        {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  )
}
