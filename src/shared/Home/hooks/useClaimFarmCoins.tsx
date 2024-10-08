import Fetching from "@shared/utilits/axios/axiosRequests"
import {useMutation, useQueryClient} from "@tanstack/react-query"


export const useClaimFarmCoins=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationKey:['claim_farm'],
        mutationFn: Fetching.farmClaim,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:['farm_info'],
            })
        },
    })
}