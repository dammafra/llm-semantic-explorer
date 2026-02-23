import { useRef } from 'react'

import { useChart, type ChartData } from '@stores'

import { ClusterItem } from './ClusterItem'
import { ModeSelector } from './ModeSelector'
import { PathItem } from './PathItem'

export function GUI() {
  const state = useChart()
  const fileInputRef = useRef<HTMLInputElement>(null!)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const parsed: ChartData = JSON.parse(e.target?.result as string)
        state.setData(parsed)
      } catch (err) {
        console.error('JSON Error:', err)
        alert('JSON format error.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="fixed top-4 bottom-4 left-4 z-1000 w-80 flex flex-col pointer-events-none">
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="glass p-4 rounded-xl flex flex-col gap-4 pointer-events-auto min-h-0 overflow-hidden">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-1 rounded-lg cursor-pointer shrink-0"
        >
          Load JSON
        </button>

        {!!state.data && (
          <>
            {/* <DistanceSlider /> */}
            <ModeSelector />

            <div className="flex-1 overflow-y-auto hud-scroll flex flex-col gap-1 pr-1">
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
