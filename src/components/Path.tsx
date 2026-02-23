import { Line } from '@react-three/drei'
import { useStore } from '@stores'
import { COLORS } from '@utils'
import type { Vector3 } from 'three'
import { Point } from './Point'

export type ParsedPoint = {
  position: Vector3
  token: string
  step: number
  pathId: number
  clusterId: number
}

export type ParsedPath = {
  id: number
  name: string
  points: ParsedPoint[]
  smoothPoints: Vector3[]
}

interface TrajectoryProps {
  path: ParsedPath
  mode: 'paths' | 'clusters'
  onPointOver: (p: ParsedPoint, clientX: number, clientY: number) => void
  onPointOut: () => void
  pointRadius: number
}

export function Path({ path, mode, onPointOver, onPointOut, pointRadius }: TrajectoryProps) {
  const visibleSteps = useStore(state => state.pathVisibleSteps[path.id] ?? path.points.length)
  const lineOpacity = mode === 'paths' ? 0.6 : 0.15

  const visiblePoints = path.points.slice(0, visibleSteps)

  // Calculate exactly which index in smoothPoints corresponds to the last visible point.
  // Visualizer uses (points.length - 1) * 12 as the subdivision count.
  const segmentsPerPoint = (path.smoothPoints.length - 1) / (path.points.length - 1)
  const smoothPointsCount = visibleSteps > 1 ? (visibleSteps - 1) * segmentsPerPoint + 1 : 0
  const visibleSmoothPoints = path.smoothPoints.slice(0, Math.round(smoothPointsCount))

  return (
    <group>
      {mode === 'paths' && visibleSmoothPoints.length >= 2 && (
        <Line
          points={visibleSmoothPoints}
          color={COLORS[path.id]}
          opacity={lineOpacity}
          transparent
          lineWidth={1}
        />
      )}

      {visiblePoints.map((p, i) => (
        <Point
          key={i}
          point={p}
          index={i}
          pointRadius={pointRadius}
          onPointOver={onPointOver}
          onPointOut={onPointOut}
        />
      ))}
    </group>
  )
}
