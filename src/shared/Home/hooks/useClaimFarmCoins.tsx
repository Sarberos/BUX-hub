import Fetching from "@shared/utilits/axios/axiosRequests"
import { useMutation } from "@tanstack/react-query"


export const useClaimFarmCoins=()=>{
    return useMutation({
        mutationKey:['start farm'],
        mutationFn: Fetching.farmClaim,
        // onSuccess: () => {
        //   queryClient.invalidateQueries({ queryKey: ['todos'] })
        // },
    })
}