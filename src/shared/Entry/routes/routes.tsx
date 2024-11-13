import NotFoundPage from '@widgets/UI/NotFoundPage/NotFoundPage';
import { Wrap } from '@widgets/Wrap/Wrap';
import { RouteObject } from 'react-router-dom';
import {FrensPage, HomePage,  RatingPage, TasksPage} from "@shared/Entry/routes/lazyIndex.ts";

export const routes: RouteObject[] = [  
    {  
      path: '/',
      element: <Wrap />,
      errorElement:<NotFoundPage /> ,
      children: [
        {
          path: '',
          element: <HomePage/>,
          errorElement:<HomePage/>,
        },
        {
          path: 'tasks',
          element: <TasksPage/>,
          errorElement:<HomePage/>,
        },
        {
          path: 'raiting',
          element: <RatingPage/>,
          errorElement:<HomePage/>,
        },
        {
          path: 'frens',
          element:<FrensPage/>,
          errorElement:<HomePage/>,
        },
      ]
    },  
    {
      path: '/not_found',
      element:<NotFoundPage />,  
    }
  ]; 