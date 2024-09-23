import s from './SwiperPagination.module.scss'



export const SwiperPagination=({array,btnEvent,currentIndex}:{array:any[],btnEvent:(v:number)=>void,currentIndex:number})=>{
    return(
        <div className={s.pagination_wrap}>
            {array.map((_,index)=>(
                <div key={index} onClick={()=>btnEvent(index)} className={index===currentIndex ? `${s.pagination_elem} ${s.active}` : `${s.pagination_elem}`}></div>
            ))}
        </div>
    )
}