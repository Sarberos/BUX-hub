import BonusFetching from '@shared/utilits/axios/BonusRequest'
import {useQuery} from '@tanstack/react-query'
import { EnumBonusStatus } from '../consts/bonusStatus.enum'

export  type TBonusData={
    day:number,
    next_bonus_time:string,
    status:EnumBonusStatus,
    welcome_status:boolean,
}
export const useGetBonusStatus=()=>{
    return useQuery<TBonusData>({
        queryKey:['bonus_status'],
        queryFn: BonusFetching.bonusStatusReq,
        staleTime: Infinity
    })
}