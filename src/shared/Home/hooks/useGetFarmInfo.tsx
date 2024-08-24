import { TFarmInfo } from '@pages/Home/Home'
import Fetching from '@shared/utilits/axios/axiosRequests'
import {useQuery} from '@tanstack/react-query'


export const useGetFarmInfo=()=>{
    const now_date=new Date()
    return useQuery<TFarmInfo>({
        queryKey:['farm_info',`${now_date}`],
        queryFn: Fetching.farmStatus,
    })
}