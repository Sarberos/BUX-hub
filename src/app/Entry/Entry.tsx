import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Wrap from '../Wrap/Wrap.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Wrap />
  </StrictMode>,
)
