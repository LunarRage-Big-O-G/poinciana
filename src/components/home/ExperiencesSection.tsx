import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ExperienceHoverMedia } from '../experience/ExperienceHoverMedia'
import { EXPERIENCES, HOME_PREVIEW_EXPERIENCE_COUNT } from '../../data/experiences'
import type { Experience } from '../../data/experiences'

function HomeLeadCard({ lead }: { lead: Experience }) {
  const [hover, setHover] = useState(false)
  return (
    <li className="experience-home-lead">
      <Link
        to="/experience/$experienceId"
        params={{ experienceId: lead.id }}
        className="experience-home-card experience-home-card--lead"
        aria-labelledby={`experience-home-title-${lead.id}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span className="experience-home-media experience-home-media--lead">
          <ExperienceHoverMedia
            imageUrl={lead.imageUrl}
            hoverVideoUrl={lead.hoverVideoUrl}
            hovered={hover}
            variant="lead"
            priority
          />
          <span className="experience-home-scrim" aria-hidden="true" />
        </span>
        <span className="experience-home-copy experience-home-copy--lead">
          <span className="experience-home-label">Featured</span>
          <span className="experience-home-category">{lead.category}</span>
          <span className="experience-home-title" id={`experience-home-title-${lead.id}`}>
            {lead.name}
          </span>
          <span className="experience-home-teaser">{lead.teaser}</span>
          <span className="experience-home-meta">
            <span>From ${lead.priceUsd}</span>
            <span className="experience-home-cta">View details →</span>
          </span>
        </span>
      </Link>
    </li>
  )
}

function HomeTileCard({ e }: { e: Experience }) {
  const [hover, setHover] = useState(false)
  return (
    <li className="experience-home-tile">
      <Link
        to="/experience/$experienceId"
        params={{ experienceId: e.id }}
        className="experience-home-card"
        aria-labelledby={`experience-home-title-${e.id}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span className="experience-home-media">
          <ExperienceHoverMedia
            imageUrl={e.imageUrl}
            hoverVideoUrl={e.hoverVideoUrl}
            hovered={hover}
            variant="tile"
          />
          <span className="experience-home-scrim" aria-hidden="true" />
        </span>
        <span className="experience-home-copy">
          <span className="experience-home-category">{e.category}</span>
          <span className="experience-home-title" id={`experience-home-title-${e.id}`}>
            {e.name}
          </span>
          <span className="experience-home-price">From ${e.priceUsd}</span>
        </span>
      </Link>
    </li>
  )
}

export function ExperiencesSection() {
  const preview = EXPERIENCES.slice(0, HOME_PREVIEW_EXPERIENCE_COUNT)
  const [lead, ...rest] = preview
  const moreCount = EXPERIENCES.length - preview.length

  return (
    <section
      className="section-experiences section-experiences--calm section-experiences--epic"
      id="experiences"
      aria-labelledby="experiences-heading"
    >
      <header className="section-experiences-calm-head section-experiences-epic-head">
        <p className="section-experiences-epic-eyebrow">While you’re here</p>
        <h2 id="experiences-heading" className="section-title-epic">
          The days around your stay
        </h2>
        <p className="section-lede-calm section-lede-epic">
          A few hand-picked moments—open one for details, or browse the full
          collection.
        </p>
      </header>

      <ul className="experience-home-layout" aria-label="Featured experiences">
        {lead && <HomeLeadCard lead={lead} />}
        {rest.map((e) => (
          <HomeTileCard key={e.id} e={e} />
        ))}
      </ul>

      {moreCount > 0 && (
        <div className="section-explore-more">
          <p className="section-explore-more-text">
            {moreCount} more experience{moreCount > 1 ? 's' : ''}—tastings, culture,
            and island time.
          </p>
          <Link to="/experiences" className="section-explore-more-link">
            View all experiences
          </Link>
        </div>
      )}
    </section>
  )
}
