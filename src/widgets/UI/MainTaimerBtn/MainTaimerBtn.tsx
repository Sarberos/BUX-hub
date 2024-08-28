import s from './MainTaimerBtn.module.scss'
import { Timer } from '@widgets/Timer/Timer'
import KoinQuantity from '@widgets/Home/KoinQuantity/KoinQuantity'
import { useTranslation } from 'react-i18next'

export default function MainTaimerBtn({coinValue}:{coinValue:number}){
  const {t} = useTranslation()  
  
  return(
        <button disabled={true}  className={s.main_btn}>
            <div className={s.farmin_btn}>
              <div className={s.farm_txt}>
                <p>{t('farming')}</p>
            </div>
            <div className={s.koin_taimer_btn}>
              <div className={s.koin_quantitiy_btn}>
                <KoinQuantity coinValue={coinValue} style={{color:'#000',fontSize:'13px',fontWeight:'800',}} imgStyle={{width: '16px',height:'16px'}}/>
              </div>
              <div className={s.timer_btn}>
                <Timer />
              </div>
            </div>
            </div>
        </button>
    )
}