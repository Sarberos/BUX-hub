import s from '@pages/Tasks/Tasks.module.scss'
import { TASKLIST } from '@shared/Tasks/consts/tasks_list'
import TaskItem from '@widgets/Tasks/TaskItem/TaskItem'

export const Tasks=()=>{
    return (
      <div className={s.task_wrapper}>
        <div className={s.title_wrap}>
          <div className={s.title}>Tasks</div>
          <div className={s.subtitle}>Complete tasks and get more points</div>
        </div>
        <ul className={s.task_list}>
          {TASKLIST.map((elem, index) => (
            <TaskItem
              icoUrl={elem.icoUrl}
              isMiniTasks={elem.isMiniTasks}
              reward={elem.reward}
              title={elem.title}
              minitasksAmount={elem.minitasksAmount}
              key={index}
            />
          ))}
        </ul>
      </div>
    );
}