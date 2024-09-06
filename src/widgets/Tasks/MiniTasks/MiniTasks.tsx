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
import { useTranslation } from 'react-i18next'
import { Preloader } from '@widgets/UI/Preloader/Preloader'
import { EnumTaskStatus } from '@shared/Tasks/consts/taskStatus'



export const MiniTasks = ()=>{
  const {t} = useTranslation()
  const queryClient =useQueryClient()
  const dispatch=useAppDispatch()
  const {data:tasksInf,isLoading}=useGetTasksInf()
  const {mutate:claimTasksCoins}=useClaimTasksCoins()
  const state = useAppSelector(state=>state.home)
  const [completedTasks , setCompletedTasks]=useState<TTaskItem[]>([])
  const [mainTask, setMainTask]=useState<TTaskItem>()

 
useEffect(()=>{
  if(tasksInf){
    setMainTask(tasksInf?.content.find(elem=>elem.id ==state.miniTaskId))
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
    queryClient.invalidateQueries({queryKey:['farm_info']})
  }

  
if (isLoading) {
  <Preloader/>
}else
return (
  <div className={s.mini_tasks_wrapper}>
    <div className={s.intro_img_wrap}>
      <img src={intro_img} className={s.intro_img} />
    </div>
    <div className={s.mini_tasks_subtitle}>{t("miniTasksTitile")}</div>
    <div className={s.mini_tasks_list}>
      {tasksInf && tasksInf?.content.filter(elem=>elem.id ==state.miniTaskId).map((item)=>{
        return item.sub_tasks && item.sub_tasks.map(((el,index)=>(
          <TaskItem  {...el} key={index} />
        )
        ))
      })}

    </div>
    <div className={s.claim_btn}>
      {mainTask?.status===EnumTaskStatus.COMPLETED &&<MainBtn event={()=>onMiniTaskClaim()}>{t("claim")}</MainBtn>}
      {mainTask?.status===EnumTaskStatus.CLAIMED &&  <MainBtn disabled={true}  backColor='#818181'>{t("claim")}</MainBtn>}
    </div>
  </div>            
);
}