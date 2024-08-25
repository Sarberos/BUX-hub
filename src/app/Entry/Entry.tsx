import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@shared/utilits/i18n/i18n'
import '@app/Entry/Entry.scss'
import { ProviderContainer } from '@app/Provider/Provider';

 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProviderContainer>
    </ProviderContainer>
  </StrictMode>,
)
