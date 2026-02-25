import { useChart } from '@stores'
import { getColor } from '@utils'

import { useCursor } from '@react-three/drei'
import { useState } from 'react'
import { type ParsedPoint } from './Path'

interface PointProps {
  point: ParsedPoint
  index: number
  pointRadius: number
  onPointOver: (p: ParsedPoint, clientX: number, clientY: number) => void
  onPointOut: () => void
}

export function Point({ point, pointRadius, onPointOver, onPointOut }: PointProps) {
  const mode = useChart(state => state.mode)
  const [hovered, setHovered] = useState(false)

  useCursor(hovered)

  return (
    <mesh
      visible={mode === 'paths' || (mode === 'clusters' && point.clusterId !== -1)}
      scale={hovered ? 1.5 : 1}
      position={point.position}
      onPointerOver={e => {
        setHovered(true)
        e.stopPropagation()
        onPointOver(point, e.clientX, e.clientY)
      }}
      onPointerOut={e => {
        setHovered(false)
        e.stopPropagation()
        onPointOut()
      }}
    >
      <icosahedronGeometry args={[pointRadius, 2]} />
      <meshMatcapMaterial color={getColor(mode === 'paths' ? point.pathId : point.clusterId)} />
    </mesh>
  )
}
