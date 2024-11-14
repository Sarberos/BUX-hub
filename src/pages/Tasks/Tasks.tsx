import s from '@pages/Tasks/Tasks.module.scss'
import {useGetTasksInf } from '@shared/Tasks/hooks/useGetTasksInf';
import TaskItem from '@widgets/Tasks/TaskItem/TaskItem'
import {useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks';
import { Preloader } from '@widgets/UI/Preloader/Preloader';
import { useTranslation } from 'react-i18next';
import { useClaimTasksCoins } from '@shared/Tasks/hooks/useClaimTasksCoins';
import { setIsMiniTasks } from '@shared/utilits/redux/redux_slice/home_slice';
import PopUp from '@widgets/UI/PopUp/PopUp';
import { MiniTasks } from '@widgets/Tasks/MiniTasks/MiniTasks';
import {SuccessClaimAnim} from "@widgets/UI/SuccessClaim/SuccessClaimAnim.tsx";
import {useState} from "react";

export default function Tasks(){
  const {t}= useTranslation()
  const dispatch = useAppDispatch()
  const state = useAppSelector(state=>state.home)

  const {data:tasksInf,isLoading:taskInfoLoading}=useGetTasksInf()
  const {mutate:claimTasksCoins}=useClaimTasksCoins()
  const [isFireCracker, setIsFireCracker] = useState<boolean>(false)




if(taskInfoLoading){
  return <Preloader />
}else
  return (
    <>
{state.isMiniTasks &&  <div className={state.isMiniTasks ?`${s.mini_tasks_wrap} ${s.active}` :`${s.mini_tasks_wrap}`}>
    <PopUp onClose={()=>dispatch(setIsMiniTasks(false))}>
      <MiniTasks  />
    </PopUp>
  </div> }
      <div className={s.task_wrapper}>
        <div className={s.title_wrap}>
          <div className={s.title}>{t("tasks")}</div>
          <div className={s.subtitle}>{t("tasksSub")}</div>
        </div>
        <div className={s.task_list_bg}></div>
        <div className={isFireCracker ? `${s.task_list_single_anim} ${s.active}` : s.task_list_single_anim}>
          {isFireCracker && <SuccessClaimAnim/>}
        </div>
        <div className={s.task_list}>
          {/* {TASKLIST.map((elem, index) =>
            <TaskItem
            claimTasksCoins={claimTasksCoins}
              {...elem}
              key={index}
            />
          )} */}
          {tasksInf?.content.map((elem,index) =>
            <TaskItem
              claimTasksCoins={claimTasksCoins}
              {...elem}
              setIsFireCracker={setIsFireCracker}
              index={index}
              key={`task-item-${elem.id}`}
            />
          )}
        </div>
      </div>
    </>
  );

}