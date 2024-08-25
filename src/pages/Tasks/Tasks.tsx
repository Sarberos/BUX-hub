import s from '@pages/Tasks/Tasks.module.scss'
import {useState,useEffect} from 'react'
import { TTaskItem, useGetTasksInf } from '@shared/Tasks/hooks/useGetTasksInf';
// import MiniTasks from '@widgets/Tasks/MiniTasks/MiniTasks';
import TaskItem from '@widgets/Tasks/TaskItem/TaskItem'
import MainBtn from '@widgets/UI/MainBtn/MainBtn';
import PopUp from '@widgets/UI/PopUp/PopUp';
import { useAppDispatch } from '@shared/utilits/redux/hooks';
import { callIsLoading, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice';

export const Tasks=({setMiniTasksOpen,miniTaskOpen}:{miniTaskOpen: boolean, setMiniTasksOpen: (value:boolean)=> void })=>{
  const dispatch=useAppDispatch()
  const {data:tasksList,isLoading:taskInfoLoading}=useGetTasksInf()
  
  const [completeTasks,setcompliteTasks]=useState<TTaskItem[]>()
  
  useEffect(()=>{
    debugger
    dispatch(callIsLoading(taskInfoLoading))
    tasksList&&callIsLoading(false)
  },[taskInfoLoading,tasksList])
  useEffect(()=>{   
      if(tasksList){
        const compliteTasks=tasksList.content.filter(item=>item.status==='claim')
        setcompliteTasks(compliteTasks)
      }
    },[tasksList])

const onClaim=()=>{
  let coins:number=0;
  completeTasks?.map(item=>{
    coins+=item.coins
  })
  dispatch(updateTotalCoins(coins))
}
const miniTaskStyle:React.CSSProperties=miniTaskOpen ?{zIndex:-1} :{}
  return (
      <div className={s.task_wrapper}>
        <div style={miniTaskStyle}className={s.title_wrap} >
          <div className={s.title}>Tasks</div>
          <div className={s.subtitle}>Complete tasks and get more points</div>
        </div>
        
        <ul style={miniTaskStyle} className={s.task_list}>
          {tasksList?.content.map((elem, index) => (
            <TaskItem
              openMiniTasks={()=>setMiniTasksOpen(true)}
              {...elem}
              key={index}
            />
          ))}
        </ul>
        <div className={ completeTasks?.length===0 ? `${s.main_claim_btn} ${s.disable}`:`${s.main_claim_btn}`}>
          <MainBtn event={onClaim}>Сlaim</MainBtn>
        </div>
        <div className={miniTaskOpen ?`${s.mini_tasks_wrap} ${s.active}` :`${s.mini_tasks_wrap}`}>
              <PopUp onClose={()=>setMiniTasksOpen(false)}>
                {/* <MiniTasks /> */}
              </PopUp>
            </div>
      </div>
    );
}