import { Link } from '@tanstack/react-router'
import type { Property } from '../../data/properties'

type Props = {
  properties: Property[]
}

export function ResidencesSection({ properties }: Props) {
  return (
    <section
      className="section-collection"
      id="collection"
      aria-labelledby="residences-heading"
    >
      <h2 id="residences-heading" className="section-title">
        Residences
      </h2>
      <ul className="property-grid">
        {properties.map((p) => (
          <li key={p.id}>
            <article className="property-card">
              <div className="property-card-thumb">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  width={400}
                  height={250}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="property-card-body">
                <p className="property-location">{p.location}</p>
                <h3 className="property-card-title">{p.name}</h3>
                <p className="property-tagline">{p.tagline}</p>
                <p className="property-meta">
                  {p.bedrooms} bedrooms · {p.baths} baths
                </p>
                <p className="property-rate">
                  <span className="property-rate-value">${p.nightlyRate}</span>
                  <span className="property-rate-unit"> / night</span>
                </p>
                <Link
                  to="/property/$propertyId"
                  params={{ propertyId: p.id }}
                  className="btn-text"
                >
                  View &amp; customize
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
