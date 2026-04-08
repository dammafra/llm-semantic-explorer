import { Icon } from '@iconify/react'

import { useQueryParams } from '@hooks'

type Props = {
  color: string
  checked: boolean
  onClick: (e: React.MouseEvent) => void
}

export function ColorCheckbox({ color, checked, onClick }: Props) {
  const { background } = useQueryParams()

  return (
    <button
      onClick={onClick}
      className="size-3.5 rounded-sm border shrink-0 flex items-center justify-center cursor-pointer"
      style={{
        backgroundColor: checked ? color : 'transparent',
        borderColor: checked ? color : background ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
      }}
    >
      {checked && <Icon icon="ri:check-fill" className="size-4 text-white" />}
    </button>
  )
}
