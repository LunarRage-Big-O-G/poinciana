import { Suspense } from 'react'
import { Link, Outlet, useRouterState } from '@tanstack/react-router'

const SOCIAL = {
  instagram: 'https://www.instagram.com/poinciana/',
  facebook: 'https://www.facebook.com/',
} as const

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function RouteFallback() {
  return (
    <div className="route-fallback" role="status">
      Loading…
    </div>
  )
}

export function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHome = pathname === '/'

  return (
    <div className={`app-shell${isHome ? ' app-shell--home' : ''}`}>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Poinciana home">
          <span className="brand-mark" aria-hidden="true" />
          Poinciana
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link to="/properties" className="nav-link">
            Properties
          </Link>
          <Link to="/experiences" className="nav-link">
            Experiences
          </Link>
        </nav>
        <button type="button" className="btn-login">
          Login
        </button>
      </header>
      <main className="site-main">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className={`site-footer${isHome ? ' site-footer--home' : ''}`}>
        <div className="site-footer-inner">
          <div className="site-footer-top">
            <div className="site-footer-col site-footer-col--brand">
              <p className="site-footer-brand">Poinciana</p>
              <p className="site-footer-tagline">
                Private stays and curated experiences across Jamaica—book with
                confidence from anywhere in the world.
              </p>
            </div>
            <div className="site-footer-col">
              <p className="site-footer-heading">Explore</p>
              <ul className="site-footer-links">
                <li>
                  <Link to="/properties">All properties</Link>
                </li>
                <li>
                  <Link to="/experiences">All experiences</Link>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </div>
            <div className="site-footer-col">
              <p className="site-footer-heading">Contact</p>
              <ul className="site-footer-links">
                <li>
                  <a href="mailto:hello@poinciana.com">hello@poinciana.com</a>
                </li>
                <li>
                  <span className="site-footer-static">Guest support · 7 days a week</span>
                </li>
                <li>
                  <span className="site-footer-static">Based in Jamaica · USD pricing</span>
                </li>
              </ul>
            </div>
            <div className="site-footer-col site-footer-col--social">
              <p className="site-footer-heading">Follow</p>
              <ul className="site-footer-social">
                <li>
                  <a
                    href={SOCIAL.instagram}
                    className="site-footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL.facebook}
                    className="site-footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon />
                    <span>Facebook</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="site-footer-bottom">
            {isHome && (
              <p className="site-footer-trust">
                Vetted homes · Secure checkout · Guest support · Prices in USD
              </p>
            )}
            <p className="site-footer-copy">
              © {new Date().getFullYear()} Poinciana. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
