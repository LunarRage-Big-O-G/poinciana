import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  notFound,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { RootLayout } from '../components/RootLayout'
import {
  experienceByIdQueryOptions,
  experienceListQueryOptions,
  propertyByIdQueryOptions,
  propertyListQueryOptions,
} from '../lib/propertyQueries'
import { ExperiencePage } from './ExperiencePage'
import { ExperiencesListPage } from './ExperiencesListPage'
import { HomePage } from './HomePage'
import { NotFoundPage } from './NotFoundPage'
import { PropertiesListPage } from './PropertiesListPage'
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

const experiencesListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/experiences',
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(experienceListQueryOptions())
  },
  component: ExperiencesListPage,
})

const propertiesListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/properties',
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(propertyListQueryOptions())
  },
  component: PropertiesListPage,
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

const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/experience/$experienceId',
  loader: async ({ context, params }) => {
    const exp = await context.queryClient.ensureQueryData(
      experienceByIdQueryOptions(params.experienceId),
    )
    if (!exp) throw notFound()
  },
  component: ExperiencePage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  experiencesListRoute,
  propertiesListRoute,
  propertyRoute,
  experienceRoute,
])

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
