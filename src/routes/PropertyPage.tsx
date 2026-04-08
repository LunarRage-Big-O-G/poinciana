import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, notFound, useParams } from '@tanstack/react-router'
import { propertyByIdQueryOptions } from '../lib/propertyQueries'

export function PropertyPage() {
  const { propertyId } = useParams({ from: '/property/$propertyId' })
  const { data: property } = useSuspenseQuery(
    propertyByIdQueryOptions(propertyId),
  )

  if (!property) throw notFound()

  return (
    <div className="page-property">
      <div className="property-detail-header">
        <Link to="/" className="back-link">
          ← All listings
        </Link>
        <h1>{property.name}</h1>
        <p className="property-tagline">{property.tagline}</p>
        <p className="property-meta">
          {property.location} · {property.bedrooms} bed · {property.baths} bath
          · <strong>${property.nightlyRate}</strong> / night
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
        <h2>About this stay</h2>
        <p>{property.description}</p>
      </section>

      <section className="booking-cta">
        <h2>Ready to book?</h2>
        <p>
          Connect your availability API or embed your checkout flow here when you
          are ready to go live.
        </p>
        <button type="button" className="btn-primary" disabled>
          Request dates (connect API)
        </button>
      </section>
    </div>
  )
}
