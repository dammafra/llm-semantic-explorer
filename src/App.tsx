import { Experience } from '@components/Experience'
import { DoubleTapPreventer } from '@components/helpers'
import { StrictMode } from 'react'

export default function App() {
  return (
    <>
      <DoubleTapPreventer />

      <StrictMode>
        <Experience />
      </StrictMode>
    </>
  )
}
