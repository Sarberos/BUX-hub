import { TTaskItemProps } from '@shared/Tasks/types/tasks'
import s from '@widgets/Tasks/TaskItem/TaskItem.module.scss'




export default function({icoUrl,title,reward, minitasksAmount, isMiniTasks}:TTaskItemProps){
    return (
        <div className={s.task_item_wrap}>
            <div className={s.info}>
                <div className={s.info_img_wrap}>
                    <img src={icoUrl} alt="" className={s.info_img} />
                </div>
                <div className={s.item_title_wrap}>
                    <p className={s.item_title}>{title}</p>
                    <p className={s.item_subtitle}>{isMiniTasks ? `0/${minitasksAmount} tasks, +${reward} `:`+${reward}`}</p>
                </div>
            </div>
            <button className={s.status_btn}>{isMiniTasks ? 'Open' : 'Start'}</button>
        </div>
    )
}