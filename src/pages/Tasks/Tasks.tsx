import s from '@pages/Tasks/Tasks.module.scss'
import { TASKLIST } from '@shared/Tasks/consts/tasks_list'
import MiniTasks from '@widgets/Tasks/MiniTasks/MiniTasks';
import TaskItem from '@widgets/Tasks/TaskItem/TaskItem'
import PopUp from '@widgets/UI/PopUp/PopUp';

export const Tasks=({setMiniTasksOpen,miniTaskOpen}:{miniTaskOpen: boolean, setMiniTasksOpen: (value:boolean)=> void })=>{
    const miniTaskStyle:React.CSSProperties=miniTaskOpen ?{zIndex:-1} :{}

  return (
      <div className={s.task_wrapper}>
        <div style={miniTaskStyle}className={s.title_wrap} >
          <div className={s.title}>Tasks</div>
          <div className={s.subtitle}>Complete tasks and get more points</div>
        </div>
        
        <ul style={miniTaskStyle} className={s.task_list}>
          {TASKLIST.map((elem, index) => (
            <TaskItem
              openMiniTasks={()=>setMiniTasksOpen(true)}
              icoUrl={elem.icoUrl}
              isMiniTasks={elem.isMiniTasks}
              reward={elem.reward}
              title={elem.title}
              minitasksAmount={elem.minitasksAmount}
              key={index}
            />
          ))}
        </ul>
        <div className={miniTaskOpen ?`${s.mini_tasks_wrap} ${s.active}` :`${s.mini_tasks_wrap}`}>
              <PopUp onClose={()=>setMiniTasksOpen(false)}>
                <MiniTasks />
              </PopUp>
            </div>
      </div>
    );
}