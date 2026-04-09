import clsx from 'clsx'
import { useMemo } from 'react'

import { useQueryParams } from '@hooks'
import { useChart } from '@stores'

import { ClusterItem } from './ClusterItem'
import { DatasetSelector } from './DatasetSelector'
import { ModeSelector } from './ModeSelector'
import { NoiseCounter } from './NoiseCounter'
import { PathItem } from './PathItem'

export function GUI() {
  const data = useChart(s => s.data)
  const mode = useChart(s => s.mode)
  const { orientation } = useQueryParams()
  const hiddenPaths = useChart(s => s.hiddenPaths)
  const pathVisibleSteps = useChart(s => s.pathVisibleSteps)

  const sortedClusters = useMemo(() => {
    if (!data) return []

    const counts = new Map<number, number>()
    for (const path of data.paths) {
      if (hiddenPaths.has(path.id)) continue
      const visibleSteps = pathVisibleSteps[path.id] ?? path.points.length
      for (let i = 0; i < visibleSteps && i < path.points.length; i++) {
        const cid = path.points[i].cluster_id
        counts.set(cid, (counts.get(cid) || 0) + 1)
      }
    }

    return data.clusters
      .map(c => ({ cluster: c, count: counts.get(c.id) || 0 }))
      .filter(x => x.count > 0)
      .sort((a, b) => b.count - a.count)
  }, [data, hiddenPaths, pathVisibleSteps])

  return (
    <div
      className={clsx(
        'fixed top-4 bottom-4 z-1000 w-80 flex flex-col pointer-events-none',
        orientation === 'rtl' ? 'right-4' : 'left-4',
      )}
    >
      <div className="glass p-4 rounded-xl flex flex-col gap-4 pointer-events-auto min-h-0 overflow-hidden">
        <DatasetSelector />

        {!!data && (
          <>
            <ModeSelector />

            <div className="flex-1 overflow-y-auto gui-scroll flex flex-col gap-1 pr-1">
              {mode === 'paths' ? (
                data.paths.map(path => <PathItem key={path.id} path={path} />)
              ) : (
                <>
                  {sortedClusters.map(({ cluster, count }) => (
                    <ClusterItem key={cluster.id} cluster={cluster} count={count} />
                  ))}
                  <NoiseCounter />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
