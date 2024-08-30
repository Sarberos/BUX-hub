import { useAppDispatch, useAppSelector } from "@shared/utilits/redux/hooks"
import { useMutation, useQueryClient} from "@tanstack/react-query"
import { EnumFrensFarmStatus } from "../consts/frensFarmStatus.enum"
import { setFrensFarmStatus } from "@shared/utilits/redux/redux_slice/frens_slice"
import FrensFetching from "@shared/utilits/axios/FrensRequest"


export const useClaimFrensCoins=()=>{
    const queryClient =useQueryClient()
    const dispatch=useAppDispatch()
    const frensState=useAppSelector(state=>state.frens)
    return useMutation({
        mutationKey:['claim_farm','frens'],
        mutationFn: FrensFetching.claimRefCoins,
        onSuccess: () => {
            frensState.farmStatus!==EnumFrensFarmStatus.FARMING && dispatch(setFrensFarmStatus(EnumFrensFarmStatus.FARMING));
            queryClient.invalidateQueries({queryKey:['frens_info']})
        },
    })
}