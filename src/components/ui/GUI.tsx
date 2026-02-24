import { useChart } from '@stores'

import { ClusterItem } from './ClusterItem'
import { DatasetSelector } from './DatasetSelector'
import { ModeSelector } from './ModeSelector'
import { PathItem } from './PathItem'

export function GUI() {
  const state = useChart()

  return (
    <div className="fixed top-4 bottom-4 left-4 z-1000 w-80 flex flex-col pointer-events-none">
      <div className="glass p-4 rounded-xl flex flex-col gap-4 pointer-events-auto min-h-0 overflow-hidden">
        <DatasetSelector />

        {!!state.data && (
          <>
            <ModeSelector />

            <div className="flex-1 overflow-y-auto gui-scroll flex flex-col gap-1 pr-1">
              {state.mode === 'paths'
                ? state.data.paths.map(path => <PathItem key={path.id} path={path} />)
                : state.data.clusters.map(cluster => (
                    <ClusterItem key={cluster.id} cluster={cluster} />
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
