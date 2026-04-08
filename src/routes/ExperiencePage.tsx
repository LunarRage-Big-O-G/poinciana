import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, notFound, useParams } from '@tanstack/react-router'
import { experienceByIdQueryOptions } from '../lib/propertyQueries'

export function ExperiencePage() {
  const { experienceId } = useParams({ from: '/experience/$experienceId' })
  const { data: experience } = useSuspenseQuery(
    experienceByIdQueryOptions(experienceId),
  )

  if (!experience) throw notFound()

  return (
    <div className="page-experience">
      <Link to="/experiences" className="back-link">
        ← All experiences
      </Link>

      <figure className="experience-page-hero">
        <img
          src={experience.imageUrl}
          alt={experience.imageAlt}
          className="experience-page-hero-img"
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
        />
        <figcaption className="experience-page-hero-caption">
          <p className="experience-page-eyebrow">{experience.category}</p>
          <h1 className="experience-page-title">{experience.name}</h1>
        </figcaption>
      </figure>

      <div className="experience-page-intro">
        <p className="experience-page-summary">{experience.summary}</p>
        <dl className="experience-page-meta">
          <div>
            <dt>Duration</dt>
            <dd>{experience.duration}</dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>
              ${experience.priceUsd}
              <span className="experience-page-basis"> · {experience.priceBasis}</span>
            </dd>
          </div>
        </dl>
      </div>

      <section className="experience-page-block">
        <h2 className="experience-page-block-title">What’s included</h2>
        <ul className="experience-page-list">
          {experience.included.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="experience-page-block">
        <h2 className="experience-page-block-title">Good to know</h2>
        <ul className="experience-page-list">
          {experience.goodToKnow.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="experience-page-block experience-page-block--note">
        <h2 className="experience-page-block-title">Cancellation</h2>
        <p className="experience-page-note">{experience.cancellationNote}</p>
      </section>

      <p className="experience-page-disclaimer">
        Prices are shown in USD. Final availability and operator terms are
        confirmed when you add this experience to a property booking.
      </p>

      <Link to="/properties" className="btn-primary experience-page-cta">
        Choose a property to book
      </Link>
    </div>
  )
}
