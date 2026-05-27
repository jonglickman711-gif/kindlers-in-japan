import { useState } from 'react'

function ImageWithFallback({ src, alt, title, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div className={`grid place-items-center bg-[linear-gradient(135deg,#12151b,#351b20_52%,#0b0d12)] p-6 text-center ${className}`}>
        <span className="font-serif text-2xl font-semibold leading-tight text-amber-50/85">
          {title}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

export default ImageWithFallback
