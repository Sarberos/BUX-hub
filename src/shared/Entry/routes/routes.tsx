// import { Frens } from '@pages/Frens/Frens';
import { Raiting } from '@pages/Raiting/Raiting';
// import { Tasks } from '@pages/Tasks/Tasks';
import NotFoundPage from '@widgets/UI/NotFoundPage/NotFoundPage';
import { Wrap } from '@widgets/Wrap/Wrap';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [  
    {  
      path: '/',  
      element: <Wrap />,
      errorElement:<NotFoundPage />  
    },  
    {  
      path: 'tasks',  
      // element: <Tasks />,
      errorElement:<NotFoundPage />  
    },  
    {  
      path: 'raiting',  
      element: <Raiting />,
      errorElement:<NotFoundPage />  
    },  
    {  
      path: '/frens',  
      // element: <Frens />,  
      errorElement:<NotFoundPage />  
    },  
    {
      path: '/not_found',  
      element:<NotFoundPage />,  
    }
  ]; 