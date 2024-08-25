import { tMainBtn } from '@shared/UIComponents/types/main_btn/main_btn'
import s from './MainBtn.module.scss'

export default function MainBtn({event,disabled,children}:tMainBtn){
    return(
        <button disabled={disabled} onClick={event} className={s.main_btn}>{children}</button>
    )
}