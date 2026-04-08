import { CameraControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useChart } from '@stores'
import { useCallback, useEffect, useRef } from 'react'
import { type Group } from 'three'

const AUTO_ROTATE_SPEED = 0.2 // radians per second
const IDLE_DELAY = 3000 // ms before auto-rotate resumes after interaction

export function CameraRig({ children }: { children: React.ReactNode }) {
  const controlsRef = useRef<any>(null)
  const groupRef = useRef<Group>(null)
  const hasAutoFitted = useRef(false)
  const lastInteraction = useRef(0)

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

  const onUserInteraction = useCallback(() => {
    lastInteraction.current = performance.now()
  }, [])

  // Listen for user interaction events on the controls
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    controls.addEventListener('controlstart', onUserInteraction)
    return () => controls.removeEventListener('controlstart', onUserInteraction)
  }, [onUserInteraction])

  // Auto-rotate the camera when idle
  useFrame((_, delta) => {
    const controls = controlsRef.current
    if (!controls) return

    const elapsed = performance.now() - lastInteraction.current
    if (elapsed > IDLE_DELAY) {
      controls.azimuthAngle += AUTO_ROTATE_SPEED * delta
    }
  })

  return (
    <>
      <CameraControls ref={controlsRef} makeDefault />
      <group ref={groupRef}>{children}</group>
    </>
  )
}
