import Fetching from '@shared/utilits/axios/axiosRequests'
import {useQuery} from '@tanstack/react-query'

export const useGetFarmInfo=()=>{
    return useQuery({
        queryKey:['farm_info'],
        queryFn: Fetching.farmStatus,
    })
}