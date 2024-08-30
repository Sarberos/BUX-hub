import s from './MiniTasks.module.scss'
import intro_img from '@shared/Tasks/assets/tasks_img/Tasks_intro.png'
import TaskItem from '../TaskItem/TaskItem'
import {TTaskItem, useGetTasksInf } from '@shared/Tasks/hooks/useGetTasksInf'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { useState ,useEffect} from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { setIsMiniTasks, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice'
import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import { useClaimTasksCoins } from '@shared/Tasks/hooks/useClaimTasksCoins'



export const MiniTasks = ()=>{
  const queryClient =useQueryClient()
  const dispatch=useAppDispatch()
  const {data:tasksInf,isLoading}=useGetTasksInf()
  const {mutate:claimTasksCoins}=useClaimTasksCoins()
  const state = useAppSelector(state=>state.home)
  const [completedTasks , setCompletedTasks]=useState<TTaskItem[]>([])

 
useEffect(()=>{
  if(tasksInf){
    const helpArr=tasksInf?.content.find(elem=>elem.id ==state.miniTaskId)
    helpArr?.sub_tasks && setCompletedTasks(helpArr.sub_tasks.filter(item=>item.status==="completed"))
}
},[tasksInf])

  const onMiniTaskClaim=async()=>{
    let coins:number= completedTasks.reduce((acc, elem) => acc + elem.coins, 0);
    dispatch(updateTotalCoins(coins))
    dispatch(setIsMiniTasks(false))
    await claimTasksCoins(state.miniTaskId)
    queryClient.invalidateQueries({queryKey:['task_inf']})
  }

  
if (isLoading) {
  <div>Загрузка</div>
}else
return (
  <div className={s.mini_tasks_wrapper}>
    <div className={s.intro_img_wrap}>
      <img src={intro_img} className={s.intro_img} />
    </div>
    <div className={s.mini_tasks_subtitle}>Complete extra tasks</div>
    <div className={s.mini_tasks_list}>
      {tasksInf && tasksInf?.content.filter(elem=>elem.id ==state.miniTaskId).map((item)=>{
        return item.sub_tasks && item.sub_tasks.map(((el,index)=>(
          <TaskItem  {...el} key={index} />
        )
        ))
      })}
    </div>
    <div className={s.claim_btn}>
      {completedTasks.length !==0 &&<MainBtn event={()=>onMiniTaskClaim()}>Claim</MainBtn>}
      {!completedTasks && <MainBtn  backColor='#818181'>Claim</MainBtn>}
    </div>
  </div>            
);
}