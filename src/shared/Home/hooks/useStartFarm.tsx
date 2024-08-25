import Fetching from '@shared/utilits/axios/axiosRequests'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { setStoreFarmStatus } from '@shared/utilits/redux/redux_slice/home_slice'
import {useMutation} from '@tanstack/react-query'
import { EnumFarmStatus } from '../consts/farmStatus.enum'

export const useStartFarm=()=>{
    const state=useAppSelector(state=>state.home)
    const dispatch=useAppDispatch()
    return useMutation({
        mutationKey:['start farm'],
        mutationFn: Fetching.farmStart,
        onSuccess: () => {
            state.farmStatus!==EnumFarmStatus.FARMING && dispatch(setStoreFarmStatus(EnumFarmStatus.FARMING))
        },
    })
}