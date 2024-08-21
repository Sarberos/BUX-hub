import { TWrap } from '@shared/UIComponents/types/wrap/wrap'
import s from './ModalSample.module.scss'

export default function ({children,inviteStat}:TWrap&{inviteStat:boolean}){
    return (
    <div className={inviteStat ?`${s.modal} ${s.active}`:`${s.modal}`}>
        <div className={s.modal_wrapper}>
          <div className={s.modal_content}>
            {children}
          </div>
        </div>
    </div>
    )
}