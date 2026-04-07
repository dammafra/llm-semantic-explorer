import { useChart } from '@stores'

export function DistanceSlider() {
  const spreadScale = useChart(s => s.spreadScale)
  const setSpreadScale = useChart(s => s.setSpreadScale)

  return (
    <div className="flex flex-col gap-2 shrink-0">
      <div className="flex justify-between items-center text-xs font-semibold text-white/50 uppercase tracking-wider">
        <span>Distance</span>
        <span className="text-white font-mono">{spreadScale.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        step="0.1"
        value={spreadScale}
        onChange={e => setSpreadScale(parseFloat(e.target.value))}
        className="w-full accent-blue-500 cursor-pointer"
      />
    </div>
  )
}
