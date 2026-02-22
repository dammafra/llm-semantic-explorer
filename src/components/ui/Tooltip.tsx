import { useStore } from '@stores'
import { COLORS } from '@utils'

export function Tooltip() {
  const hoveredNode = useStore(state => state.hoveredNode)
  const mode = useStore(state => state.mode)
  const clusters = useStore(state => state.data?.clusters)

  if (!hoveredNode) return null

  return (
    <div
      className="absolute pointer-events-none z-50 p-2.5 bg-black/90 text-white rounded-lg text-xs border border-white/20 shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.5)] backdrop-blur-sm"
      style={{
        left: hoveredNode.clientX + 15,
        top: hoveredNode.clientY + 15,
      }}
    >
      <div
        className="font-bold mb-1 border-b border-white/10 pb-1 uppercase tracking-tighter"
        style={{
          color: mode === 'paths' ? COLORS[hoveredNode.pathId] : COLORS[hoveredNode.clusterId],
        }}
      >
        {mode === 'paths'
          ? hoveredNode.pathName
          : clusters?.find(c => c.id === hoveredNode.clusterId)?.name}
      </div>
      <div className="mt-1 flex justify-between items-center gap-4">
        <span className="opacity-50 text-[9px] uppercase">Token:</span>
        <b className="text-sm">"{hoveredNode.token}"</b>
      </div>
      <div className="flex justify-between items-center gap-4">
        <span className="opacity-50 text-[9px] uppercase">Step:</span>
        <span>{hoveredNode.step}</span>
      </div>
    </div>
  )
}
