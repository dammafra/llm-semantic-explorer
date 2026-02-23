import { useMemo } from 'react'
import { CatmullRomCurve3, Vector3 } from 'three'

import { useChart } from '@stores'

import { CameraRig } from './CameraRig'
import { Path, type ParsedPath, type ParsedPoint } from './Path'
import { PlaybackManager } from './PlaybackManager'

const POINT_RADIUS = 0.05

export function Chart() {
  const data = useChart(state => state.data)
  const centroid = useChart(state => state.centroid)
  const spreadScale = useChart(state => state.spreadScale)
  const mode = useChart(state => state.mode)
  const setHoveredNode = useChart(state => state.setHoveredNode)

  // Parse data
  const parsedPaths = useMemo(() => {
    if (!data || !data.paths || !data.paths.length) return []
    const result: ParsedPath[] = []
    let pathIdx = 0

    data.paths.forEach(path => {
      const parsedPoints: ParsedPoint[] = []
      const splineControlPoints: Vector3[] = []

      path.points.forEach(p => {
        const pos = new Vector3(
          (p.position[0] - centroid.x) * spreadScale,
          (p.position[1] - centroid.y) * spreadScale,
          (p.position[2] - centroid.z) * spreadScale,
        )

        parsedPoints.push({
          position: pos,
          token: p.token,
          step: p.step,
          pathId: path.id,
          clusterId: p.cluster_id,
        })
        splineControlPoints.push(pos)
      })

      let smoothPoints: Vector3[] = []
      if (splineControlPoints.length > 1) {
        const curve = new CatmullRomCurve3(splineControlPoints)
        smoothPoints = curve.getPoints((splineControlPoints.length - 1) * 12)
      }

      result.push({
        id: path.id,
        name: path.name,
        points: parsedPoints,
        smoothPoints,
      })
      pathIdx++
    })

    return result
  }, [data, centroid, spreadScale, mode])

  return (
    <>
      <CameraRig>
        {parsedPaths.map((path, index) => (
          <Path
            key={`path-${path.name}-${index}`}
            path={path}
            mode={mode}
            pointRadius={POINT_RADIUS}
            onPointOver={(p, clientX, clientY) => {
              setHoveredNode({
                pathId: p.pathId,
                pathName: path.name,
                clusterId: p.clusterId,
                token: p.token,
                step: p.step,
                clientX,
                clientY,
              })
            }}
            onPointOut={() => setHoveredNode(null)}
          />
        ))}
      </CameraRig>
      <PlaybackManager />
    </>
  )
}
