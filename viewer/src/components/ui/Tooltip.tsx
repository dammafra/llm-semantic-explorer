import clsx from 'clsx'

import { useQueryParams } from '@hooks'
import { useChart } from '@stores'
import { getColor } from '@utils'

export function Tooltip() {
  const { background } = useQueryParams()
  const hoveredNode = useChart(state => state.hoveredNode)
  const mode = useChart(state => state.mode)
  const clusters = useChart(state => state.data?.clusters)

  if (!hoveredNode) return null

  return (
    <div
      className="absolute pointer-events-none z-50 p-3 glass rounded-xl text-xs w-60"
      style={{
        left: hoveredNode.clientX + 15,
        top: hoveredNode.clientY + 15,
      }}
    >
      <div
        className={clsx(
          'font-bold mb-2 border-b pb-1.5 uppercase tracking-wider text-sm',
          background ? 'border-white/10' : 'border-black/10',
        )}
        style={{
          color: getColor(mode === 'paths' ? hoveredNode.pathId : hoveredNode.clusterId),
        }}
      >
        {mode === 'paths'
          ? hoveredNode.pathName
          : clusters?.find(c => c.id === hoveredNode.clusterId)?.name}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <div
            className={clsx(
              'flex justify-between items-center px-2 py-1 rounded-md',
              background ? 'bg-white/5' : 'bg-black/5',
            )}
          >
            <span
              className={clsx(
                'text-xs uppercase tracking-tighter font-semibold',
                background ? 'text-white/30' : 'text-black/40',
              )}
            >
              Token
            </span>
            <b className={clsx('text-xs', background ? 'text-white/90' : 'text-black/90')}>
              "{hoveredNode.token}"
            </b>
          </div>
        </div>

        <div
          className={clsx(
            'flex justify-between items-center px-2 py-1 rounded-md',
            background ? 'bg-white/5' : 'bg-black/5',
          )}
        >
          <span
            className={clsx(
              'text-xs uppercase tracking-tighter font-semibold',
              background ? 'text-white/30' : 'text-black/40',
            )}
          >
            Step
          </span>
          <span
            className={clsx('text-xs font-mono', background ? 'text-white/90' : 'text-black/90')}
          >
            {hoveredNode.step}
          </span>
        </div>

        <div
          className={clsx(
            'flex justify-between items-center px-2 py-1 rounded-md',
            background ? 'bg-white/5' : 'bg-black/5',
          )}
        >
          <span
            className={clsx(
              'text-xs uppercase tracking-tighter font-semibold',
              background ? 'text-white/30' : 'text-black/40',
            )}
          >
            {mode === 'paths' ? 'Cluster' : 'Path'}
          </span>
          <span
            className={clsx('text-xs text-right', background ? 'text-white/90' : 'text-black/90')}
            style={{
              color: getColor(mode === 'paths' ? hoveredNode.clusterId : hoveredNode.pathId),
            }}
          >
            {mode === 'paths'
              ? clusters?.find(c => c.id === hoveredNode.clusterId)?.name
              : hoveredNode.pathName}
          </span>
        </div>
      </div>
    </div>
  )
}
