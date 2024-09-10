import {  TTaskItem } from '@shared/Tasks/hooks/useGetTasksInf'
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
import { TASKSIMG } from '@shared/Tasks/consts/task_ico'
import { ReactNode, useEffect, useState } from 'react'
import { useCompleteMainTask } from '@shared/Tasks/hooks/complete_mainTasks'
import { LoadBtn } from '../LoadBtn/LoadBtn'



export default function({icon,title,sub_tasks,coins,id,link,status,main_task_id, channel_link, claimTasksCoins}:TTaskItem&{claimTasksCoins?:(value:number)=>void}){
    const queryClient = useQueryClient()
    const {t}=useTranslation()
    const dispatch = useAppDispatch()
    const {tg, userId,openLink}=useTelegramApi()
// const userId =895313334;
// const userId =1213507635;

    const {mutateAsync:startTask,}=useStartTask()
    const {mutateAsync:checkTgSubs,}=useTgSubscribe()
    const {mutateAsync:completeMainTask}=useCompleteMainTask()

    const [currentBtn, setCurrentBtn]=useState<ReactNode>()

    const handleStart= async(id:number,link:string)=>{
        await startTask(id);
        openLink(link)
        queryClient.invalidateQueries({queryKey:['task_inf']})
    }
    const handleSubStart= async(id:number,link:string,main_task_id: number)=>{
        await startTask(id);
        openLink(link)
        completeMainTask(main_task_id);
        queryClient.invalidateQueries({queryKey:['task_inf']})
    }
    const handleTgStart=async(id:number)=>{
        await startTask(id)
        channel_link && tg.openTelegramLink(channel_link);
        checkTgSubs(id);
        queryClient.invalidateQueries({queryKey:['task_inf']})
        setTimeout(async () => {  
            await checkTgSubs(id);  
         queryClient.invalidateQueries({queryKey:['task_inf']})

        }, 10000); 
    }
    const handleSubTgStart=async(id:number,main_task_id:number)=>{
        await startTask(id)
        checkTgSubs(id);
        channel_link && tg.openTelegramLink(channel_link);
        completeMainTask(main_task_id);
        queryClient.invalidateQueries({queryKey:['task_inf']})
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
    const secondTgLinkOpen = (channel_link: string, id: number,main_task_id?:number) => {
        status!==EnumTaskStatus.CLAIMED &&checkTgSubs(id);
        main_task_id && status!==EnumTaskStatus.CLAIMED &&completeMainTask(main_task_id);
        tg.openTelegramLink(channel_link);
        queryClient.invalidateQueries({queryKey:['task_inf']})
        setTimeout(async () => {  
            await checkTgSubs(id);  
         queryClient.invalidateQueries({queryKey:['task_inf']})

        }, 10000); 
    };
    const secondLinkOpen=(link:string)=>{
        openLink(link)
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
                    currentBtn= <button onClick={!channel_link ? () => { handleStart(id,link) } : () => { handleTgStart(id) }} className={s.status_btn}>{t("start")} </button> 
                    break;
            
                case EnumTaskStatus.COMPLETED:
                    currentBtn = <button onClick={()=>{handleClaim(id)}} className={`${s.status_btn}`}>{t("Claim")}</button>
                    break;
            
                case EnumTaskStatus.CLAIMED:
                    currentBtn = <button  onClick={()=>{ !channel_link? openLink(link):channel_link? tg.openTelegramLink(channel_link):''}} className={`${s.status_btn} ${s.disable}`}>{t("Claim")}</button>
                    break;
                case EnumTaskStatus.IN_PROGRESS:
                    currentBtn = userId && <LoadBtn  event={()=>{ !channel_link? secondLinkOpen(link):channel_link ?  secondTgLinkOpen(channel_link,id):''}} />
                    break;
            }
        }
        }else if(main_task_id){
            switch (status) {
                case EnumTaskStatus.PENDING:
                    currentBtn= <button onClick={ () => { !channel_link ? handleSubStart(id,link,main_task_id) : handleSubTgStart(id,main_task_id) }} className={s.status_btn}>{t("start")} </button> 
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
                    currentBtn =userId && <LoadBtn  event={()=>{ !channel_link? secondLinkOpen(link):channel_link?  secondTgLinkOpen(channel_link,id,main_task_id):''}} />
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
                    }).length}/${sub_tasks.length} tasks, +${coins} `:`+${coins}`}</p>
                </div>
            </div>
            {currentBtn}
        </div>
    )
}



