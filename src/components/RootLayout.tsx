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
        <Link to="/" className="brand">
          Poinciana
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link to="/" className="nav-link">
            Listings
          </Link>
        </nav>
      </header>
      <main className="site-main">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="site-footer">
        <span>Booking agency demo — TanStack Router &amp; Query + Spline</span>
      </footer>
    </div>
  )
}
