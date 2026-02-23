import { useFrame } from '@react-three/fiber'
import { useStore } from '@stores'
import { useRef } from 'react'

export function PlaybackManager() {
  const { playingPaths, pathVisibleSteps, setVisibleSteps, setPlaying, data } = useStore()
  const lastUpdate = useRef(0)
  const interval = 0.05 // 50ms per step (20 steps/sec)

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    if (time - lastUpdate.current < interval) return
    lastUpdate.current = time

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
