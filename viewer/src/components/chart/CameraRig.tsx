import { CameraControls } from '@react-three/drei'
import { useChart } from '@stores'
import { useEffect, useRef } from 'react'
import { Box3, Sphere, type Group } from 'three'

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
          // Compute bounding sphere to determine required camera distance
          const box = new Box3().setFromObject(groupRef.current)
          const sphere = new Sphere()
          box.getBoundingSphere(sphere)

          // Dolly to fit the sphere with padding, keep target at origin
          const padding = 2
          const distance = sphere.radius * padding
          controls.setTarget(0, 0, 0, true)
          controls.dollyTo(distance, true)

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
