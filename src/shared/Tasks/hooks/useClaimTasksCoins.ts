import TasksFetching from "@shared/utilits/axios/TasksRequest"
import { useMutation} from "@tanstack/react-query"


export const useClaimTasksCoins=()=>{
    return useMutation({
        mutationKey:['claim_coins','task'],
        mutationFn: TasksFetching.claimTaskCoins,
    })
}