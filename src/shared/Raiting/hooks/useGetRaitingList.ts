import RaitingFetching from '@shared/utilits/axios/RaitingRequest'
import {useQuery} from '@tanstack/react-query'


export type TRaitngItem={
    accent_color_id?: number,
        active_usernames?: string[],
        bio?:'',
        coins?: number,
        createdAt?:string,
        first_name?:string,
        last_name?:string,
        id?:number,
        max_reaction_count?:number,
        photo?:string,
        referrerId?: number|null,
        role?:string,
        telegramId:string,
        type?:string,
        updatedAt?:string,
        username?:string,
        birthdate?:{},
}
export  type TRaitingList={
    raiting:TRaitngItem[],
    userPosition: number,
    statusCode:number
}
export const useGetRaitingList=()=>{
    return useQuery<TRaitingList>({
        queryKey:['raiting_list'],
        queryFn: RaitingFetching.raitingList,
    })
}