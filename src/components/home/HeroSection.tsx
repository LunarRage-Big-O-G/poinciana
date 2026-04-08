import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { Link } from '@tanstack/react-router'
import type { Property } from '../../data/properties'

const SLIDE_INTERVAL_MS = 6500
const SLIDE_TRANSITION_MS = 700
const SWIPE_MIN_PX = 48

function MapPinIcon() {
  return (
    <svg
      className="search-pin"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-8-4.5-8-11a8 8 0 0 1 16 0c0 6.5-8 11-8 11z" />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

type Props = {
  properties: Property[]
}

export function HeroSection({ properties }: Props) {
  const slides: Property[] =
    properties.length > 0
      ? properties
      : [
          {
            id: 'fallback',
            name: 'Poinciana',
            tagline:
              'Private stays in Jamaica—slow mornings, clear water, and space to settle in.',
            description: '',
            location: 'Jamaica',
            nightlyRate: 0,
            bedrooms: 0,
            baths: 0,
            imageUrl:
              'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=2000&q=85',
            galleryUrls: [],
          },
        ]

  const n = slides.length
  const [index, setIndex] = useState(0)
  const [motionOk, setMotionOk] = useState(true)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const current = slides[index]!

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotionOk(!mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!motionOk || n < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [motionOk, n])

  const trackPct = (index / n) * 100

  const onTouchStart = (e: TouchEvent) => {
    if (n < 2) return
    const t = e.touches[0]
    touchStartX.current = t.clientX
    touchStartY.current = t.clientY
  }

  const onTouchEnd = (e: TouchEvent) => {
    if (n < 2 || touchStartX.current == null || touchStartY.current == null) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStartX.current
    const dy = t.clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) {
      setIndex((i) => (i + 1) % n)
    } else {
      setIndex((i) => (i - 1 + n) % n)
    }
  }

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div
        className="hero-slides"
        aria-hidden="true"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="hero-slides-track"
          style={{
            width: `${n * 100}%`,
            transform: `translateX(-${trackPct}%)`,
            transitionDuration: motionOk ? `${SLIDE_TRANSITION_MS}ms` : '0ms',
          }}
        >
          {slides.map((p, i) => (
            <div
              key={p.id}
              className="hero-slide"
              style={{ width: `${100 / n}%` }}
            >
              <img
                src={p.imageUrl}
                alt=""
                width={1920}
                height={1080}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="hero-atmosphere" aria-hidden="true" />

      <div className="hero-top">
        <p className="hero-brand-mark">Poinciana</p>
        <h1
          id="hero-heading"
          className={`hero-title${current.name.length > 18 ? ' hero-title--long' : ''}`}
        >
          {current.name}
        </h1>
        {n > 1 && (
          <div className="hero-slide-dots" role="tablist" aria-label="Featured stays">
            {slides.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${p.name}`}
                className={`hero-slide-dot${i === index ? ' hero-slide-dot--active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hero-spacer" aria-hidden="true" />

      <div className="hero-bottom">
        <p className="hero-tagline-main" aria-live="polite">
          {current.tagline}
        </p>

        <div className="hero-search" role="search" aria-label="Find a property">
          <label className="search-field search-field--location">
            <span className="search-label-row">
              <MapPinIcon />
              <span className="search-label">Location</span>
            </span>
            <select className="search-input" defaultValue="">
              <option value="" disabled>
                Select your city
              </option>
              <option>Ocho Rios</option>
              <option>Montego Bay</option>
              <option>Negril</option>
              <option>Kingston</option>
            </select>
          </label>

          <label className="search-field">
            <span className="search-label">Property type</span>
            <select className="search-input" defaultValue="">
              <option value="" disabled>
                Type
              </option>
              <option>Villa</option>
              <option>Estate</option>
              <option>Beach house</option>
              <option>Penthouse</option>
            </select>
          </label>

          <label className="search-field">
            <span className="search-label">Price</span>
            <select className="search-input" defaultValue="">
              <option value="" disabled>
                Per night
              </option>
              <option>Under $300 / night</option>
              <option>$300 – $500 / night</option>
              <option>$500 – $800 / night</option>
              <option>$800+ / night</option>
            </select>
          </label>

          <div className="hero-search-cta-wrap">
            <Link to="/properties" className="btn-primary hero-search-cta">
              Browse stays
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
