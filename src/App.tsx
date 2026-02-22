import { Experience } from '@components'
import { DoubleTapPreventer, GUI } from '@components/helpers'
import { Tooltip } from '@components/ui'
import { StrictMode } from 'react'

export default function App() {
  return (
    <>
      <GUI />
      <Tooltip />
      <DoubleTapPreventer />

      <StrictMode>
        <Experience />
      </StrictMode>
    </>
  )
}
