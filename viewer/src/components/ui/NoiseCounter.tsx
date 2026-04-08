import clsx from 'clsx'
import { useMemo } from 'react'

import { useQueryParams } from '@hooks'
import { useChart } from '@stores'

export function NoiseCounter() {
  const { background } = useQueryParams()
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
    <div
      className={clsx(
        'flex items-center gap-2 rounded-lg border p-2',
        background ? 'bg-white/5 border-black/5' : 'bg-black/5 border-white/5',
      )}
    >
      <span
        className={clsx(
          'text-xs font-medium truncate flex-1 text-left',
          background ? 'text-white/30' : 'text-black/30',
        )}
      >
        Noise
      </span>
      <span
        className={clsx(
          'text-xs font-mono shrink-0',
          background ? 'text-white/30' : 'text-black/30',
        )}
      >
        {noiseCount} tks
      </span>
    </div>
  )
}
