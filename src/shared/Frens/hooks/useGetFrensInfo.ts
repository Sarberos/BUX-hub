import FrensFetching from '@shared/utilits/axios/FrensRequest'
import {useQuery} from '@tanstack/react-query'

export  type TFrensInfoData={
   
}
export const useGetFrensInfo=()=>{
    return useQuery<TFrensInfoData>({
        queryKey:['frens_info'],
        queryFn: FrensFetching.myRefList,
    })
}