import { lazy, Suspense, useState } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

type Props = {
  sceneUrl: string
  title: string
}

export function PropertySplineViewer({ sceneUrl, title }: Props) {
  const [ready, setReady] = useState(false)

  return (
    <div className="spline-shell" aria-label={`3D tour: ${title}`}>
      {!ready && (
        <div className="spline-placeholder" role="status">
          Loading 3D scene…
        </div>
      )}
      <Suspense
        fallback={
          <div className="spline-placeholder" role="status">
            Preparing viewer…
          </div>
        }
      >
        <Spline
          scene={sceneUrl}
          className="spline-canvas"
          onLoad={() => setReady(true)}
        />
      </Suspense>
      <p className="spline-hint">
        Drag to orbit · Scroll to zoom — explore the space like in Spline
      </p>
    </div>
  )
}
