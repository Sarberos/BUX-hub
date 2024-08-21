import s from './BottomPopUp.module.scss'
import { TWrap } from '@shared/UIComponents/types/wrap/wrap';

export default function({onClose,children}:TWrap & {onClose: ()=> void}){
    return (
      <div className={s.modal_wrapper}>
        <div className={s.modal_inner_wrapper}>
          <div className={s.bottom_pop_up_wrap}>
            <div className={s.bottom_pop_up_inner_wrap}>
              <div onClick={onClose} className={s.cross_wrap}>
                <div className={s.cross}>
                  <span className={s.line1}></span>
                  <span className={s.line2}></span>
                </div>
              </div>
              <div className={s.child_wrap}>
              {children}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
}