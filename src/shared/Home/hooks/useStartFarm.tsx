import Fetching from '@shared/utilits/axios/axiosRequests'
import {useMutation, useQueryClient} from '@tanstack/react-query'

export const useStartFarm=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationKey:['start farm'],
        mutationFn: Fetching.farmStart,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:['farm_info'],
            })
        },
    })
}