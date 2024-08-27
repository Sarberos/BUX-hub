import { TTaskItem } from '@shared/Tasks/hooks/useGetTasksInf'
import default_ico from '@shared/Tasks/assets/tasks_img/tasksFire.svg'
import s from '@widgets/Tasks/TaskItem/TaskItem.module.scss'
import { useStartTask } from '@shared/Tasks/hooks/useStartTask'
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi'




export default function({title,sub_tasks,coins,id,link,openMiniTasks}:TTaskItem&{openMiniTasks?:()=>void}){
    const {mutate:startTask,}=useStartTask()
    const{openLink}=useTelegramApi()
    const handleStart=(id:number)=>{
        startTask(id);
        link && openLink(link)
    }
    return (
        <div className={s.task_item_wrap}>
            <div className={s.info}>
                <div className={s.info_img_wrap}>
                    <img src={default_ico} alt="" className={s.info_img} />
                </div>
                <div className={s.item_title_wrap}>
                    <p className={s.item_title}>{title}</p>
                    <p className={s.item_subtitle}>{sub_tasks && sub_tasks.length!==0 ? `0/${sub_tasks.length} tasks, +${coins} `:`+${coins}`}</p>
                </div>
            </div>
            <button onClick={sub_tasks &&  sub_tasks.length!==0  ? openMiniTasks:()=>{handleStart(id)} } className={s.status_btn}>{sub_tasks && sub_tasks.length!==0  ? 'Open' : 'Start'}</button>
        </div>
    )
}