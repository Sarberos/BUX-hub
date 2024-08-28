import s from '@pages/Tasks/Tasks.module.scss'
import {useState,useEffect} from 'react'
import { TTaskItem, useGetTasksInf } from '@shared/Tasks/hooks/useGetTasksInf';
import TaskItem from '@widgets/Tasks/TaskItem/TaskItem'
import MainBtn from '@widgets/UI/MainBtn/MainBtn';
import { useAppDispatch } from '@shared/utilits/redux/hooks';
import { callIsLoading, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice';
import { Preloader } from '@widgets/UI/Preloader/Preloader';
import { useTranslation } from 'react-i18next';
import { useClaimTasksCoins } from '@shared/Tasks/hooks/useClaimTasksCoins';

export const Tasks=()=>{
  const {t}= useTranslation()
  const dispatch=useAppDispatch()

  const {data:tasksList,isLoading:taskInfoLoading}=useGetTasksInf()
  const {mutate:claimTasksCoins}=useClaimTasksCoins()
  
  const [compliteTasks,setcompliteTasks]=useState<TTaskItem[]>()
  
  // const ytu= encodeURIComponent()
  useEffect(()=>{
    dispatch(callIsLoading(taskInfoLoading))
  },[taskInfoLoading])
  useEffect(()=>{   
      if(tasksList){
        const compliteTasks=tasksList.content.filter(item=>item.status==='completed')
        setcompliteTasks(compliteTasks)
      }
    },[tasksList])

const onClaim=()=>{
  let coins:number=0;
  compliteTasks?.map(item=>{
    coins+=item.coins
    claimTasksCoins(item.id);
  })
  dispatch(updateTotalCoins(coins))
}
if(taskInfoLoading){
  return <Preloader />
}else 
  return (
      <div className={s.task_wrapper}>
        <div className={s.title_wrap} >
          <div className={s.title}>{t("tasks")}</div>
          <div className={s.subtitle}>{t("tasksSub")}</div>
        </div>     
          <div className={s.task_list}>
            {tasksList?.content.map((elem, index) => (
              <TaskItem
                {...elem}
                key={index}
              />
            ))}
          </div>
        <div className={ compliteTasks?.length!==0 ? `${s.main_claim_btn} ${s.disable}`:`${s.main_claim_btn}`}>
          <MainBtn event={()=>onClaim()}>{t("claim")}</MainBtn>
        </div>
      </div>
    );
}