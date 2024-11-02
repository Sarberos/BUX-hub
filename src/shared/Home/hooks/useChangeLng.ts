import {useMutation} from "@tanstack/react-query";
import Fetching from "@shared/utilits/axios/axiosRequests.tsx";


export const useChangeLng=()=>{
  return useMutation({
    mutationKey:['change_lng'],
    mutationFn:(v:string)=>Fetching.changeLang(v),
  })
}