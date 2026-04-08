import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  urls: string[]
  variant: 'featured' | 'secondary'
  propertyName: string
  /** First slide loads eagerly (featured hero) */
  priority?: boolean
  /** Dark gradient over images (featured card text overlay) */
  featuredScrim?: boolean
}

export function PropertyCardGallery({
  urls,
  variant,
  propertyName,
  priority = false,
  featuredScrim = false,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const safeUrls = urls.length > 0 ? urls : ['']

  const scrollToIndex = useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    const w = el.clientWidth
    if (w === 0) return
    el.scrollTo({ left: i * w, behavior: 'smooth' })
    setActive(i)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || safeUrls.length <= 1) return

    const onScroll = () => {
      const w = el.clientWidth
      if (w === 0) return
      const idx = Math.round(el.scrollLeft / w)
      setActive(Math.min(Math.max(idx, 0), safeUrls.length - 1))
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [safeUrls.length])

  const rootClass = `property-card-gallery property-card-gallery--${variant}`

  if (safeUrls.length <= 1) {
    return (
      <div className={rootClass}>
        <div className="property-card-gallery-single">
          <img
            src={safeUrls[0]}
            alt=""
            width={1200}
            height={750}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            className="property-card-gallery-img"
            aria-hidden="true"
          />
        </div>
        {featuredScrim && (
          <span className="property-card-gallery-scrim" aria-hidden="true" />
        )}
      </div>
    )
  }

  return (
    <div className={rootClass}>
      <div
        ref={scrollRef}
        className="property-card-gallery-scroll"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${propertyName} photos`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            scrollToIndex(Math.max(0, active - 1))
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            scrollToIndex(Math.min(safeUrls.length - 1, active + 1))
          }
        }}
      >
        {safeUrls.map((url, i) => (
          <div key={`${url}-${i}`} className="property-card-gallery-slide">
            <img
              src={url}
              alt=""
              width={1200}
              height={750}
              loading={i === 0 && priority ? 'eager' : 'lazy'}
              fetchPriority={i === 0 && priority ? 'high' : undefined}
              decoding="async"
              className="property-card-gallery-img"
              draggable={false}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
      {featuredScrim && (
        <span className="property-card-gallery-scrim" aria-hidden="true" />
      )}
      <div
        className="property-card-gallery-dots"
        role="tablist"
        aria-label="Photos"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {safeUrls.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`Photo ${i + 1} of ${safeUrls.length}`}
            className={`property-card-gallery-dot${active === i ? ' property-card-gallery-dot--active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              scrollToIndex(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}
