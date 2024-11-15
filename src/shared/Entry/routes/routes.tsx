import NotFoundPage from '@widgets/UI/NotFoundPage/NotFoundPage';
import { Wrap } from '@widgets/Wrap/Wrap';
import { RouteObject } from 'react-router-dom';
import {FrensPage, HomePage,  RatingPage, TasksPage} from "@shared/Entry/routes/lazyIndex.ts";
import Home from "@pages/Home/Home.tsx";
import Tasks from "@pages/Tasks/Tasks.tsx";
import Raiting from "@pages/Raiting/Raiting.tsx";
import Frens from "@pages/Frens/Frens.tsx";

export const routes: RouteObject[] = [  
    {  
      path: '/',
      element: <Wrap />,
      errorElement:<NotFoundPage /> ,
      children: [
        {
          path: '',
          element: <Home/>,
        },
        {
          path: 'tasks',
          element: <Tasks/>,
        },
        {
          path: 'raiting',
          element: <Raiting/>,
        },
        {
          path: 'frens',
          element:<Frens/>,
        },
      ]
    },  
    {
      path: '/not_found',
      element:<NotFoundPage />,  
    }
  ]; 