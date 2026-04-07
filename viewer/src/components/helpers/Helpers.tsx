import { GizmoHelper, GizmoViewport } from '@react-three/drei'

export function Helpers() {
  return (
    <>
      <axesHelper />

      <GizmoHelper>
        <GizmoViewport labelColor="white" />
      </GizmoHelper>
    </>
  )
}
