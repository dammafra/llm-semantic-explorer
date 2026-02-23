import { useStore, type VisualizerData } from '@stores'
import { COLORS } from '@utils'
import { useRef, useState } from 'react'

export function GUI() {
  const state = useStore()
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
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-1 rounded-lg transition-colors cursor-pointer shrink-0"
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
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize cursor-pointer ${
                    state.mode === m
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
                        className="w-full p-2 flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: COLORS[path.id] }}
                        />
                        <span className="text-xs font-medium text-white/80 truncate flex-1 text-left">
                          {path.name}
                        </span>
                        <svg
                          className={`w-3 h-3 text-white/40 transition-transform ${expandedPaths[path.id] ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {expandedPaths[path.id] && (
                        <div className="p-2 pt-0 flex flex-col gap-2 border-t border-white/5 bg-black/20">
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
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: COLORS[cluster.id] }}
                      />
                      <span className="text-xs font-medium text-white/80 truncate flex-1 text-left">
                        {cluster.name}
                      </span>
                      <span className="text-xs text-white font-mono shrink-0">
                        {cluster.count} tokens
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
