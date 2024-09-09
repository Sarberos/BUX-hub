import s from './LoadBtn.module.scss'
import btnLoader from '@shared/Tasks/assets/tasks_img/Spinner@1x-1.0s-200px-200px.gif'

export const  LoadBtn=({event}:{event:()=>void})=>{
    return (
        <button  onClick={event} className={`${s.status_btn}`}>
            <img src={btnLoader} className={s.img}  />
        </button>
    )
}