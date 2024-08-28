import { Frens } from '@pages/Frens/Frens';
import { Home } from '@pages/Home/Home';
import { Raiting } from '@pages/Raiting/Raiting';
import { Tasks } from '@pages/Tasks/Tasks';
import NotFoundPage from '@widgets/UI/NotFoundPage/NotFoundPage';
import { Wrap } from '@widgets/Wrap/Wrap';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [  
    {  
      path: '/',  
      element: <Wrap />,
      errorElement:<NotFoundPage /> ,
      children: [
      { 
        path: '/',  
        element: <Home/>,
      },
      { 
        path: 'tasks',  
      element: <Tasks/>
      },
      { 
        path: 'raiting',  
        element: <Raiting />,
      },
      { 
        path: '/frens',  
        element:<Frens />, 
      },
      ]
    },  
    {
      path: 'not_found',  
      element:<NotFoundPage />,  
    }
  ]; 