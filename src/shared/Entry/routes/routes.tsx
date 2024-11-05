import NotFoundPage from '@widgets/UI/NotFoundPage/NotFoundPage';
import { Wrap } from '@widgets/Wrap/Wrap';
import { RouteObject } from 'react-router-dom';
import {FrernsPage, HomePage, RaitingPage, TasksPage} from "@shared/Entry/routes/lazyIndex.ts";

export const routes: RouteObject[] = [  
    {  
      path: '/',  
      element: <Wrap />,
      errorElement:<NotFoundPage /> ,
      children: [
        {
          path: '/',
          element: <HomePage/>,
        },
        {
          path: 'tasks',
        element: <TasksPage/>
        },
        {
          path: 'raiting',
          element: <RaitingPage/>,
        },
        {
          path: 'frens',
          element:<FrernsPage/>,
        },
      ]
    },  
    {
      path: 'not_found',  
      element:<NotFoundPage />,  
    }
  ]; 