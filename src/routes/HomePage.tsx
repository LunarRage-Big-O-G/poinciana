import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { EXPERIENCES } from '../data/experiences'
import { propertyListQueryOptions } from '../lib/propertyQueries'

export function HomePage() {
  const { data: properties } = useSuspenseQuery(propertyListQueryOptions())

  return (
    <div className="page-home">
      <section className="hero">
        <p className="hero-eyebrow">Stays &amp; curated experiences</p>
        <h1 className="hero-title">Haven</h1>
        <p className="hero-sub">
          Book a residence, then layer excursions and services into one
          itinerary.
        </p>
        <div className="hero-search" role="search">
          <label className="search-field">
            <span className="search-label">Location</span>
            <select className="search-input" defaultValue="">
              <option value="" disabled>
                Select area
              </option>
              <option>Ocho Rios</option>
              <option>Montego Bay</option>
              <option>Negril</option>
            </select>
          </label>
          <label className="search-field">
            <span className="search-label">Guests</span>
            <select className="search-input" defaultValue="2">
              <option>1</option>
              <option>2</option>
              <option>3–4</option>
              <option>5+</option>
            </select>
          </label>
          <a href="#collection" className="btn-primary hero-search-cta">
            Browse properties
          </a>
        </div>
      </section>

      <section className="section-experiences" id="experiences">
        <h2 className="section-title">Add to your stay</h2>
        <p className="section-lede">
          Optional experiences bundle with your booking—watersports, landmarks,
          and in-villa services.
        </p>
        <ul className="experience-chips">
          {EXPERIENCES.map((e) => (
            <li key={e.id}>
              <span className="experience-chip">
                <span className="experience-chip-name">{e.name}</span>
                <span className="experience-chip-price">from ${e.priceUsd}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-collection" id="collection">
        <h2 className="section-title">Residences</h2>
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
    </div>
  )
}
