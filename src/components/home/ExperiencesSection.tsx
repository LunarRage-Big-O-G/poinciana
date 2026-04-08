import { EXPERIENCES } from '../../data/experiences'

export function ExperiencesSection() {
  return (
    <section
      className="section-experiences"
      id="experiences"
      aria-labelledby="experiences-heading"
    >
      <h2 id="experiences-heading" className="section-title">
        Add to your stay
      </h2>
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
  )
}
