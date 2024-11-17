import FrensFetching from '@shared/utilits/axios/FrensRequest'
import {useQuery} from '@tanstack/react-query'

export type TFrensItem={
    active_usernames?: string[],
    coins?: number,
    color?:string,
    first_name?:string,
    last_name?:string,
    photo?:string,
    day_revenues?: number;
}
export  type TFrensInfoData={
    content: TFrensItem[];
    next_revenues_time:string;
    referals_limit:number;
    revenues: number;
    status:string;
}
export const useGetFrensInfo=()=>{
    return useQuery<TFrensInfoData>({
        queryKey:['frens_info'],
        queryFn: FrensFetching.myRefList,
    })
}