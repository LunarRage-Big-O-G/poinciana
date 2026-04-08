import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { PropertyCardGallery } from '../components/home/PropertyCardGallery'
import { propertyListQueryOptions } from '../lib/propertyQueries'

export function PropertiesListPage() {
  const { data: properties } = useSuspenseQuery(propertyListQueryOptions())

  return (
    <div className="page-list page-list--properties">
      <Link to="/" className="back-link">
        ← Home
      </Link>
      <header className="page-list-head">
        <p className="page-list-eyebrow">Stays</p>
        <h1 className="page-list-title">All residences</h1>
        <p className="page-list-lede">
          Every home is vetted for accuracy and quality. Open a listing for the
          full description, gallery, and optional experiences at checkout.
        </p>
      </header>

      <ul className="property-list-grid">
        {properties.map((p) => (
          <li key={p.id}>
            <article className="property-card property-card--epic-secondary property-card--list">
              <div className="property-card-thumb property-card-thumb--epic">
                <PropertyCardGallery
                  urls={p.galleryUrls}
                  variant="secondary"
                  propertyName={p.name}
                />
              </div>
              <Link
                to="/property/$propertyId"
                params={{ propertyId: p.id }}
                className="property-card-link property-card-link--epic-body"
              >
                <div className="property-card-body property-card-body--epic">
                  <p className="property-location property-location--epic">{p.location}</p>
                  <h2 className="property-card-title property-card-title--epic">{p.name}</h2>
                  <p className="property-tagline property-tagline--epic">{p.tagline}</p>
                  <p className="property-card-meta-epic">
                    {p.bedrooms} bed · {p.baths} bath · from ${p.nightlyRate}
                    <span className="property-per-night"> / night</span>
                  </p>
                  <span className="property-card-ghost-cta">View stay</span>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
