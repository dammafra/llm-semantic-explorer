import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

import { useChart } from '@stores'
export function PlaybackManager() {
  const lastUpdate = useRef(0)
  const interval = 0.1 // 100ms per step (10 steps/sec)

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    if (time - lastUpdate.current < interval) return
    lastUpdate.current = time

    const { playingPaths, pathVisibleSteps, setVisibleSteps, setPlaying, data } =
      useChart.getState()

    Object.entries(playingPaths).forEach(([pathIdStr, isPlaying]) => {
      if (!isPlaying) return
      const pathId = parseInt(pathIdStr)
      const current = pathVisibleSteps[pathId] || 0
      const total = data?.paths.find(p => p.id === pathId)?.points.length || 0

      if (current < total) {
        setVisibleSteps(pathId, current + 1)
      } else {
        setPlaying(pathId, false)
      }
    })
  })

  return null
}
