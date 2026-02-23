import { PCFShadowMap } from 'three'

import { Canvas, Helpers } from '@components/helpers'

import { Chart } from './chart'
import { GUI, Tooltip } from './ui'

export function Experience() {
  return (
    <>
      <GUI />
      <Tooltip />

      <Canvas
        shadows={{ type: PCFShadowMap }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [2, 4, 6],
        }}
      >
        <Chart />
        <Helpers />
      </Canvas>
    </>
  )
}
