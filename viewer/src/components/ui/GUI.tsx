import clsx from 'clsx'

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
                  {data.clusters.map(cluster => (
                    <ClusterItem key={cluster.id} cluster={cluster} />
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
