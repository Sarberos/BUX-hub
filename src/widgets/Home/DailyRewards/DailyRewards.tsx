import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import s from './DailyRewards.module.scss'
import { DAYBOXLIST } from '@shared/Home/consts/dayBoxList'
import DayBox from '../DayBox/DayBox'
import { useClaimBonus } from '@shared/Home/hooks/useClaimBonus'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { setBonusDay, setDailyRewardsStatus, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice'
import { TDayBoxProps } from '@shared/Home/types/dayBox'
import { useTranslation } from 'react-i18next'
import { EnumBonusStatus } from '@shared/Home/consts/bonusStatus.enum'
import { SwiperSlide,Swiper } from 'swiper/react'
import 'swiper/css'
import { useEffect, useState } from 'react'
import {useTelegramApi} from "@shared/Home/hooks/useTelegramApi.tsx";
import {SuccessClaimAnim} from "@widgets/UI/SuccessClaim/SuccessClaimAnim.tsx";

export default function({buttonActive}:{ buttonActive: boolean}){
    const [screenWidth, setScreenWidth]=useState(window.innerWidth)
    const [isAnim, setIsAnim] = useState<boolean>(false)
    const {t} =useTranslation()
    const {hapticFeedBack}=useTelegramApi()
    const dispatch =useAppDispatch()
    const state=useAppSelector(state=>state.home)
    const {mutateAsync:claim_bonus}=useClaimBonus()

    useEffect(() => {   
      window.innerWidth>=107 ?setScreenWidth(window.innerWidth):1
      
  }, [window.innerWidth]); 
    const onClaimBonus=(dayNumber:number)=>{
      claim_bonus();
      setIsAnim(true);
      setTimeout(()=> {
        setIsAnim(false);
      },2700);
      for(let i=1; i<=10;i++){
        hapticFeedBack();
        setTimeout(()=>hapticFeedBack(),10*i)
      }
      dispatch(setBonusDay(state.bonusDay+1));

      const currentObj: Omit<TDayBoxProps,'currentDay'>[]=DAYBOXLIST.filter(elem=>
      elem.rewardDay===dayNumber+1)
      dispatch(updateTotalCoins(currentObj[0].rewardValue))
      dispatch(setDailyRewardsStatus(EnumBonusStatus.WAIT))
    }
    return (
      <div className={s.daily_reward_wrap}>
        <div className={s.reward_title}>{t("dailyReward")}</div>
        <div className={s.box_slider}>
          <Swiper
            initialSlide={state.bonusDay}
            slidesPerView={screenWidth/107}
          >
            {DAYBOXLIST.map((elem,index)=>(
                <SwiperSlide>
                    <DayBox currentDay={state.bonusDay} {...elem} key={index} />
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={s.rewar_subtitle}>
          {`${t("rewardsProfit")}: ${DAYBOXLIST.reduce((acc, item) => {
            return item.rewardDay <= state.bonusDay
              ? acc + item.rewardValue
              : acc;
          }, 0)}`}
        </div>
        <div className={s.claim_btn}>
        <div className={isAnim ? `${s.reward_fireCracker} ${s.active}` :s.reward_fireCracker}>
          {isAnim && <SuccessClaimAnim/>}
        </div>
          {buttonActive && (
            <MainBtn event={() => onClaimBonus(state.bonusDay)}>
              {t("claim")}
            </MainBtn>
          )}
          {!buttonActive && (
            <MainBtn backColor={"#282828"} disabled={true}>
              <p style={{ color: "#6C6C6C" }}>{t("claim")}</p>
            </MainBtn>
          )}
        </div>
      </div>
    );
}