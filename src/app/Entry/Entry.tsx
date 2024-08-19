import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@app/Entry/Entry.css'
import { Home } from '@pages/Home/Home'

declare global {  
  interface Window {  
      Telegram: {  
          WebApp: {  
            initDataUnsafe:{
              user:{
                id?: number; 
                is_bot?: boolean; 
                first_name?: string; 
                last_name?: string; 
                username?: string; 
                language_code?: string; 
              }
            } 
          };  
      };  
  }  
} 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
