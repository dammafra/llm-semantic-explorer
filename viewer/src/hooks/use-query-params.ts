import { useMemo } from 'react'

const params = new URLSearchParams(window.location.search)

type QueryParams = {
  background: boolean
  dataset: string | null
}

export function useQueryParams(): QueryParams {
  return useMemo(
    () => ({
      background: params.get('background') !== 'false',
      dataset: params.get('dataset'),
    }),
    [],
  )
}
