import { QueryClientProvider,QueryClient } from "@tanstack/react-query"
import { RouterProvider,createBrowserRouter} from 'react-router-dom';
import { routes } from '@shared/Entry/routes/routes';
import { store } from "@shared/utilits/redux/store_config";
import { Provider } from 'react-redux'

const router = createBrowserRouter(routes);  

export const ProviderContainer=({children}:{children?: React.ReactNode})=>{
    const queryClient = new QueryClient()

 return(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            {children}
        </QueryClientProvider>
    </Provider>
 )
}