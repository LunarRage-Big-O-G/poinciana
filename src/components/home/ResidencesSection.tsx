import { Link } from '@tanstack/react-router'
import {
  HOME_PREVIEW_SECONDARY_PROPERTY_COUNT,
  type Property,
} from '../../data/properties'
import { PropertyCardGallery } from './PropertyCardGallery'

type Props = {
  properties: Property[]
}

export function ResidencesSection({ properties }: Props) {
  const featured = properties[0]
  const secondary = properties.slice(
    1,
    1 + HOME_PREVIEW_SECONDARY_PROPERTY_COUNT,
  )
  const moreStaysCount = Math.max(
    0,
    properties.length - 1 - secondary.length,
  )

  return (
    <section
      className="section-collection section-collection--epic"
      id="collection"
      aria-labelledby="residences-heading"
    >
      <header className="residences-epic-head">
        <p className="residences-epic-eyebrow">Stays</p>
        <h2 id="residences-heading" className="residences-epic-title">
          Where you’ll wake up
        </h2>
        <p className="residences-epic-lede">
          A spotlight stay plus a taste of the collection—explore every residence
          when you’re ready.
        </p>
      </header>

      {featured && (
        <div className="property-featured">
          <div className="property-featured-media">
            <PropertyCardGallery
              urls={featured.galleryUrls}
              variant="featured"
              propertyName={featured.name}
              priority
              featuredScrim
            />
          </div>
          <Link
            to="/property/$propertyId"
            params={{ propertyId: featured.id }}
            className="property-featured-copy"
            aria-labelledby="property-featured-title"
          >
            <span className="property-featured-location">{featured.location}</span>
            <span className="property-featured-name" id="property-featured-title">
              {featured.name}
            </span>
            <span className="property-featured-tagline">{featured.tagline}</span>
            <span className="property-featured-row">
              <span className="property-featured-meta">
                {featured.bedrooms} bedrooms · {featured.baths} baths · from $
                {featured.nightlyRate}
                <span className="property-featured-per"> / night</span>
              </span>
              <span className="property-featured-cta">Explore this stay</span>
            </span>
          </Link>
        </div>
      )}

      {secondary.length > 0 && (
        <ul className="property-grid-epic-secondary">
          {secondary.map((p) => (
            <li key={p.id}>
              <article className="property-card property-card--epic-secondary">
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
                    <h3 className="property-card-title property-card-title--epic">
                      {p.name}
                    </h3>
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
      )}

      {moreStaysCount > 0 && (
        <div className="section-explore-more section-explore-more--properties">
          <p className="section-explore-more-text">
            {moreStaysCount} more residence{moreStaysCount > 1 ? 's' : ''} across the
            island.
          </p>
          <Link to="/properties" className="section-explore-more-link">
            View all properties
          </Link>
        </div>
      )}
    </section>
  )
}
