import s from './BottomPopUp.module.scss'
import { TWrap } from '@shared/UIComponents/types/wrap/wrap';

export default function({color ,onClose,children}:TWrap & {color?: string,onClose: ()=> void}){
  const style:React.CSSProperties={backgroundColor:color}

  const onWrapperClick = () => {     
      onClose();
  };
  const preventCloseOnInputClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

    return (
      <div onClick={onWrapperClick} className={s.bottom_wrap}>
        <div className={s.bottom_pop_up__wrap}>
          <div style={style} className={s.bottom_pop_up_inner_wrap}>
              <div className={s.bottom_pop_up_inner_wrap}>
                <div onClick={()=>onClose()} className={s.cross_wrap}>
                  <div className={s.cross}>
                    <span className={s.line1}></span>
                    <span className={s.line2}></span>
                  </div>
                </div>
                <div onClick={preventCloseOnInputClick} className={s.child_wrap}>
                {children}
                </div>
              </div>
            </div>
        </div>
      </div>
    );
}