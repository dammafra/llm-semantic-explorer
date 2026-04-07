import { useMemo } from 'react'

import { useChart } from '@stores'

export function NoiseCounter() {
  const data = useChart(s => s.data)
  const hiddenPaths = useChart(s => s.hiddenPaths)
  const pathVisibleSteps = useChart(s => s.pathVisibleSteps)

  const noiseCount = useMemo(() => {
    if (!data) return 0
    let count = 0
    for (const path of data.paths) {
      if (hiddenPaths.has(path.id)) continue
      const visibleSteps = pathVisibleSteps[path.id] ?? path.points.length
      for (let i = 0; i < visibleSteps && i < path.points.length; i++) {
        if (path.points[i].cluster_id === -1) count++
      }
    }
    return count
  }, [data, hiddenPaths, pathVisibleSteps])

  if (noiseCount === 0) return null

  return (
    <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/5 p-2">
      <span className="text-xs font-medium truncate flex-1 text-left text-white/30">Noise</span>
      <span className="text-xs text-white/30 font-mono shrink-0">{noiseCount} tks</span>
    </div>
  )
}
