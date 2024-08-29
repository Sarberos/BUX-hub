import s from '@pages/Tasks/Tasks.module.scss'
import { TTaskItem, useGetTasksInf } from '@shared/Tasks/hooks/useGetTasksInf';
import TaskItem from '@widgets/Tasks/TaskItem/TaskItem'
import {useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks';
import { Preloader } from '@widgets/UI/Preloader/Preloader';
import { useTranslation } from 'react-i18next';
import { useClaimTasksCoins } from '@shared/Tasks/hooks/useClaimTasksCoins';
import {useEffect, useState} from 'react'
import BottomPopUp from '@widgets/UI/BottomPopUp/BottomPopUp';
import { setIsMiniTasks } from '@shared/utilits/redux/redux_slice/home_slice';
// import { MiniTasks } from '@widgets/Tasks/MiniTasks/MiniTasks';

export const Tasks=()=>{
  const {t}= useTranslation()
  const dispatch = useAppDispatch()
  const state = useAppSelector(state=>state.home)

  const {data:tasksInf,isLoading:taskInfoLoading}=useGetTasksInf()
  const {mutate:claimTasksCoins}=useClaimTasksCoins()
  
  const [tasksList , setTasksList]=useState<TTaskItem[]>([])
  const [middleIsMini,setMiddleIsMini]=useState<boolean>(state.isMiniTasks)

  console.log('TASK MINITASK STATUS'+ state.isMiniTasks);
  
useEffect(()=>{
  middleIsMini !== state.isMiniTasks && setMiddleIsMini(state.isMiniTasks)
},[state.isMiniTasks])

useEffect(()=>{
  if(tasksInf){
    const miniTaskList=tasksInf.content.filter(elem=>elem.id===state.miniTaskId);
    setTasksList(miniTaskList)
  }
},[tasksInf])
useEffect(()=>{
  // if(tasksList){
  //   const minitaskCompliteList=tasksList.filter(elem=>elem.status==='completed');
  //   setCompletedTasks(minitaskCompliteList)
  // }
},[tasksList])


// const onMiniTaskClaim=()=>{
//   let coins:number= completedTasks.reduce((acc, elem) => acc + elem.coins, 0);
//   dispatch(updateTotalCoins(coins))
//   dispatch(setIsMiniTasks(false))
//   queryClient.invalidateQueries({queryKey:['task_inf']})
// }


if(taskInfoLoading){
  return <Preloader />
}else 
  return (
    <>
    {middleIsMini &&  <div >
    <BottomPopUp onClose={()=>dispatch(setIsMiniTasks(false))}>
        {/* <MiniTasks /> */}
    </BottomPopUp>
  </div> }
    <div className={s.task_wrapper}>
      <div className={s.title_wrap} >
        <div className={s.title}>{t("tasks")}</div>
        <div className={s.subtitle}>{t("tasksSub")}</div>
      </div>     
        <div className={s.task_list}>
          {tasksInf?.content.filter(elem=>elem.status!=='claimed').map((elem, index) => 
            <TaskItem
            // setminiTaskOpen={setminiTaskOpen}
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