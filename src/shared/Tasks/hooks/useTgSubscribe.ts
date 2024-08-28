import TasksFetching from "@shared/utilits/axios/TasksRequest"
import { useMutation, useQueryClient} from "@tanstack/react-query"


export const useTgSubscribe=()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey:['claim_coins','task'],
        mutationFn: (id:number)=>TasksFetching.claimTaskCoins(id),
        onSuccess: ()=>{queryClient.invalidateQueries({queryKey:['task_inf']})}
    })
}