import BonusFetching from "@shared/utilits/axios/BonusRequest"
import { useMutation } from "@tanstack/react-query"


export const useClaimBonus=()=>{
    return useMutation({
        mutationKey:['claim_bonus'],
        mutationFn: BonusFetching.bonusClaim,
        // onSuccess: () => {
        //   queryClient.invalidateQueries({ queryKey: ['todos'] })
        // },
    })
}