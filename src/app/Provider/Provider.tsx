import { QueryClientProvider,QueryClient } from "@tanstack/react-query"
import { RouterProvider,createBrowserRouter} from 'react-router-dom';
import { routes } from '@shared/Entry/routes/routes';


const router = createBrowserRouter(routes);  

export const Provider=({children}:{children?: React.ReactNode})=>{
    const queryClient = new QueryClient()

 return(
    <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        {children}
    </QueryClientProvider>
 )
}