import s from '@pages/Tasks/Tasks.module.scss'
import { TTaskItem, useGetTasksInf } from '@shared/Tasks/hooks/useGetTasksInf';
import TaskItem from '@widgets/Tasks/TaskItem/TaskItem'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks';
import {setIsMiniTasks } from '@shared/utilits/redux/redux_slice/home_slice';
import { Preloader } from '@widgets/UI/Preloader/Preloader';
import { useTranslation } from 'react-i18next';
import { useClaimTasksCoins } from '@shared/Tasks/hooks/useClaimTasksCoins';
import PopUp from '@widgets/UI/PopUp/PopUp';
import {useEffect, useState} from 'react'
import { MiniTasks } from '@widgets/Tasks/MiniTasks/MiniTasks';

export const Tasks=()=>{
  const {t}= useTranslation()
  const dispatch=useAppDispatch()
  const state = useAppSelector(state=>state.home)

  const {data:tasksInf,isLoading:taskInfoLoading}=useGetTasksInf()
  const {mutate:claimTasksCoins}=useClaimTasksCoins()
  const [tasksList , setTasksList]=useState<TTaskItem[]>([])

useEffect(()=>{
  if(tasksInf){
    setTasksList(tasksInf.content)
  }
},[tasksInf])

  

if(taskInfoLoading){
  return <Preloader />
}else 
  return (
  <>
   {!state.isMiniTasks &&  <div className={state.isMiniTasks ?`${s.mini_tasks_wrap} ${s.active}` :`${s.mini_tasks_wrap}`}>
    <PopUp onClose={()=>dispatch(setIsMiniTasks(false))}>
      <MiniTasks tasksList={tasksList}/>
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