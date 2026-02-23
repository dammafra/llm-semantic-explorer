import clsx from 'clsx'

import { useChart, type ChartData } from '@stores'
import { COLORS } from '@utils'

import { ColorCheckbox } from './ColorCheckbox'

type Cluster = ChartData['clusters'][number]

type Props = {
  cluster: Cluster
}

export function ClusterItem({ cluster }: Props) {
  const hiddenClusters = useChart(s => s.hiddenClusters)
  const toggleClusterVisibility = useChart(s => s.toggleClusterVisibility)

  const isHidden = hiddenClusters.has(cluster.id)

  return (
    <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/5 p-2">
      <ColorCheckbox
        color={COLORS[cluster.id]}
        checked={!isHidden}
        onClick={() => toggleClusterVisibility(cluster.id)}
      />
      <span
        className={clsx(
          'text-xs font-medium truncate flex-1 text-left',
          isHidden ? 'text-white/30' : 'text-white/80',
        )}
      >
        {cluster.name}
      </span>
      <span className="text-xs text-white font-mono shrink-0">{cluster.count} tks</span>
    </div>
  )
}
