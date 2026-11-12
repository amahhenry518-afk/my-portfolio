import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function SmartImage({ src, alt, eager = false, className = '', ratio = '16 / 10', onClick }) {
  const { t } = useTranslation()
  const [state, setState] = useState('loading')
  const body = state === 'error' ? (
    <div role="img" aria-label={t('common.missingImage', { alt })} className="flex h-full w-full items-center justify-center bg-panel p-4 text-center text-sm text-mute">
      {alt}
    </div>
  ) : (
    <img
      src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async"
      onLoad={() => setState('ok')} onError={() => setState('error')}
      className={`h-full w-full object-cover transition-opacity duration-500 ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`}
    />
  )
  const Wrapper = onClick && state !== 'error' ? 'button' : 'div'
  return (
    <Wrapper type={Wrapper === 'button' ? 'button' : undefined} onClick={onClick}
      className={`relative block w-full overflow-hidden bg-panel ${className}`} style={{ aspectRatio: ratio }}>
      {body}
    </Wrapper>
  )
}
