import { CameraControls } from '@react-three/drei'
import { useChart } from '@stores'
import { useEffect, useRef } from 'react'
import { type Group } from 'three'

export function CameraRig({ children }: { children: React.ReactNode }) {
  const controlsRef = useRef<any>(null)
  const groupRef = useRef<Group>(null)
  const hasAutoFitted = useRef(false)

  const data = useChart(state => state.data)
  const spreadScale = useChart(state => state.spreadScale)

  useEffect(() => {
    hasAutoFitted.current = false
  }, [data])

  useEffect(() => {
    const controls = controlsRef.current
    const hasData = data && data.paths && data.paths.length

    if (!hasAutoFitted.current && controls && groupRef.current && hasData) {
      setTimeout(() => {
        if (groupRef.current) {
          controls.fitToBox(groupRef.current, true, {
            paddingTop: 1.2,
            paddingLeft: 1.2,
            paddingRight: 1.2,
            paddingBottom: 1.2,
          })

          hasAutoFitted.current = true
        }
      }, 50)
    }
  }, [data, spreadScale])

  return (
    <>
      <CameraControls ref={controlsRef} makeDefault />
      <group ref={groupRef}>{children}</group>
    </>
  )
}
