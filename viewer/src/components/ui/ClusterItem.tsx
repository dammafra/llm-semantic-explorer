import clsx from 'clsx'
import { useMemo } from 'react'

import { useQueryParams } from '@hooks'
import { useChart, type ChartData } from '@stores'
import { getColor } from '@utils'

import { ColorCheckbox } from './ColorCheckbox'

type Cluster = ChartData['clusters'][number]

type Props = {
  cluster: Cluster
}

export function ClusterItem({ cluster }: Props) {
  const { background } = useQueryParams()
  const data = useChart(s => s.data)
  const hiddenPaths = useChart(s => s.hiddenPaths)
  const pathVisibleSteps = useChart(s => s.pathVisibleSteps)
  const hiddenClusters = useChart(s => s.hiddenClusters)
  const toggleClusterVisibility = useChart(s => s.toggleClusterVisibility)

  const isHidden = hiddenClusters.has(cluster.id)

  const filteredCount = useMemo(() => {
    if (!data) return 0
    let count = 0
    for (const path of data.paths) {
      if (hiddenPaths.has(path.id)) continue
      const visibleSteps = pathVisibleSteps[path.id] ?? path.points.length
      for (let i = 0; i < visibleSteps && i < path.points.length; i++) {
        if (path.points[i].cluster_id === cluster.id) count++
      }
    }
    return count
  }, [data, hiddenPaths, pathVisibleSteps, cluster.id])

  if (filteredCount === 0) return null

  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-lg border p-2',
        background ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5',
      )}
    >
      <ColorCheckbox
        color={getColor(cluster.id)}
        checked={!isHidden}
        onClick={() => toggleClusterVisibility(cluster.id)}
      />
      <span
        className={clsx(
          'text-xs font-medium truncate flex-1 text-left pointer-events-none',
          isHidden
            ? background
              ? 'text-white/30'
              : 'text-black/30'
            : background
              ? 'text-white/80'
              : 'text-black/80',
        )}
      >
        {cluster.name}
      </span>
      <span
        className={clsx('text-xs font-mono shrink-0', background ? 'text-white' : 'text-black')}
      >
        {filteredCount} tks
      </span>
    </div>
  )
}
