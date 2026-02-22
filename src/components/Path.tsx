import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { Point } from './Point'

export const PATH_COLORS = [
  '#60a5fa',
  '#34d399',
  '#fbbf24',
  '#a78bfa',
  '#f472b6',
  '#22d3ee',
  '#fb7185',
]
export const CLUSTER_COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#10b981',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#d946ef',
  '#f43f5e',
  '#a855f7',
]

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
}

interface TrajectoryProps {
  path: ParsedPath
  mode: 'paths' | 'clusters'
  onPointOver: (p: ParsedPoint, clientX: number, clientY: number) => void
  onPointOut: () => void
  pointRadius: number
}

export function Path({ path, mode, onPointOver, onPointOut, pointRadius }: TrajectoryProps) {
  const lineColor = PATH_COLORS[path.index % PATH_COLORS.length]
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
