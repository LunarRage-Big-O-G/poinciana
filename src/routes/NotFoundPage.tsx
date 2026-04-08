import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="page-not-found">
      <h1>Not found</h1>
      <p>This property is not in the catalog.</p>
      <Link to="/properties" className="btn-primary">
        View properties
      </Link>
    </div>
  )
}
