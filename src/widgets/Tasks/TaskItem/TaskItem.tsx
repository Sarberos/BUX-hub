import { TTaskItem } from '@shared/Tasks/hooks/useGetTasksInf'
import default_ico from '@shared/Tasks/assets/tasks_img/tasksFire.svg'
import s from '@widgets/Tasks/TaskItem/TaskItem.module.scss'
import { useStartTask } from '@shared/Tasks/hooks/useStartTask'
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi'
import { useTranslation } from 'react-i18next'
import success_arrow from '@shared/Tasks/assets/tasks_img/success_arrow.svg'
import { useAppDispatch } from '@shared/utilits/redux/hooks'
import { setIsMiniTasks } from '@shared/utilits/redux/redux_slice/home_slice'
import TasksFetching from '@shared/utilits/axios/TasksRequest'




export default function({title,sub_tasks,coins,id,link,status}:TTaskItem){
    const {t}=useTranslation()
    const dispatch = useAppDispatch()
    const {user}=useTelegramApi()

    // const [isStartLinkTask,setIsStartLink]=useState<boolean>(false)

    const {mutate:startTask,}=useStartTask()
    // const {}=useStartLinkTask({id,link,telegram_id:user?.id},isStartLinkTask)

    const handleStart=(id:number)=>{
        link && TasksFetching.startLinkTask({id,link,telegram_id:user?.id});
        !link && startTask(id)
        // link && openLink(link)
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
            {status!=='completed' && <button  disabled={status==='in-progress'} onClick={()=>{handleStart(id)}} className={s.status_btn}>{t("start")}</button>}
            {status ==='completed' && 
            <button disabled={true} className={`${s.status_btn} ${s.success}`}>
                <img src={success_arrow} className={s.success_img}/>
            </button>}
            {sub_tasks.length !==0 && status!=='pending' && <button onClick={()=>{dispatch(setIsMiniTasks(true))}} className={s.status_btn}>{t("open")}</button>}
    
        </div>
    )
}