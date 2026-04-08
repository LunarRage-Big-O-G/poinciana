import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { propertyListQueryOptions } from '../lib/propertyQueries'

export function HomePage() {
  const { data: properties } = useSuspenseQuery(propertyListQueryOptions())

  return (
    <div className="page-home">
      <section className="hero-block">
        <h1>Find your next stay</h1>
        <p className="lede">
          Browse curated homes, open a listing for photos and details, then book
          when you connect your backend.
        </p>
      </section>

      <ul className="property-grid">
        {properties.map((p) => (
          <li key={p.id}>
            <article className="property-card">
              <div className="property-card-thumb">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  width={400}
                  height={225}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="property-card-body">
                <h2>{p.name}</h2>
                <p className="property-tagline">{p.tagline}</p>
                <p className="property-meta">
                  {p.location} · {p.bedrooms} bed · {p.baths} bath
                </p>
                <p className="property-rate">
                  from <strong>${p.nightlyRate}</strong> / night
                </p>
                <Link
                  to="/property/$propertyId"
                  params={{ propertyId: p.id }}
                  className="btn-primary"
                >
                  View listing
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
