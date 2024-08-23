import Fetching from '@shared/utilits/axios/axiosRequests'
import {useMutation} from '@tanstack/react-query'

export const useStartFarm=()=>{
    return useMutation({
        mutationKey:['start farm'],
        mutationFn: Fetching.farmStart,
        // onSuccess: () => {
        //   queryClient.invalidateQueries({ queryKey: ['todos'] })
        // },
    })
}