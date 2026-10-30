import { useState } from 'react'

// Foto a sangre con carga diferida. Si el archivo no existe, muestra el `alt` como marcador.
// `priority` es para la imagen de arriba del todo (se carga ya, sin lazy).
export default function Img({ src, alt, className = '', ratio, priority = false }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={'relative overflow-hidden bg-soft ' + className} style={{ aspectRatio: ratio }}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center p-4 text-center text-xs opacity-50">{alt}</div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  )
}
