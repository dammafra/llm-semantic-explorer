import { useStore } from '@stores'
import { COLORS } from '@utils'

export function Tooltip() {
  const hoveredNode = useStore(state => state.hoveredNode)
  const mode = useStore(state => state.mode)
  const clusters = useStore(state => state.data?.clusters)

  if (!hoveredNode) return null

  return (
    <div
      className="absolute pointer-events-none z-50 p-3 glass rounded-xl text-xs w-48"
      style={{
        left: hoveredNode.clientX + 15,
        top: hoveredNode.clientY + 15,
      }}
    >
      <div
        className="font-bold mb-2 border-b border-white/10 pb-1.5 uppercase tracking-wider text-sm"
        style={{
          color: mode === 'paths' ? COLORS[hoveredNode.pathId] : COLORS[hoveredNode.clusterId],
        }}
      >
        {mode === 'paths'
          ? hoveredNode.pathName
          : clusters?.find(c => c.id === hoveredNode.clusterId)?.name}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded-md">
            <span className="text-xs text-white/30 uppercase tracking-tighter font-semibold">
              Token
            </span>
            <b className="text-xs text-white/90">"{hoveredNode.token}"</b>
          </div>
        </div>

        <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded-md">
          <span className="text-xs text-white/30 uppercase tracking-tighter font-semibold">
            Step
          </span>
          <span className="text-xs text-white/90 font-mono">{hoveredNode.step}</span>
        </div>
      </div>
    </div>
  )
}
