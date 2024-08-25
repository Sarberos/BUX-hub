import { TFarmInfo } from '@pages/Home/Home'
import Fetching from '@shared/utilits/axios/axiosRequests'
import {useQuery} from '@tanstack/react-query'


export const useGetFarmInfo=()=>{
    return useQuery<TFarmInfo>({
        queryKey:['farm_info'],
        queryFn: Fetching.farmStatus,
        // refetchOnMount: true,
    })
}