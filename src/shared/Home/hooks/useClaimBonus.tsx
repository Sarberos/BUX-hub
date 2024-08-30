import BonusFetching from "@shared/utilits/axios/BonusRequest"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useClaimBonus=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationKey:['claim_bonus'],
        mutationFn: BonusFetching.bonusClaim,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['farm_info'] })
        },
    })
}