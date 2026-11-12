import { useCallback, useState } from 'react'

const read = (k, d) => { try { return localStorage.getItem(k) || d } catch { return d } }
const write = (k, v) => { try { localStorage.setItem(k, v) } catch { /* ignore */ } }

export default function useTheme() {
  const root = document.documentElement
  const [mode, setModeState] = useState(root.getAttribute('data-mode') || read('kelly-mode', 'dark'))
  const [accent, setAccentState] = useState(root.getAttribute('data-accent') || read('kelly-accent', 'kelly'))

  const setMode = useCallback((m) => { root.setAttribute('data-mode', m); write('kelly-mode', m); setModeState(m) }, [root])
  const setAccent = useCallback((a) => { root.setAttribute('data-accent', a); write('kelly-accent', a); setAccentState(a) }, [root])
  return { mode, accent, setMode, setAccent }
}
