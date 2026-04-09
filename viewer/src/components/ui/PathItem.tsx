import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useState } from 'react'

import { useQueryParams } from '@hooks'
import { useChart, type ChartData } from '@stores'
import { getColor } from '@utils'

import { ColorCheckbox } from './ColorCheckbox'

type Path = ChartData['paths'][number]

type Props = {
  path: Path
}

export function PathItem({ path }: Props) {
  const { background } = useQueryParams()
  const hiddenPaths = useChart(s => s.hiddenPaths)
  const togglePathVisibility = useChart(s => s.togglePathVisibility)
  const setOnlyPathVisible = useChart(s => s.setOnlyPathVisible)
  const playingPaths = useChart(s => s.playingPaths)
  const togglePlaying = useChart(s => s.togglePlaying)
  const pathVisibleSteps = useChart(s => s.pathVisibleSteps)
  const setVisibleSteps = useChart(s => s.setVisibleSteps)

  const [expanded, setExpanded] = useState(false)
  const isHidden = hiddenPaths.has(path.id)

  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (e.shiftKey) {
      setOnlyPathVisible(path.id)
      setExpanded(true)
    } else {
      togglePathVisibility(path.id)
      if (!isHidden) setExpanded(false)
    }
  }

  return (
    <div
      className={clsx(
        'flex flex-col rounded-lg overflow-hidden border shrink-0',
        background ? 'bg-white/5 border-black/5' : 'bg-black/5 border-white/5',
      )}
    >
      <div
        onClick={() => setExpanded(prev => !prev)}
        className={clsx(
          'w-full p-2 flex items-center gap-2 cursor-pointer',
          background ? 'hover:bg-white/5' : 'hover:bg-black/5',
        )}
      >
        <ColorCheckbox
          color={getColor(path.id)}
          checked={!isHidden}
          onClick={handleToggleVisibility}
        />
        <span
          className={clsx(
            'text-xs font-medium truncate flex-1 text-left',
            isHidden
              ? background
                ? 'text-white/30'
                : 'text-black/30'
              : background
                ? 'text-white/80'
                : 'text-black/80',
          )}
        >
          {path.name}
        </span>
        <Icon
          icon="ri:arrow-down-s-line"
          className={clsx(
            'size-4 transition-transform',
            background ? 'text-white/40' : 'text-black/40',
            expanded && 'rotate-180',
          )}
        />
      </div>

      {expanded && (
        <div
          className={clsx(
            'p-2 pt-0 flex flex-col gap-2 border-t',
            background ? 'border-black/5 bg-black/5' : 'border-white/5',
          )}
        >
          <div className="flex flex-col gap-1 mt-2">
            <div
              className={clsx(
                'flex justify-between items-center text-[10px] uppercase tracking-tighter mb-1',
                background ? 'text-white/30' : 'text-black/30',
              )}
            >
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
              <span className={clsx('font-mono', background ? 'text-white' : 'text-black')}>
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
            <span
              className={clsx(
                'text-[10px] uppercase tracking-tighter',
                background ? 'text-white/30' : 'text-black/30',
              )}
            >
              Prompt
            </span>
            <p
              className={clsx(
                'text-[11px] p-1.5 rounded whitespace-break-spaces',
                background ? 'text-white/70 bg-white/5' : 'text-black/70 bg-black/5',
              )}
            >
              {path.prompt}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span
              className={clsx(
                'text-[10px] uppercase tracking-tighter',
                background ? 'text-white/30' : 'text-black/30',
              )}
            >
              Response
            </span>
            <p
              className={clsx(
                'text-[11px] p-1.5 rounded whitespace-break-spaces',
                background ? 'text-white/70 bg-white/5' : 'text-black/70 bg-black/5',
              )}
            >
              {path.response}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
