import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Point } from './Point'

export type ParsedPoint = {
  position: THREE.Vector3
  clusterId: number | null
  token: string
  step: number
  color: string
}

export type ParsedPath = {
  id: string
  index: number
  points: ParsedPoint[]
  smoothPoints: THREE.Vector3[]
  pathColor: string
  clusterColor: string
}

interface TrajectoryProps {
  path: ParsedPath
  mode: 'paths' | 'clusters'
  onPointOver: (p: ParsedPoint, clientX: number, clientY: number) => void
  onPointOut: () => void
  pointRadius: number
}

export function Path({ path, mode, onPointOver, onPointOut, pointRadius }: TrajectoryProps) {
  const lineColor = path.pathColor
  const lineOpacity = mode === 'paths' ? 0.6 : 0.15

  return (
    <group>
      {mode === 'paths' && (
        <Line
          points={path.smoothPoints}
          color={lineColor}
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
