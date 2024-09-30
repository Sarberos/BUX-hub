import s from './MainTaimerBtn.module.scss'
import { Timer } from '@widgets/Timer/Timer'
import KoinQuantity from '@widgets/Home/KoinQuantity/KoinQuantity'
import { useTranslation } from 'react-i18next'
import {useOutletContext} from "@widgets/Wrap/Wrap.tsx";

export default function MainTaimerBtn(){
  const {t} = useTranslation()
  const {farmedCoins}=useOutletContext()

  return(
        <button disabled={true}  className={s.main_btn}>
            <div className={s.farmin_btn}>
              <div className={s.info_title}>
                <div className={s.farm_txt}>
                  {t('farming')}
                </div>
                <div className={s.koin_quantitiy_btn}>
                  <KoinQuantity coinValue={farmedCoins/10000} style={{color:'#000',fontSize:'20px',fontWeight:'800',}} imgStyle={{width: '16px',height:'16px'}}/>
                </div>
              </div>
              <div className={s.koin_taimer_btn}>
                <div className={s.timer_btn}>
                  <Timer />
                </div>
              </div>
            </div>
        </button>
    )
}