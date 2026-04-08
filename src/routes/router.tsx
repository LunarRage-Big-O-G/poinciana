import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  notFound,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { RootLayout } from '../components/RootLayout'
import {
  experienceListQueryOptions,
  propertyByIdQueryOptions,
} from '../lib/propertyQueries'
import { HomePage } from './HomePage'
import { NotFoundPage } from './NotFoundPage'
import { PropertyPage } from './PropertyPage'

export type RouterContext = {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const propertyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/property/$propertyId',
  loader: async ({ context, params }) => {
    const property = await context.queryClient.ensureQueryData(
      propertyByIdQueryOptions(params.propertyId),
    )
    if (!property) throw notFound()
    await context.queryClient.ensureQueryData(experienceListQueryOptions())
  },
  component: PropertyPage,
})

const routeTree = rootRoute.addChildren([indexRoute, propertyRoute])

export function createAppRouter(queryClient: QueryClient) {
  return createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
