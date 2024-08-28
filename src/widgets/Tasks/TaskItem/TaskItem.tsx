import { TTaskItem } from '@shared/Tasks/hooks/useGetTasksInf'
import default_ico from '@shared/Tasks/assets/tasks_img/tasksFire.svg'
import s from '@widgets/Tasks/TaskItem/TaskItem.module.scss'
import { useStartTask } from '@shared/Tasks/hooks/useStartTask'
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi'
import { useTranslation } from 'react-i18next'
import success_arrow from '@shared/Tasks/assets/tasks_img/success_arrow.svg'
import { useAppDispatch } from '@shared/utilits/redux/hooks'
import { setIsMiniTasks } from '@shared/utilits/redux/redux_slice/home_slice'
import { TStartLinkTaskF, useStartLinkTask } from '@shared/Tasks/hooks/useStartLinkTask'




export default function({title,sub_tasks,coins,id,link,status}:TTaskItem){
    const {t}=useTranslation()
    const {user}=useTelegramApi()
    const dispatch = useAppDispatch()
    const {mutate:startTask,}=useStartTask()
    const {mutate:startLinkTask,}=useStartLinkTask()
    const{openLink}=useTelegramApi()
    const handleStart=(starInfo:Omit<TStartLinkTaskF,'telegram_id'>& {telegram_id:number |undefined})=>{
        const {id,link,telegram_id}=starInfo
        telegram_id && link && startLinkTask({id,link,telegram_id});
        !link && startTask(id)
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
            {status==='pending' && <button onClick={()=>{handleStart({id,link,telegram_id:user?.id})}} className={s.status_btn}>{t("start")}</button>}
            {false && 
            <button disabled={true} className={`${s.status_btn} ${s.success}`}>
                <img src={success_arrow} className={s.success_img}/>
            </button>}
            {sub_tasks.length !==0 && status!=='pending' && <button onClick={()=>{dispatch(setIsMiniTasks(true))}} className={s.status_btn}>{t("open")}</button>}
    
        </div>
    )
}