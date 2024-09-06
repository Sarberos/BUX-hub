import { TTaskItem } from '@shared/Tasks/hooks/useGetTasksInf'
import default_ico from '@shared/Tasks/assets/tasks_img/Mask group600px_new_fire_ico.svg'
import s from '@widgets/Tasks/TaskItem/TaskItem.module.scss'
import { useStartTask } from '@shared/Tasks/hooks/useStartTask'
import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi'
import { useTranslation } from 'react-i18next'
import success_arrow from '@shared/Tasks/assets/tasks_img/success_arrow.svg'
import { useAppDispatch } from '@shared/utilits/redux/hooks'
import { setIsMiniTasks, setMiniTaskId, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice'
import { useQueryClient } from '@tanstack/react-query'
import { useTgSubscribe } from '@shared/Tasks/hooks/useTgSubscribe'
import { EnumTaskStatus } from '@shared/Tasks/consts/taskStatus'
import { apiUrl } from '@shared/utilits/axios/axiosSetting'




export default function({title,sub_tasks,coins,id,link,status,main_task_id, channel_link, claimTasksCoins}:TTaskItem&{claimTasksCoins?:(value:number)=>void}){
    const queryClient = useQueryClient()
    const {t}=useTranslation()
    const dispatch = useAppDispatch()
    const {user,openLink}=useTelegramApi()

    const {mutateAsync:startTask,}=useStartTask()
    const {mutateAsync:checkTgSubs,}=useTgSubscribe()

    const handleStart= async(id:number)=>{
        const redLink:string=encodeURIComponent(link)
        await startTask(id)
        openLink(apiUrl+`task/goToLink/${user?.id}/${redLink}/${id}`)
        queryClient.invalidateQueries({queryKey:['task_inf']})
    }
    const handleTgStart=async(id:number)=>{
        await startTask(id)
        checkTgSubs(id);
        channel_link && openLink(channel_link);
    }
    const handleClaim=(id:number)=>{
        claimTasksCoins && claimTasksCoins(id)
        dispatch(updateTotalCoins(coins))
        queryClient.invalidateQueries({queryKey:['task_inf']})
        queryClient.invalidateQueries({queryKey:['farm_info']})
    }
    const handleOpen=(id:number)=>{
        dispatch(setMiniTaskId(id))
        dispatch(setIsMiniTasks(true)); 
        queryClient.invalidateQueries({queryKey:['task_inf']})
    }
 

const helpFunc=(channel_link:string,id:number)=>{
    checkTgSubs(id);
    openLink(channel_link)
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
            {(sub_tasks?.length === 0 && status === 'pending') || (main_task_id && status === 'pending') ? (  
                <button onClick={!channel_link ? () => { handleStart(id) } : () => { handleTgStart(id) }} className={s.status_btn}>  
                    {t("start")}  
                </button>  
                ) : null}  
            {sub_tasks&&sub_tasks.length!==0 && <button onClick={()=>handleOpen(id)} className={s.status_btn}>{t("open")}</button>}
            {main_task_id!==null && status ==='completed' && 
            <button disabled={true} className={`${s.status_btn} ${s.success}`}>
                <img src={success_arrow} className={s.success_img}/>
            </button>}
            {sub_tasks?.length===0 && main_task_id===null && status==='completed' && <button onClick={()=>{handleClaim(id)}} className={`${s.status_btn}`}>{t("Claim")}</button>} 
            
            {sub_tasks?.length===0 && status===EnumTaskStatus.CLAIMED && <button  onClick={()=>{ channel_link ===null? openLink(link):channel_link?  helpFunc(channel_link,id):''}} className={`${s.status_btn} ${s.disable}`}>{t("Claim")}</button>} 
            { sub_tasks && sub_tasks.length==0 && status===EnumTaskStatus.IN_PROGRESS && <button  onClick={()=>{ channel_link ===null? openLink(link):channel_link?  helpFunc(channel_link,id):''}} className={`${s.status_btn} ${s.disable}`}>{t("Claim")}</button>} 
        </div>
    )
}



