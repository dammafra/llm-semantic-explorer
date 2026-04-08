import { Experience } from '@components/Experience'
import { DoubleTapPreventer } from '@components/helpers'
import { useQueryParams } from '@hooks'
import { StrictMode, useEffect } from 'react'

export default function App() {
  const { background } = useQueryParams()

  useEffect(() => {
    if (!background) {
      document.documentElement.classList.add('no-bg')
    }
    return () => document.documentElement.classList.remove('no-bg')
  }, [background])

  return (
    <>
      <DoubleTapPreventer />

      <StrictMode>
        <Experience />
      </StrictMode>
    </>
  )
}
