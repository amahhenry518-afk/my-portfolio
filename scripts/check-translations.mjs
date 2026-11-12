// Usage: npm run i18n:check            (coverage for every language)
//        npm run i18n:check -- yo      (missing/unknown keys for one language)
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dir = new URL('../public/locales/', import.meta.url).pathname
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) =>
  v && typeof v === 'object' && !Array.isArray(v) ? flat(v, p + k + '.') : [p + k])
const load = (c) => JSON.parse(readFileSync(join(dir, c, 'translation.json'), 'utf8'))

const en = [...new Set(flat(load('en')).map((k) => k.replace(/_(one|other|zero|two|few|many)$/, '')))]
const only = process.argv[2]
const codes = only ? [only] : readdirSync(dir).filter((c) => existsSync(join(dir, c, 'translation.json')))

for (const c of codes) {
  let data
  try { data = load(c) } catch { console.log(`${c}: INVALID JSON`); continue }
  const keys = [...new Set(flat(data).map((k) => k.replace(/_(one|other|zero|two|few|many)$/, '')))]
  const missing = en.filter((k) => !keys.includes(k))
  const unknown = keys.filter((k) => !en.includes(k))
  if (only) {
    console.log(`Missing (${missing.length}):`); missing.forEach((k) => console.log('  ' + k))
    console.log(`Unknown (${unknown.length}):`); unknown.forEach((k) => console.log('  ' + k))
  } else {
    console.log(`${c.padEnd(6)} ${String(Math.round(((en.length - missing.length) / en.length) * 100)).padStart(3)}%  keys: ${keys.length}/${en.length}`)
  }
}
