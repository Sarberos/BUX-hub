import BonusFetching from '@shared/utilits/axios/BonusRequest'
import {useQuery} from '@tanstack/react-query'


export const useGetBonusStatus=()=>{
    return useQuery({
        queryKey:['bonus_status'],
        queryFn: BonusFetching.bonusStatus,
        refetchOnMount: true,
    })
}