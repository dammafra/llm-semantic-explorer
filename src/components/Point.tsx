import { type ParsedPoint } from './Path'

interface PointProps {
  point: ParsedPoint
  index: number
  pointRadius: number
  onPointOver: (p: ParsedPoint, clientX: number, clientY: number) => void
  onPointOut: () => void
}

export function Point({ point, pointRadius, onPointOver, onPointOut }: PointProps) {
  return (
    <mesh
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
      <meshMatcapMaterial color={point.color} />
    </mesh>
  )
}
