import { Line } from '@react-three/drei'
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
  const lineOpacity = mode === 'paths' ? 0.6 : 0.15

  return (
    <group>
      {mode === 'paths' && (
        <Line
          points={path.smoothPoints}
          color={COLORS[path.id]}
          opacity={lineOpacity}
          transparent
          lineWidth={1}
        />
      )}

      {path.points.map((p, i) => (
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
