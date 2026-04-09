import clsx from 'clsx'

import { useQueryParams } from '@hooks'
import { useChart, type ChartData } from '@stores'
import { getColor } from '@utils'

import { ColorCheckbox } from './ColorCheckbox'

type Cluster = ChartData['clusters'][number]

type Props = {
  cluster: Cluster
  count: number
}

export function ClusterItem({ cluster, count }: Props) {
  const { background } = useQueryParams()
  const hiddenClusters = useChart(s => s.hiddenClusters)
  const toggleClusterVisibility = useChart(s => s.toggleClusterVisibility)
  const setOnlyClusterVisible = useChart(s => s.setOnlyClusterVisible)

  const isHidden = hiddenClusters.has(cluster.id)

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (e.shiftKey) {
      setOnlyClusterVisible(cluster.id)
    } else {
      toggleClusterVisibility(cluster.id)
    }
  }

  if (count === 0) return null

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
        onClick={handleToggleVisibility}
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
        {count} tks
      </span>
    </div>
  )
}
