import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="page-not-found">
      <h1>Listing not found</h1>
      <p>That property ID does not exist in our catalog.</p>
      <Link to="/" className="btn-primary">
        Back to listings
      </Link>
    </div>
  )
}
