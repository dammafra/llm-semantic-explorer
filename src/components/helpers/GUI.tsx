import { Icon } from '@iconify/react'
import { useStore, type VisualizerData } from '@stores'
import { COLORS } from '@utils'
import { useRef, useState } from 'react'

export function GUI() {
  const state = useStore()
  const hiddenPaths = useStore(s => s.hiddenPaths)
  const hiddenClusters = useStore(s => s.hiddenClusters)
  const fileInputRef = useRef<HTMLInputElement>(null!)
  const [expandedPaths, setExpandedPaths] = useState<Record<number, boolean>>({})

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const parsed: VisualizerData = JSON.parse(e.target?.result as string)
        state.setData(parsed)
      } catch (err) {
        console.error('JSON Error:', err)
        alert('JSON format error.')
      }
    }
    reader.readAsText(file)
  }

  const togglePath = (id: number) => {
    setExpandedPaths(prev => ({ ...prev, [id]: !prev[id] }))
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
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-1 rounded-lg  cursor-pointer shrink-0"
        >
          Load JSON
        </button>

        {!!state.data && (
          <>
            <div className="flex flex-col gap-2 shrink-0">
              <div className="flex justify-between items-center text-xs font-semibold text-white/50 uppercase tracking-wider">
                <span>Distance</span>
                <span className="text-white font-mono">{state.spreadScale.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={state.spreadScale}
                onChange={e => state.setSpreadScale(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex bg-white/5 p-1 rounded-lg shrink-0">
              {(['paths', 'clusters'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => state.setMode(m)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md  capitalize cursor-pointer ${state.mode === m
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/40 hover:text-white/60'
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto hud-scroll flex flex-col gap-1 pr-1">
              {state.mode === 'paths'
                ? state.data.paths.map(path => (
                  <div
                    key={path.id}
                    className="flex flex-col bg-white/5 rounded-lg overflow-hidden border border-white/5 shrink-0"
                  >
                    <button
                      onClick={() => togglePath(path.id)}
                      className="w-full p-2 flex items-center gap-2 hover:bg-white/5 cursor-pointer"
                    >
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          state.togglePathVisibility(path.id)
                          if (!hiddenPaths.has(path.id)) {
                            setExpandedPaths(prev => ({ ...prev, [path.id]: false }))
                          }
                        }}
                        className="size-3.5 rounded-sm border shrink-0 flex items-center justify-center  cursor-pointer"
                        style={{
                          backgroundColor: hiddenPaths.has(path.id)
                            ? 'transparent'
                            : COLORS[path.id],
                          borderColor: hiddenPaths.has(path.id)
                            ? 'rgba(255,255,255,0.2)'
                            : COLORS[path.id],
                        }}
                      >
                        {!hiddenPaths.has(path.id) && (
                          <Icon icon="ri:check-fill" className="size-4 text-white" />
                        )}
                      </button>
                      <span
                        className={`text-xs font-medium truncate flex-1 text-left  ${hiddenPaths.has(path.id) ? 'text-white/30' : 'text-white/80'
                          }`}
                      >
                        {path.name}
                      </span>
                      <Icon
                        icon="ri:arrow-down-s-line"
                        className={`size-5 text-white/40 transition-transform ${expandedPaths[path.id] ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    {expandedPaths[path.id] && (
                      <div className="p-2 pt-0 flex flex-col gap-2 border-t border-white/5 bg-black/20">
                        <div className="flex flex-col gap-1 mt-2">
                          <div className="flex justify-between items-center text-[10px] text-white/30 uppercase tracking-tighter mb-1">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={e => {
                                  e.stopPropagation()
                                  state.togglePlaying(path.id)
                                }}
                                className="size-5 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 flex items-center justify-center  cursor-pointer"
                              >
                                <Icon icon={state.playingPaths[path.id] ? "ri:pause-fill" : "ri:play-fill"} className="size-4" />
                              </button>
                              <span>Playback</span>
                            </div>
                            <span className="text-white font-mono">
                              {state.pathVisibleSteps[path.id]} / {path.points.length}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max={path.points.length}
                            step="1"
                            value={state.pathVisibleSteps[path.id] || path.points.length}
                            onChange={e =>
                              state.setVisibleSteps(path.id, parseInt(e.target.value))
                            }
                            className="w-full accent-blue-500 cursor-pointer h-3"
                            onClick={e => e.stopPropagation()}
                          />
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                          <span className="text-[10px] text-white/30 uppercase tracking-tighter">
                            Prompt
                          </span>
                          <p className="text-[11px] text-white/70 bg-white/5 p-1.5 rounded">
                            {path.prompt}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-white/30 uppercase tracking-tighter">
                            Response
                          </span>
                          <p className="text-[11px] text-white/70 bg-white/5 p-1.5 rounded">
                            {path.response}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
                : state.data.clusters.map(cluster => (
                  <div
                    key={cluster.id}
                    className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/5 p-2"
                  >
                    <button
                      onClick={() => state.toggleClusterVisibility(cluster.id)}
                      className="size-3.5 rounded-sm border shrink-0 flex items-center justify-center  cursor-pointer"
                      style={{
                        backgroundColor: hiddenClusters.has(cluster.id)
                          ? 'transparent'
                          : COLORS[cluster.id],
                        borderColor: hiddenClusters.has(cluster.id)
                          ? 'rgba(255,255,255,0.2)'
                          : COLORS[cluster.id],
                      }}
                    >
                      {!hiddenClusters.has(cluster.id) && (
                        <Icon icon="ri:check-fill" className="size-4 text-white" />
                      )}
                    </button>
                    <span
                      className={`text-xs font-medium truncate flex-1 text-left  ${hiddenClusters.has(cluster.id) ? 'text-white/30' : 'text-white/80'
                        }`}
                    >
                      {cluster.name}
                    </span>
                    <span className="text-xs text-white font-mono shrink-0">
                      {cluster.count} tks
                    </span>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
