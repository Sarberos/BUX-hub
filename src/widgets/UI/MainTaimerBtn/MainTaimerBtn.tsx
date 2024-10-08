import s from './MainTaimerBtn.module.scss'
import { Timer } from '@widgets/Timer/Timer'
import { useTranslation } from 'react-i18next'
import CoinCounter from "@widgets/Home/CoinCounter/CoinCounter.tsx";

export default function MainTaimerBtn(){
  const {t} = useTranslation()

  return(
        <button disabled={true}  className={s.taimer_btn_wrap}>
            <div className={s.taimer_btn_txt}>
              <p>{t('farming')}</p>
              <div className={s.taimer_bnt_counter}><CoinCounter /></div>
            </div>
            <div className={s.taimer_btn}>
                <Timer/>
            </div>
        </button>
  )
}