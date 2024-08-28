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
        path: 'farm',  
        element: <Wrap><Home/></Wrap>,
      },
      { 
        path: 'tasks',  
      element: <Wrap><Tasks /></Wrap>,
      },
      { 
        path: 'raiting',  
        element: <Wrap><Raiting /></Wrap>,
      },
      { 
        path: '/frens',  
        element:<Wrap> <Frens /></Wrap>, 
      },
      ]
    },  
    {
      path: 'not_found',  
      element:<NotFoundPage />,  
    }
  ]; 