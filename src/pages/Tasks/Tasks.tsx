import s from '@pages/Tasks/Tasks.module.scss'
import {TTaskItem, useGetTasksInf } from '@shared/Tasks/hooks/useGetTasksInf';
import TaskItem from '@widgets/Tasks/TaskItem/TaskItem'
import {useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks';
import { Preloader } from '@widgets/UI/Preloader/Preloader';
import { useTranslation } from 'react-i18next';
import { useClaimTasksCoins } from '@shared/Tasks/hooks/useClaimTasksCoins';
import { setIsMiniTasks, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice';
import PopUp from '@widgets/UI/PopUp/PopUp';
import { MiniTasks } from '@widgets/Tasks/MiniTasks/MiniTasks';
import { useQueryClient } from '@tanstack/react-query';
import {useEffect,useState} from 'react'

export const Tasks=()=>{
  const {t}= useTranslation()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const state = useAppSelector(state=>state.home)

  const {data:tasksInf,isLoading:taskInfoLoading}=useGetTasksInf()
  const {mutate:claimTasksCoins}=useClaimTasksCoins()
  
  const [tasksList , setTasksList]=useState<TTaskItem[]>([])
  const [completedTasks , setCompletedTasks]=useState<TTaskItem[]>([])

  console.log('TASK MINITASK STATUS'+ state.isMiniTasks);
  
useEffect(()=>{
  if (tasksInf) {
    setTasksList(tasksInf.content.filter(elem=>elem.id ===state.miniTaskId)[0].sub_tasks)
    setCompletedTasks(tasksInf.content.filter(elem=>elem.id ===state.miniTaskId)[0].sub_tasks.filter(elem=>elem.status==='completed'))
  }
},[tasksInf])



const onMiniTaskClaim=()=>{
  let coins:number= completedTasks.reduce((acc, elem) => acc + elem.coins, 0);
  dispatch(updateTotalCoins(coins))
  dispatch(setIsMiniTasks(false))
  queryClient.invalidateQueries({queryKey:['task_inf']})
}


if(taskInfoLoading){
  return <Preloader />
}else 
  return (
    <>
{state.isMiniTasks &&  <div className={state.isMiniTasks ?`${s.mini_tasks_wrap} ${s.active}` :`${s.mini_tasks_wrap}`}>
    <PopUp onClose={()=>dispatch(setIsMiniTasks(false))}>
      <MiniTasks completedTasks={completedTasks } onMiniTaskClaim={onMiniTaskClaim} tasksList={tasksList} />
    </PopUp>
  </div> }
    <div className={s.task_wrapper}>
      <div className={s.title_wrap} >
        <div className={s.title}>{t("tasks")}</div>
        <div className={s.subtitle}>{t("tasksSub")}</div>
      </div>     
        <div className={s.task_list}>
          {tasksInf?.content.filter(elem=>elem.status!=='claimed').map((elem, index) => 
            <TaskItem
            claimTasksCoins={claimTasksCoins}
              {...elem}
              key={index}
            />
          )}
        </div>
    </div>
    </>
    );

}