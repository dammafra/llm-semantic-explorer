import clsx from 'clsx'

import { useChart } from '@stores'

export function ModeSelector() {
  const mode = useChart(s => s.mode)
  const setMode = useChart(s => s.setMode)

  return (
    <div className="flex bg-white/5 p-1 rounded-lg shrink-0">
      {(['paths', 'clusters'] as const).map(m => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={clsx(
            'flex-1 py-1.5 text-xs font-medium rounded-md capitalize cursor-pointer',
            mode === m ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/60',
          )}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
