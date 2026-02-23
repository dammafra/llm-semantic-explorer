import { PCFShadowMap } from 'three'

import { Canvas, Helpers, PlaybackManager } from '@components/helpers'

import { CameraRig } from './CameraRig'
import { Visualizer } from './Visualizer'

export function Experience() {
  return (
    <Canvas
      shadows={{ type: PCFShadowMap }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [2, 4, 6],
      }}
    >
      <CameraRig>
        <Visualizer />
      </CameraRig>

      <PlaybackManager />
      <Helpers />
    </Canvas>
  )
}
