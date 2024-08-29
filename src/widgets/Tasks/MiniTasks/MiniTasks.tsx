import s from './MiniTasks.module.scss'
import intro_img from '@shared/Tasks/assets/tasks_img/Tasks_intro.png'
import TaskItem from '../TaskItem/TaskItem'
import {useGetTasksInf } from '@shared/Tasks/hooks/useGetTasksInf'
// import { useState ,useEffect} from 'react'



export const MiniTasks = ()=>{
  // const queryClient =useQueryClient()
  // const dispatch=useAppDispatch()
  const {data:tasksInf}=useGetTasksInf()
  // const state = useAppSelector(state=>state.home)
  // const [completedTasks , setCompletedTasks]=useState<TTaskItem[]>([])

 


  // const onMiniTaskClaim=()=>{
  //   let coins:number= completedTasks.reduce((acc, elem) => acc + elem.coins, 0);
  //   dispatch(updateTotalCoins(coins))
  //   dispatch(setIsMiniTasks(false))
  //   queryClient.invalidateQueries({queryKey:['task_inf']})
  // }
  

return (
  <div className={s.mini_tasks_wrapper}>
    <div className={s.intro_img_wrap}>
      <img src={intro_img} className={s.intro_img} />
    </div>
    <div className={s.mini_tasks_subtitle}>Complete extra tasks</div>
    <div className={s.mini_tasks_list}>
      {tasksInf?.content.map((elem, index) => (
        <TaskItem  {...elem} key={index} />
      ))}
    </div>
    {/* <div className={s.claim_btn}>
      {completedTasks.length !==0 &&<MainBtn event={()=>onMiniTaskClaim()}>Claim</MainBtn>}
      {!completedTasks && <MainBtn >No Claim</MainBtn>}
    </div> */}
  </div>            
);
}