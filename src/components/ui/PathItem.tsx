import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useState } from 'react'

import { useChart, type ChartData } from '@stores'
import { COLORS } from '@utils'

import { ColorCheckbox } from './ColorCheckbox'

type Path = ChartData['paths'][number]

type Props = {
  path: Path
}

export function PathItem({ path }: Props) {
  const hiddenPaths = useChart(s => s.hiddenPaths)
  const togglePathVisibility = useChart(s => s.togglePathVisibility)
  const playingPaths = useChart(s => s.playingPaths)
  const togglePlaying = useChart(s => s.togglePlaying)
  const pathVisibleSteps = useChart(s => s.pathVisibleSteps)
  const setVisibleSteps = useChart(s => s.setVisibleSteps)

  const [expanded, setExpanded] = useState(false)
  const isHidden = hiddenPaths.has(path.id)

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    togglePathVisibility(path.id)
    if (!isHidden) setExpanded(false)
  }

  return (
    <div className="flex flex-col bg-white/5 rounded-lg overflow-hidden border border-white/5 shrink-0">
      <button
        onClick={() => setExpanded(prev => !prev)}
        className="w-full p-2 flex items-center gap-2 hover:bg-white/5 cursor-pointer"
      >
        <ColorCheckbox
          color={COLORS[path.id]}
          checked={!isHidden}
          onClick={handleToggleVisibility}
        />
        <span
          className={clsx(
            'text-xs font-medium truncate flex-1 text-left',
            isHidden ? 'text-white/30' : 'text-white/80',
          )}
        >
          {path.name}
        </span>
        <Icon
          icon="ri:arrow-down-s-line"
          className={clsx('size-5 text-white/40 transition-transform', expanded && 'rotate-180')}
        />
      </button>

      {expanded && (
        <div className="p-2 pt-0 flex flex-col gap-2 border-t border-white/5 bg-black/20">
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex justify-between items-center text-[10px] text-white/30 uppercase tracking-tighter mb-1">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={e => {
                    e.stopPropagation()
                    togglePlaying(path.id)
                  }}
                  className="size-5 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 flex items-center justify-center cursor-pointer"
                >
                  <Icon
                    icon={playingPaths[path.id] ? 'ri:pause-fill' : 'ri:play-fill'}
                    className="size-4"
                  />
                </button>
                <span>Playback</span>
              </div>
              <span className="text-white font-mono">
                {pathVisibleSteps[path.id]} / {path.points.length}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max={path.points.length}
              step="1"
              value={pathVisibleSteps[path.id] || path.points.length}
              onChange={e => setVisibleSteps(path.id, parseInt(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-3"
              onClick={e => e.stopPropagation()}
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[10px] text-white/30 uppercase tracking-tighter">Prompt</span>
            <p className="text-[11px] text-white/70 bg-white/5 p-1.5 rounded">{path.prompt}</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-white/30 uppercase tracking-tighter">Response</span>
            <p className="text-[11px] text-white/70 bg-white/5 p-1.5 rounded">{path.response}</p>
          </div>
        </div>
      )}
    </div>
  )
}
