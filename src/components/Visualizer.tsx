import { useStore } from '@stores'
import { useMemo } from 'react'
import * as THREE from 'three'
import { Path, type ParsedPath, type ParsedPoint } from './Path'

const POINT_RADIUS = 0.025

export function Visualizer() {
  const data = useStore(state => state.data)
  const centroid = useStore(state => state.centroid)
  const spreadScale = useStore(state => state.spreadScale)
  const mode = useStore(state => state.mode)
  const setHoveredNode = useStore(state => state.setHoveredNode)

  // Parse data
  const parsedPaths = useMemo(() => {
    if (!data?.paths) return []
    const result: ParsedPath[] = []
    let pathIdx = 0

    Object.entries(data.paths).forEach(([id, path]) => {
      const parsedPoints: ParsedPoint[] = []
      const splineControlPoints: THREE.Vector3[] = []

      path.points.forEach(p => {
        const pos = new THREE.Vector3(
          (p.position[0] - centroid.x) * spreadScale,
          (p.position[1] - centroid.y) * spreadScale,
          (p.position[2] - centroid.z) * spreadScale,
        )

        const color = mode === 'paths' ? path.pathColor : path.clusterColor

        parsedPoints.push({
          position: pos,
          clusterId: p.cluster_id,
          token: p.token,
          step: p.step,
          color,
        })
        splineControlPoints.push(pos)
      })

      let smoothPoints: THREE.Vector3[] = []
      if (splineControlPoints.length > 1) {
        const curve = new THREE.CatmullRomCurve3(splineControlPoints)
        smoothPoints = curve.getPoints((splineControlPoints.length - 1) * 12)
      }

      result.push({
        id,
        index: pathIdx,
        points: parsedPoints,
        smoothPoints,
        pathColor: path.pathColor,
        clusterColor: path.clusterColor,
      })
      pathIdx++
    })

    return result
  }, [data, centroid, spreadScale, mode])

  return (
    <group>
      {parsedPaths.map(path => (
        <Path
          key={path.id}
          path={path}
          mode={mode}
          pointRadius={POINT_RADIUS}
          onPointOver={(p, clientX, clientY) => {
            setHoveredNode({
              pathId: path.id,
              clusterId: p.clusterId,
              token: p.token,
              step: p.step,
              color: p.color,
              clientX,
              clientY,
            })
          }}
          onPointOut={() => setHoveredNode(null)}
        />
      ))}
    </group>
  )
}
