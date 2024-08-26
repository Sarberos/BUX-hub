import FrensFetching from '@shared/utilits/axios/FrensRequest'
import {useQuery} from '@tanstack/react-query'

export type TFrensItem={
    accent_color_id: number,
    active_usernames: string[],
    bio:'',
    coins: number,
    createdAt:string,
    first_name:string,
    last_name:string,
    id:number,
    max_reaction_count:number,
    photo?:string,
    referrerId: number|null,
    role:string,
    telegramId:string,
    type:string,
    updatedAt:string,
    username:string,
    birthdate?:{},
}
export  type TFrensInfoData={
    content: TFrensItem[];
    revenues: number;
    status:string;
}
export const useGetFrensInfo=()=>{
    return useQuery<TFrensInfoData>({
        queryKey:['frens_info'],
        queryFn: FrensFetching.myRefList,
    })
}