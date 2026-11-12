import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Footer from './components/Footer'
import useCursorGlow from './hooks/useCursorGlow'
import useSmoothAnchors from './hooks/useSmoothAnchors'

export default function App() {
  const { t, i18n } = useTranslation()
  useCursorGlow()
  useSmoothAnchors()

  // English meta lives in index.html; override only for other languages.
  useEffect(() => {
    if (i18n.resolvedLanguage === 'en') return
    document.title = t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
  }, [i18n.resolvedLanguage, t])

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Certificates />
      </main>
      <div className="relative z-10"><Footer /></div>
    </>
  )
}
