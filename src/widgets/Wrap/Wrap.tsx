import { TWrap } from '@shared/types/wrap/wrap';
import s from './Wrap.module.scss'
import { Footer } from "@widgets/Footer/Footer";
import home_bg from '@shared/assets/home_img/home_background.png'

export function Wrap({children}:TWrap) {

  return (
    <div style={{
      background:`url(${home_bg}) no-repeat center`,
      
      }} className={s.wrapper}>

        <div className={s.inner_wrapper}>
          {children}
        </div>
      <div className={s.footer}>
        <Footer />
      </div>
      
    </div>
  )
}

