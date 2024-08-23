import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@shared/utilits/i18n/i18n'
import '@app/Entry/Entry.scss'
import { RouterProvider,createBrowserRouter} from 'react-router-dom';
import { routes } from '@shared/Entry/routes/routes';

 
const router = createBrowserRouter(routes);  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
