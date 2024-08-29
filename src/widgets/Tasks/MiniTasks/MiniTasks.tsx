import s from './MiniTasks.module.scss'
import intro_img from '@shared/Tasks/assets/tasks_img/Tasks_intro.png'
import TaskItem from '../TaskItem/TaskItem'
import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { TTaskItem } from '@shared/Tasks/hooks/useGetTasksInf'
import {useState,useEffect}from 'react'
import { setIsMiniTasks, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice'
import { useQueryClient } from '@tanstack/react-query'



export const MiniTasks = ({tasksList}:{tasksList:TTaskItem[]|undefined})=>{

  const dispatch= useAppDispatch()
  const queryClient =useQueryClient()
  const homeState=useAppSelector(state=>state.home)

  const [completedTasks,setCompletedTasks]=useState<TTaskItem[]>([])
  
  useEffect(()=>{
    if(tasksList){
      const helpTaskList:TTaskItem[]|[]=tasksList.filter(elem=>elem.id===homeState.miniTaskId)
      const complTsksList:TTaskItem[]=helpTaskList.length!=0 ? helpTaskList[0].sub_tasks.filter(elem=>elem.status==='completed'):[]
      complTsksList.length!=0 && setCompletedTasks(complTsksList)
  }
  },[tasksList])
const onMiniTaskClaim=()=>{
  let coins:number= completedTasks.reduce((acc, elem) => acc + elem.coins, 0);
  dispatch(updateTotalCoins(coins))
  dispatch(setIsMiniTasks(false))
  queryClient.invalidateQueries({queryKey:['task_inf']})
}

return (
  <div className={s.mini_tasks_wrapper}>
    <div className={s.intro_img_wrap}>
      <img src={intro_img} className={s.intro_img} />
    </div>
    <div className={s.mini_tasks_subtitle}>Complete extra tasks</div>
    <div className={s.mini_tasks_list}>
      {tasksList && tasksList.length!==0 ? tasksList.filter(elem=>elem.id===homeState.miniTaskId)[0].sub_tasks.map((elem, index) => (
        <TaskItem  {...elem} key={index} />
      )): ''}
    </div>
    <div className={s.claim_btn}>
      {completedTasks && completedTasks.length !==0 &&<MainBtn event={()=>onMiniTaskClaim()}>Claim</MainBtn>}
      {!completedTasks && <MainBtn >No Claim</MainBtn>}
    </div>
  </div>            
);
}