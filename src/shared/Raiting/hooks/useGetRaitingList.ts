import RaitingFetching from '@shared/utilits/axios/RaitingRequest'
import {useQuery} from '@tanstack/react-query'

export  type TRaitingList={

}
export const useGetRaitingList=()=>{
    return useQuery<TRaitingList>({
        queryKey:['raiting_list'],
        queryFn: RaitingFetching.raitingList,
    })
}