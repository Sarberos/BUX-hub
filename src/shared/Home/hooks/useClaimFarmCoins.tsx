import Fetching from "@shared/utilits/axios/axiosRequests"
import { useAppDispatch, useAppSelector } from "@shared/utilits/redux/hooks"
import { setStoreFarmStatus } from "@shared/utilits/redux/redux_slice/home_slice"
import { useMutation} from "@tanstack/react-query"
import { EnumFarmStatus } from "../consts/farmStatus.enum"


export const useClaimFarmCoins=()=>{
    const dispatch=useAppDispatch()
    const state=useAppSelector(state=>state.home)
    return useMutation({
        mutationKey:['claim_farm'],
        mutationFn: Fetching.farmClaim,
        onSuccess: () => {
            state.farmStatus!==EnumFarmStatus.START && dispatch(setStoreFarmStatus(EnumFarmStatus.START))
        },
    })
}