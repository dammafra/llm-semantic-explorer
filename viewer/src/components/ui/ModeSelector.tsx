import clsx from 'clsx'

import { useQueryParams } from '@hooks'
import { useChart } from '@stores'

export function ModeSelector() {
  const { background } = useQueryParams()
  const mode = useChart(s => s.mode)
  const setMode = useChart(s => s.setMode)

  return (
    <div className={clsx('flex p-1 rounded-lg shrink-0', background ? 'bg-white/5' : 'bg-black/5')}>
      {(['paths', 'clusters'] as const).map(m => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={clsx(
            'flex-1 py-1.5 text-xs font-medium rounded-md capitalize cursor-pointer',
            mode === m
              ? background
                ? 'bg-white/10 text-white shadow-sm'
                : 'bg-black/10 text-black shadow-sm'
              : background
                ? 'text-white/40 hover:text-white/60'
                : 'text-black/40 hover:text-black/60',
          )}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
