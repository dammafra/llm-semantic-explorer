import { useMemo } from 'react'

const params = new URLSearchParams(window.location.search)

type Orientation = 'ltr' | 'rtl'

type QueryParams = {
  background: boolean
  dataset: string | null
  orientation: Orientation
}

export function useQueryParams(): QueryParams {
  return useMemo(
    () => ({
      background: params.get('background') !== 'false',
      dataset: params.get('dataset'),
      orientation: params.get('orientation') === 'rtl' ? 'rtl' : 'ltr',
    }),
    [],
  )
}
