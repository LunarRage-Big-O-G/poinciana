import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, notFound, useParams } from '@tanstack/react-router'
import { PropertySplineViewer } from '../components/PropertySplineViewer'
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

      <PropertySplineViewer
        sceneUrl={property.splineSceneUrl}
        title={property.name}
      />

      <section className="booking-cta">
        <h2>Ready to book?</h2>
        <p>
          This demo focuses on the 3D experience. Wire your checkout or inquiry
          form here, or connect to your booking engine API.
        </p>
        <button type="button" className="btn-primary" disabled>
          Request dates (connect API)
        </button>
      </section>
    </div>
  )
}
