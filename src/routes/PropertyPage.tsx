import { useMemo, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, notFound, useParams } from '@tanstack/react-router'
import {
  experienceListQueryOptions,
  propertyByIdQueryOptions,
} from '../lib/propertyQueries'

export function PropertyPage() {
  const { propertyId } = useParams({ from: '/property/$propertyId' })
  const { data: property } = useSuspenseQuery(
    propertyByIdQueryOptions(propertyId),
  )
  const { data: experiences } = useSuspenseQuery(experienceListQueryOptions())

  const [nights, setNights] = useState(3)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

  if (!property) throw notFound()

  const toggleExperience = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const { staySubtotal, extrasSubtotal, total } = useMemo(() => {
    const stay = property.nightlyRate * nights
    const extras = experiences
      .filter((e) => selectedIds.has(e.id))
      .reduce((s, e) => s + e.priceUsd, 0)
    return { staySubtotal: stay, extrasSubtotal: extras, total: stay + extras }
  }, [experiences, nights, property.nightlyRate, selectedIds])

  return (
    <div className="page-property">
      <div className="property-detail-header">
        <Link to="/" hash="collection" className="back-link">
          ← Properties
        </Link>
        <p className="property-location property-location-loud">{property.location}</p>
        <h1>{property.name}</h1>
        <p className="property-tagline">{property.tagline}</p>
        <p className="property-meta">
          {property.bedrooms} bedrooms · {property.baths} baths · from{' '}
          <strong>${property.nightlyRate}</strong> / night
        </p>
      </div>

      <figure className="property-media">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="property-image"
          width={1200}
          height={675}
          loading="eager"
          decoding="async"
        />
      </figure>

      <section className="property-about">
        <h2>About</h2>
        <p>{property.description}</p>
      </section>

      <section className="extras-section">
        <h2>Add experiences</h2>
        <p className="section-lede tight">
          Select optional add-ons to include with this stay. Final confirmation
          connects to your booking system.
        </p>
        <ul className="extras-list">
          {experiences.map((e) => {
            const on = selectedIds.has(e.id)
            return (
              <li key={e.id}>
                <button
                  type="button"
                  className={`extra-card${on ? ' extra-card--on' : ''}`}
                  onClick={() => toggleExperience(e.id)}
                  aria-pressed={on}
                >
                  <span className="extra-card-main">
                    <span className="extra-card-name">{e.name}</span>
                    <span className="extra-card-summary">{e.summary}</span>
                  </span>
                  <span className="extra-card-price">+${e.priceUsd}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="booking-panel">
        <h2>Your booking</h2>
        <div className="booking-row">
          <label className="booking-label" htmlFor="nights">
            Nights
          </label>
          <input
            id="nights"
            className="booking-nights"
            type="number"
            min={1}
            max={30}
            value={nights}
            onChange={(ev) =>
              setNights(Math.min(30, Math.max(1, Number(ev.target.value) || 1)))
            }
          />
        </div>
        <dl className="booking-breakdown">
          <div className="booking-line">
            <dt>Stay ({nights} nights)</dt>
            <dd>${staySubtotal.toLocaleString()}</dd>
          </div>
          {extrasSubtotal > 0 && (
            <div className="booking-line">
              <dt>Experiences</dt>
              <dd>${extrasSubtotal.toLocaleString()}</dd>
            </div>
          )}
          <div className="booking-line booking-line-total">
            <dt>Estimated total</dt>
            <dd>${total.toLocaleString()}</dd>
          </div>
        </dl>
        <button type="button" className="btn-primary booking-submit" disabled>
          Continue to checkout
        </button>
      </section>
    </div>
  )
}
