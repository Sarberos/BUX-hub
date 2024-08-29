import s from './MiniTasks.module.scss'
import intro_img from '@shared/Tasks/assets/tasks_img/Tasks_intro.png'
import TaskItem from '../TaskItem/TaskItem'
import { TTaskItem } from '@shared/Tasks/hooks/useGetTasksInf'
import { useState ,useEffect} from 'react'
import { useAppSelector } from '@shared/utilits/redux/hooks'



export const MiniTasks = ({allTasks}:{allTasks:TTaskItem[]|undefined})=>{
  // const queryClient =useQueryClient()
  // const dispatch=useAppDispatch()
  const state = useAppSelector(state=>state.home)
  const [tasksList , setTasksList]=useState<TTaskItem[]>([])
  // const [completedTasks , setCompletedTasks]=useState<TTaskItem[]>([])

  useEffect(()=>{
    if (allTasks) {
      setTasksList(allTasks.filter(elem=>elem.id ===state.miniTaskId)[0].sub_tasks)
      // setCompletedTasks(tasksInf.content.filter(elem=>elem.id ===state.miniTaskId)[0].sub_tasks.filter(elem=>elem.status==='completed'))
    }
  },[allTasks])


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
      {tasksList.map((elem, index) => (
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