export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <p className="hero-eyebrow">Stays &amp; curated experiences</p>
      <h1 id="hero-heading" className="hero-title">
        Haven
      </h1>
      <p className="hero-sub">
        Book a residence, then layer excursions and services into one itinerary.
      </p>
      <div className="hero-search" role="search" aria-label="Find a property">
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
  )
}
