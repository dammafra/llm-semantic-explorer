import { useChart } from '@stores'
import { COLORS } from '@utils'

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

  return (
    <mesh
      visible={mode === 'paths' || (mode === 'clusters' && point.clusterId !== -1)}
      position={point.position}
      onPointerOver={e => {
        e.stopPropagation()
        onPointOver(point, e.clientX, e.clientY)
      }}
      onPointerOut={e => {
        e.stopPropagation()
        onPointOut()
      }}
    >
      <icosahedronGeometry args={[pointRadius, 2]} />
      <meshMatcapMaterial color={COLORS[mode === 'paths' ? point.pathId : point.clusterId]} />
    </mesh>
  )
}
