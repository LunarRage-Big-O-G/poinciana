import { useEffect, useRef } from 'react'

type Props = {
  imageUrl: string
  /** MP4/WebM URL; plays on hover when set */
  hoverVideoUrl?: string
  hovered: boolean
  /** Match parent aspect (lead vs tile) */
  variant: 'lead' | 'tile' | 'spotlight' | 'bento'
  /** First image eager load */
  priority?: boolean
}

export function ExperienceHoverMedia({
  imageUrl,
  hoverVideoUrl,
  hovered,
  variant,
  priority = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v || !hoverVideoUrl) return
    if (hovered) {
      void v.play().catch(() => {
        /* autoplay policies — silent fail */
      })
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [hovered, hoverVideoUrl])

  const rootClass = `experience-hover-media experience-hover-media--${variant}${hovered && hoverVideoUrl ? ' experience-hover-media--playing' : ''}`

  return (
    <span className={rootClass} data-experience-hover-root>
      <img
        src={imageUrl}
        alt=""
        width={variant === 'lead' || variant === 'spotlight' ? 1200 : 640}
        height={variant === 'lead' || variant === 'spotlight' ? 675 : 800}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="experience-hover-img"
        draggable={false}
        aria-hidden="true"
      />
      {hoverVideoUrl ? (
        <video
          ref={videoRef}
          className="experience-hover-video"
          src={hoverVideoUrl}
          muted
          playsInline
          loop
          preload="metadata"
          aria-hidden="true"
        />
      ) : null}
    </span>
  )
}
