import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@app/Entry/Entry.scss'
import { RouterProvider,createBrowserRouter} from 'react-router-dom';
import { routes } from '@shared/Entry/routes/routes';


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
 
const router = createBrowserRouter(routes);  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
      {/* <Home /> */}    
  </StrictMode>,
)
