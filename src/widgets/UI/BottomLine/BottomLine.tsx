import s from './BottomLine.module.scss'

export default function({color}:{color?:string}){
    return(
        <div color={color} className={s.line}></div>
    )
} 