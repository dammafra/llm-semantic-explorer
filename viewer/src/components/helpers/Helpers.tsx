import { GizmoHelper, GizmoViewport } from '@react-three/drei'

import { useQueryParams } from '@hooks'

export function Helpers() {
  const { orientation } = useQueryParams()

  return (
    <>
      <axesHelper />

      <GizmoHelper alignment={orientation === 'rtl' ? 'bottom-left' : 'bottom-right'}>
        <GizmoViewport labelColor="white" />
      </GizmoHelper>
    </>
  )
}
