import MainBtn from '@widgets/UI/MainBtn/MainBtn'
import s from './DailyRewards.module.scss'
import { DAYBOXLIST } from '@shared/Home/consts/dayBoxList'
import DayBox from '../DayBox/DayBox'
import { useClaimBonus } from '@shared/Home/hooks/useClaimBonus'
import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks'
import { setBonusDay, setDailyRewardsStatus, setIsDailyReward, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice'
import { TDayBoxProps } from '@shared/Home/types/dayBox'
import { useTranslation } from 'react-i18next'
import { EnumBonusStatus } from '@shared/Home/consts/bonusStatus.enum'
import { SwiperSlide,Swiper } from 'swiper/react'
import 'swiper/css'

export default function({buttonActive}:{ buttonActive: boolean}){
    const {t} =useTranslation()
    const dispatch =useAppDispatch()
    const state=useAppSelector(state=>state.home)
    const {mutateAsync:claim_bonus}=useClaimBonus()

    const onClaimBonus=async(dayNumber:number)=>{
            dispatch(setBonusDay(state.bonusDay+1))
            const currentObj: Omit<TDayBoxProps,'currentDay'>[]=DAYBOXLIST.filter(elem=>
            elem.rewardDay===dayNumber+1)
            dispatch(updateTotalCoins(currentObj[0].rewardValue))
            dispatch(setIsDailyReward(false))
            await claim_bonus();
            dispatch(setDailyRewardsStatus(EnumBonusStatus.WAIT))
    }
    return (
        
      <div className={s.daily_reward_wrap}>
        <div className={s.reward_title}>{t("dailyReward")}</div>
        <div className={s.box_slider}>
          <Swiper
            spaceBetween={2}
            initialSlide={2}
            breakpoints={{  
            320: {  
                slidesPerView: 3,
            },  
            340: {  
                slidesPerView: 3.25,
            },  
            350: {  
                slidesPerView: 3.4,
            },  
            365: {  
                slidesPerView: 3.5,
            },  
            377: {  
                slidesPerView: 3.65,
            },  
            390: {  
                slidesPerView: 3.75,
            },  
            405: {  
                slidesPerView: 3.9,
            },  
            412: {  
                slidesPerView: 4.0,
            },  
            425: {  
                slidesPerView: 4,
            },  
            450: {  
                slidesPerView: 4,
            },  
            550: {  
                slidesPerView: 5,
            },  
            640: {  
                slidesPerView: 6,
            },  
            768: {  
                slidesPerView: 7, 
            },
            }}
          >
            {DAYBOXLIST.map((elem,index)=>(
                <SwiperSlide>
                    <DayBox currentDay={state.bonusDay} {...elem} key={index} />
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div className={s.box_slider}>
                {DAYBOXLIST.map((elem,index)=>{
                    return elem.rewardDay >= state.bonusDay + 1   
                    ? <DayBox currentDay={state.bonusDay} {...elem} key={index} />   
                    : null  
                })}
            </div> */}
        <div className={s.rewar_subtitle}>
          {`${t("rewardsProfit")}: ${DAYBOXLIST.reduce((acc, item) => {
            return item.rewardDay <= state.bonusDay
              ? acc + item.rewardValue
              : acc;
          }, 0)}`}
        </div>
        <div className={s.claim_btn}>
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