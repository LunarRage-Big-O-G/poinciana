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
        <Link to="/properties" className="back-link">
          ← All properties
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
          Optional add-ons from vetted local partners. Open{' '}
          <strong>Full details</strong> for inclusions, guest notes, and
          cancellation wording—then add only what you want to this stay.
        </p>
        <ul className="extras-list">
          {experiences.map((e) => {
            const on = selectedIds.has(e.id)
            return (
              <li key={e.id}>
                <div className={`extra-block${on ? ' extra-block--on' : ''}`}>
                  <div className="extra-block-top">
                    <div className="extra-block-intro">
                      <p className="extra-block-category">{e.category}</p>
                      <h3 className="extra-block-name">{e.name}</h3>
                      <p className="extra-block-lead">{e.summary}</p>
                      <p className="extra-block-duration">{e.duration}</p>
                    </div>
                    <div className="extra-block-actions">
                      <p className="extra-block-price-line">
                        <span className="extra-block-price">+${e.priceUsd}</span>
                        <span className="extra-block-basis">{e.priceBasis}</span>
                      </p>
                      <button
                        type="button"
                        className={`btn-extra-toggle${on ? ' btn-extra-toggle--on' : ''}`}
                        onClick={() => toggleExperience(e.id)}
                        aria-pressed={on}
                      >
                        {on ? 'Added to stay' : 'Add to stay'}
                      </button>
                    </div>
                  </div>
                  <details className="extra-block-details">
                    <summary className="extra-block-details-summary">
                      Full details
                    </summary>
                    <div className="extra-block-details-body">
                      <section className="extra-detail-section">
                        <h4 className="extra-detail-heading">What’s included</h4>
                        <ul className="extra-detail-list">
                          {e.included.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </section>
                      <section className="extra-detail-section">
                        <h4 className="extra-detail-heading">Good to know</h4>
                        <ul className="extra-detail-list extra-detail-list--muted">
                          {e.goodToKnow.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </section>
                      <section className="extra-detail-section extra-detail-section--note">
                        <h4 className="extra-detail-heading">Cancellation</h4>
                        <p className="extra-detail-note">{e.cancellationNote}</p>
                      </section>
                    </div>
                  </details>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="booking-panel">
        <h2>Your booking</h2>
        <p className="booking-trust">
          This is an estimated total in USD for planning. Taxes, fees, and
          operator-specific terms are confirmed at secure checkout before any
          charge.
        </p>
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
