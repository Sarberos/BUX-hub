import { TTaskItem } from '@shared/Tasks/hooks/useGetTasksInf'
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
import { TASKSIMG } from '@shared/Tasks/consts/task_ico'
import { ReactNode, useEffect, useState } from 'react'






export default function({icon,title,sub_tasks,coins,id,link,status,main_task_id, channel_link, claimTasksCoins}:TTaskItem&{claimTasksCoins?:(value:number)=>void}){
    const queryClient = useQueryClient()
    const {t}=useTranslation()
    const dispatch = useAppDispatch()
    const {tg,user,openLink}=useTelegramApi()
    
    const {mutateAsync:startTask,}=useStartTask()
    const {mutateAsync:checkTgSubs,}=useTgSubscribe()

    const [currentBtn, setCurrentBtn]=useState<ReactNode>()

    const handleStart= async(id:number)=>{
        await startTask(id)
        const redLink:string=encodeURIComponent(link)
        openLink(apiUrl+`task/goToLink/${user?.id}/${redLink}/${id}`)
        queryClient.invalidateQueries({queryKey:['task_inf']})
    }
    const handleTgStart=async(id:number)=>{
        await startTask(id)
        checkTgSubs(id);
        channel_link && tg.openTelegramLink(channel_link);
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
    const secondTgLinkOpen = (channel_link: string, id: number) => {
        status!==EnumTaskStatus.CLAIMED &&checkTgSubs(id);
        tg.openTelegramLink(channel_link);
        queryClient.invalidateQueries({queryKey:['task_inf']})
    };
    const secondLinkOpen=(tg_id:number,link:string,id:number)=>{
        const redLink:string=encodeURIComponent(link)
        openLink(apiUrl+`task/goToLink/${tg_id}/${redLink}/${id}`)
        queryClient.invalidateQueries({queryKey:['task_inf']})
    }

    const chooseBtn=(status:"in-progress" | "pending" | "completed" | "claimed",main_task_id:number|null,channel_link:string|null, id:number,sub_tasks:TTaskItem[])=>{
        let currentBtn:ReactNode;
        if(!main_task_id){
            if (sub_tasks&&sub_tasks.length!==0) {
                currentBtn = status!==EnumTaskStatus.CLAIMED ?<button onClick={()=>handleOpen(id)} className={s.status_btn}>{t("open")}</button> :status===EnumTaskStatus.CLAIMED ? (<button onClick={()=>handleOpen(id)} className={`${s.status_btn} ${s.completed}`}>
                <img src={success_arrow} className={s.success_img}/>
            </button>): '';
            }else if (sub_tasks.length ===0 ){
            switch (status) {
                case EnumTaskStatus.PENDING:
                    currentBtn= <button onClick={!channel_link ? () => { handleStart(id) } : () => { handleTgStart(id) }} className={s.status_btn}>{t("start")} </button> 
                    break;
            
                case EnumTaskStatus.COMPLETED:
                    currentBtn = <button onClick={()=>{handleClaim(id)}} className={`${s.status_btn}`}>{t("Claim")}</button>
                    break;
            
                case EnumTaskStatus.CLAIMED:
                    currentBtn = <button  onClick={()=>{ !channel_link? openLink(link):channel_link? tg.openTelegramLink(channel_link):''}} className={`${s.status_btn} ${s.disable}`}>{t("Claim")}</button>
                    break;
                case EnumTaskStatus.IN_PROGRESS:
                    currentBtn = user && <button  onClick={()=>{ !channel_link? secondLinkOpen(user.id,link,id):channel_link ?  secondTgLinkOpen(channel_link,id):''}} className={`${s.status_btn} ${s.disable}`}>{t("Claim")}</button>
                    break;
            }
        }
        }else if(main_task_id){
            switch (status) {
                case EnumTaskStatus.PENDING:
                    currentBtn= <button onClick={!channel_link ? () => { handleStart(id) } : () => { handleTgStart(id) }} className={s.status_btn}>{t("start")} </button> 
                    break;
            
                case EnumTaskStatus.COMPLETED:
                    currentBtn = <button onClick={()=>{ !channel_link? openLink(link):channel_link? tg.openTelegramLink(channel_link):''}} className={`${s.status_btn} ${s.success}`}>
                        <img src={success_arrow} className={s.success_img}/>
                    </button>
                    break;
            
                case EnumTaskStatus.CLAIMED:
                    currentBtn = <button onClick={()=>{ !channel_link? openLink(link):channel_link? tg.openTelegramLink(channel_link):''}} className={`${s.status_btn} ${s.success}`}>
                    <img src={success_arrow} className={s.success_img}/>
                    </button>
                    break;
                case EnumTaskStatus.IN_PROGRESS:
                    currentBtn = user && <button  onClick={()=>{ !channel_link? secondLinkOpen(user?.id,link,id):channel_link?  secondTgLinkOpen(channel_link,id):''}} className={`${s.status_btn} ${s.disable}`}>{t("Claim")}</button>
                    break;
            }
        }
        return currentBtn
    }

    useEffect(()=>{
        setCurrentBtn(chooseBtn(status,main_task_id,channel_link,id,sub_tasks))
    },[status,main_task_id,channel_link,id,sub_tasks])

    return (
        <div className={s.task_item_wrap}>
            <div className={s.info}>
                <div className={s.info_img_wrap}>
                    <img src={TASKSIMG[icon]} alt="" className={s.info_img} />
                </div>
                <div className={s.item_title_wrap}>
                    <p className={s.item_title}>{title}</p>
                    <p className={s.item_subtitle}>{sub_tasks && sub_tasks.length!==0 ? `${sub_tasks.filter((item)=>{
                        return item.status===EnumTaskStatus.COMPLETED || item.status===EnumTaskStatus.CLAIMED
                    }) }/${sub_tasks.length} tasks, +${coins} `:`+${coins}`}</p>
                </div>
            </div>
            {currentBtn}

            {/* {(sub_tasks?.length === 0 && status === 'pending') || (main_task_id && status === 'pending') ? (  
                <button onClick={!channel_link ? () => { handleStart(id) } : () => { handleTgStart(id) }} className={s.status_btn}>  
                    {t("start")}  
                    
                </button>  
                ) : null}  
            {(sub_tasks&&sub_tasks.length!==0 &&status!==EnumTaskStatus.CLAIMED) && <button onClick={()=>handleOpen(id)} className={s.status_btn}>{t("open")}</button>}
            {(sub_tasks&&sub_tasks.length!==0 && status===EnumTaskStatus.CLAIMED) &&
            <button onClick={()=>handleOpen(id)} className={`${s.status_btn} ${s.completed}`}>
                <img src={success_arrow} className={s.success_img}/>
            </button>}
            {(main_task_id!==null && status ===EnumTaskStatus.IN_PROGRESS) && <button onClick={()=>{user && secondLinkOpen(user?.id,link,id)}} className={s.status_btn}>  
                    {t("start")}  
                </button>}

            {main_task_id!==null && status ==='completed' && 
            <button onClick={()=>{openLink(link)}} className={`${s.status_btn} ${s.success}`}>
                <img src={success_arrow} className={s.success_img}/>
            </button>}
            {sub_tasks?.length===0 && main_task_id===null && status==='completed' && <button onClick={()=>{handleClaim(id)}} className={`${s.status_btn}`}>{t("Claim")}</button>} 
            
            {sub_tasks?.length===0 && status===EnumTaskStatus.CLAIMED && <button  onClick={()=>{ channel_link ===null? openLink(link):channel_link?  secondTgLinkOpen(channel_link,id):''}} className={`${s.status_btn} ${s.disable}`}>{t("Claim")}</button>} 
            { sub_tasks && sub_tasks.length==0 && status===EnumTaskStatus.IN_PROGRESS && <button  onClick={()=>{ channel_link ===null? openLink(link):channel_link?  secondTgLinkOpen(channel_link,id):''}} className={`${s.status_btn} ${s.disable}`}>{t("Claim")}</button>}  */}
        </div>
    )
}



