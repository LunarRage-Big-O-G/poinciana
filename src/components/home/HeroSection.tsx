function MapPinIcon() {
  return (
    <svg
      className="search-pin"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-8-4.5-8-11a8 8 0 0 1 16 0c0 6.5-8 11-8 11z" />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-top">
        <p className="hero-tagline-corner">
          Turning Dreams into Reality, One Property at a Time.
        </p>
      </div>

      <h1 id="hero-heading" className="hero-title">
        Haven
      </h1>

      <p className="hero-tagline-main">
        Buy, Rent, or Sell – Simplifying Your Real Estate Journey.
      </p>

      <div className="hero-search" role="search" aria-label="Find a property">
        <label className="search-field search-field--location">
          <span className="search-label-row">
            <MapPinIcon />
            <span className="search-label">Location</span>
          </span>
          <select className="search-input" defaultValue="">
            <option value="" disabled>
              Select Your City
            </option>
            <option>Ocho Rios</option>
            <option>Montego Bay</option>
            <option>Negril</option>
            <option>Kingston</option>
          </select>
        </label>

        <label className="search-field">
          <span className="search-label">Property type</span>
          <select className="search-input" defaultValue="">
            <option value="" disabled>
              Choose Property Type
            </option>
            <option>Villa</option>
            <option>Estate</option>
            <option>Beach house</option>
            <option>Penthouse</option>
          </select>
        </label>

        <label className="search-field">
          <span className="search-label">Price range</span>
          <select className="search-input" defaultValue="">
            <option value="" disabled>
              Choose Price Range
            </option>
            <option>Under $300 / night</option>
            <option>$300 – $500 / night</option>
            <option>$500 – $800 / night</option>
            <option>$800+ / night</option>
          </select>
        </label>

        <div className="hero-search-cta-wrap">
          <a href="#collection" className="btn-primary hero-search-cta">
            Browse Properties
          </a>
        </div>
      </div>
    </section>
  )
}
