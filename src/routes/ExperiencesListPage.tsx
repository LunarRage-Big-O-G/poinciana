import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ExperienceHoverMedia } from '../components/experience/ExperienceHoverMedia'
import { experienceListQueryOptions } from '../lib/propertyQueries'
import type { Experience } from '../data/experiences'

function SpotlightLink({ spotlight }: { spotlight: Experience }) {
  const [hover, setHover] = useState(false)
  return (
    <Link
      to="/experience/$experienceId"
      params={{ experienceId: spotlight.id }}
      className="experience-list-spotlight"
      aria-labelledby={`exp-spotlight-title-${spotlight.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="experience-list-spotlight-visual">
        <ExperienceHoverMedia
          imageUrl={spotlight.imageUrl}
          hoverVideoUrl={spotlight.hoverVideoUrl}
          hovered={hover}
          variant="spotlight"
          priority
        />
        <span className="experience-list-spotlight-shine" aria-hidden="true" />
      </span>
      <span className="experience-list-spotlight-panel">
        <span className="experience-list-spotlight-label">Featured</span>
        <span className="experience-list-spotlight-category">{spotlight.category}</span>
        <span className="experience-list-spotlight-title" id={`exp-spotlight-title-${spotlight.id}`}>
          {spotlight.name}
        </span>
        <span className="experience-list-spotlight-teaser">{spotlight.teaser}</span>
        <span className="experience-list-spotlight-meta">
          <span className="experience-list-spotlight-price">
            From ${spotlight.priceUsd}
            <span className="experience-list-spotlight-basis"> · {spotlight.priceBasis}</span>
          </span>
          <span className="experience-list-spotlight-arrow" aria-hidden="true">
            View details →
          </span>
        </span>
      </span>
    </Link>
  )
}

function BentoCard({
  e,
  wide,
}: {
  e: Experience
  wide: boolean
}) {
  const [hover, setHover] = useState(false)
  return (
    <li
      className={`experience-list-bento-item${wide ? ' experience-list-bento-item--wide' : ''}`}
    >
      <Link
        to="/experience/$experienceId"
        params={{ experienceId: e.id }}
        className="experience-list-card experience-list-card--bento"
        aria-labelledby={`exp-list-title-${e.id}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span className="experience-list-media experience-list-media--bento">
          <ExperienceHoverMedia
            imageUrl={e.imageUrl}
            hoverVideoUrl={e.hoverVideoUrl}
            hovered={hover}
            variant="bento"
          />
          <span className="experience-list-scrim experience-list-scrim--bento" aria-hidden="true" />
          <span className="experience-list-pill">{e.category}</span>
        </span>
        <span className="experience-list-copy experience-list-copy--bento">
          <span className="experience-list-title" id={`exp-list-title-${e.id}`}>
            {e.name}
          </span>
          <span className="experience-list-teaser">{e.teaser}</span>
          <span className="experience-list-row">
            <span className="experience-list-price">From ${e.priceUsd}</span>
            <span className="experience-list-arrow" aria-hidden="true">
              →
            </span>
          </span>
        </span>
      </Link>
    </li>
  )
}

export function ExperiencesListPage() {
  const { data: experiences } = useSuspenseQuery(experienceListQueryOptions())
  const [spotlight, ...rest] = experiences

  return (
    <div className="page-list page-list--experiences">
      <Link to="/" className="back-link">
        ← Home
      </Link>
      <header className="page-list-head page-list-head--experiences">
        <p className="page-list-eyebrow">Experiences</p>
        <h1 className="page-list-title">Curated for your stay</h1>
        <p className="page-list-lede">
          Hand-picked with local operators—open any card for what’s included, guest
          notes, and cancellation before you add it to a booking.
        </p>
      </header>

      {spotlight && <SpotlightLink spotlight={spotlight} />}

      {rest.length > 0 && (
        <ul className="experience-list-bento" aria-label="More experiences">
          {rest.map((e, i) => (
            <BentoCard
              key={e.id}
              e={e}
              wide={i === rest.length - 1 && rest.length % 2 === 1}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
