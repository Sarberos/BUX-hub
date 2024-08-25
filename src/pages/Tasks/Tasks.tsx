import s from '@pages/Tasks/Tasks.module.scss'
import { useGetTasksInf } from '@shared/Tasks/hooks/useGetTasksInf';
// import MiniTasks from '@widgets/Tasks/MiniTasks/MiniTasks';
import TaskItem from '@widgets/Tasks/TaskItem/TaskItem'
import PopUp from '@widgets/UI/PopUp/PopUp';

export const Tasks=({setMiniTasksOpen,miniTaskOpen}:{miniTaskOpen: boolean, setMiniTasksOpen: (value:boolean)=> void })=>{
    const miniTaskStyle:React.CSSProperties=miniTaskOpen ?{zIndex:-1} :{}
    const {data:tasksList}=useGetTasksInf()
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
        <div className={miniTaskOpen ?`${s.mini_tasks_wrap} ${s.active}` :`${s.mini_tasks_wrap}`}>
              <PopUp onClose={()=>setMiniTasksOpen(false)}>
                {/* <MiniTasks /> */}
              </PopUp>
            </div>
      </div>
    );
}