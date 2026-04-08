import { Suspense } from 'react'
import { Link, Outlet } from '@tanstack/react-router'

function RouteFallback() {
  return (
    <div className="route-fallback" role="status">
      Loading…
    </div>
  )
}

export function RootLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Luxora home">
          <span className="brand-mark" aria-hidden="true" />
          Luxora
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link to="/" className="nav-link">
            Properties
          </Link>
          <Link to="/" hash="experiences" className="nav-link">
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
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Luxora. All rights reserved.</span>
      </footer>
    </div>
  )
}
