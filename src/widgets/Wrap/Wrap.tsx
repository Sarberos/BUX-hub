import { TWrap } from '@shared/types/wrap/wrap';
import s from './Wrap.module.scss'
import { Footer } from "@widgets/Footer/Footer";
import home_bg from '@shared/assets/home_img/home_background.png'

export function Wrap({children}:TWrap) {

  return (
    <div style={{
      background:`url(${home_bg}) no-repeat center`,
      borderBottomLeftRadius:'44px',
      borderBottomRightRadius:'44px',
      }} className={s.wrapper}>
      {children}
    <Footer />
    </div>
  )
}

