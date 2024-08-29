import s from './MiniTasks.module.scss'
import intro_img from '@shared/Tasks/assets/tasks_img/Tasks_intro.png'
import TaskItem from '../TaskItem/TaskItem'
import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import { TTaskItem } from '@shared/Tasks/hooks/useGetTasksInf'



export const MiniTasks = ({tasksList,completedTasks,onMiniTaskClaim}:{tasksList:TTaskItem[]|[],completedTasks:TTaskItem[]|[],onMiniTaskClaim:()=>void})=>{
// export const MiniTasks = ()=>{

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
    <div className={s.claim_btn}>
      {completedTasks.length !==0 &&<MainBtn event={()=>onMiniTaskClaim()}>Claim</MainBtn>}
      {!completedTasks && <MainBtn >No Claim</MainBtn>}
    </div>
  </div>            
);
}