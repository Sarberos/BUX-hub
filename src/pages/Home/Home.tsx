  import s from '@pages/Home/Home.module.scss'
  import MainBtn from '@widgets/UI/MainBtn/MainBtn';    
  import { Lang_DayCounter } from '@widgets/Home/Lang_DayCounter/Lang_DayCounter';
  import KoinQuantity from '@widgets/Home/KoinQuantity/KoinQuantity';
  import BottomPopUp from '@widgets/UI/BottomPopUp/BottomPopUp';
  import DailyRewards from '@widgets/Home/DailyRewards/DailyRewards';
  import { useTelegramApi } from '@shared/Home/hooks/useTelegramApi';
  import { useTranslation } from 'react-i18next';
  import {useEffect,useState} from 'react'
  import { useStartFarm } from '@shared/Home/hooks/useStartFarm';
  import { useGetFarmInfo } from '@shared/Home/hooks/useGetFarmInfo';
  import { EnumFarmStatus } from '@shared/Home/consts/farmStatus.enum';
  import { useClaimFarmCoins } from '@shared/Home/hooks/useClaimFarmCoins';
  import MainTaimerBtn from '@widgets/UI/MainTaimerBtn/MainTaimerBtn';
  import { changeDateFormat } from '@features/Home/changeDateFormat.ts';
  import { useGetBonusStatus } from '@shared/Home/hooks/useGetBonusStatus';
  import { useAppDispatch, useAppSelector } from '@shared/utilits/redux/hooks';
  import { setBonusDay, setDailyRewardsStatus, setFormattedTaimer, setIsDailyReward, setStoreFarmStatus, setTotalCoins, updateTotalCoins } from '@shared/utilits/redux/redux_slice/home_slice';
  import { EnumBonusStatus } from '@shared/Home/consts/bonusStatus.enum';
  import { Preloader } from '@widgets/UI/Preloader/Preloader';
  import { AnimationMainImg } from '@widgets/Home/AnimationMainImg/AnimationMainImg';
  import { useOutletContext } from '@widgets/Wrap/Wrap';
  import {SuccessClaimAnim} from "@widgets/UI/SuccessClaim/SuccessClaimAnim.tsx";
  export type TFarmInfo={
    coins: number,
    start_time: null|string,
    status:string
  }
  export type TTimerType = {  
    formattedHours: string;  
    formattedMinutes: string;  
    formattedSec:string;
    minuts: number;  
    hours: number;  
    sec:number;
  } | null; 
  export type TFrensTimerType = {  
    formattedHours: string;  
    formattedMinutes: string;  
    minuts: number;  
    hours: number;  
  } | null; 


  export function Home(){
    const claimedCoins:number=40;

    const {user,hapticFeedBack}=useTelegramApi()
    const {t} = useTranslation()
    const dispatch= useAppDispatch()
    const state=useAppSelector(state=>state.home)

    const {setIsHistory}=useOutletContext()
    const {mutate:startReq}=useStartFarm()
    const {mutate:claimReq}=useClaimFarmCoins()
    const {data:farmInfo,isLoading:statusLoading}=useGetFarmInfo()
    const {data:bonusInfo,isLoading:bonusLoading}=useGetBonusStatus()
    const [coins,setCoins]=useState<number>(state.totalCoins)
    const [farmStatus, setFarmStatus]=useState<string>(state.farmStatus);
    const {setFarmedCoins}=useOutletContext()

    const [isCaim, setIsCaim] = useState<boolean>(false)


  const onStartFarming=()=>{
    startReq();
    dispatch(setStoreFarmStatus(EnumFarmStatus.FARMING))
    dispatch(setFormattedTaimer({formattedHours:'3',formattedMinutes:'00',formattedSec:'00',hours:3,minuts:0,sec:0}))
  }
  const onClaimFarming=()=>{
      setIsCaim(true);
      setTimeout(()=>{
        setIsCaim(false);
      },3000)
    hapticFeedBack()
    claimReq();
    dispatch(setStoreFarmStatus(EnumFarmStatus.START))
    dispatch(updateTotalCoins(claimedCoins))
  }

  useEffect(()=>{
    coins!==state.totalCoins && setCoins(state.totalCoins);
    farmStatus!==state.farmStatus && setFarmStatus(state.farmStatus);
  },[state])
  useEffect(()=>{
      if(bonusInfo){ 
        if (bonusInfo.status !==state.dailyRewardsStatus && bonusInfo.status=== EnumBonusStatus.CLAIM) {
          dispatch(setIsDailyReward(true))
          dispatch(setDailyRewardsStatus(EnumBonusStatus.CLAIM))
        }
        setIsHistory(bonusInfo.welcome_status)
        state.bonusDay!==bonusInfo.day && dispatch(setBonusDay(bonusInfo.day));
      }  
    },[bonusInfo])
  useEffect(()=>{
      if(farmInfo){
        farmInfo.coins> coins && dispatch(setTotalCoins(farmInfo.coins))
        farmInfo.status !== state.farmStatus   && dispatch(setStoreFarmStatus(farmInfo.status));
        if(farmInfo.status===EnumFarmStatus.FARMING) {
          const formatedDate = changeDateFormat(farmInfo.start_time);
          if (formatedDate){
            dispatch(setFormattedTaimer(formatedDate));
            setFarmedCoins((formatedDate.dateDifferce / 1000))
          }
        }

      } 
    },[farmInfo])
    let clickTimer: ReturnType<typeof setTimeout> | null = null;
    const handleDoubleClick = () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
        clickTimer = null;
        setIsHistory(true);
        console.log("Двойное нажатие");
      } else {
        clickTimer = setTimeout(() => {
          console.log("Одиночное нажатие");
          clickTimer = null;
        }, 300);
      }
    };

  if(statusLoading ||bonusLoading){
    return <Preloader />
  }else
  return (
    <>
        <div className={s.wrapper}>
          <div  className={s.title_wrap}>
            <p className={s.title}>{`${t("hello")},`}</p>
            <p className={s.title}>{user?.username}</p>
          </div>
          <div className={s.lang_daycounter_wrap}>
            <Lang_DayCounter />
          </div>
          <div className={s.koin_wrap}>
            <KoinQuantity coinValue={coins} />
          </div>
          <div className={s.main_img_wrap}  onClick={()=>{handleDoubleClick()}}>
            <AnimationMainImg />
          </div>
          <div className={s.farming_btn}>
            <div className={isCaim ? `${s.farming_btn_anim} ${s.active}`:s.farming_btn_anim}>
              {isCaim && <SuccessClaimAnim/>}
            </div>
            {farmStatus === EnumFarmStatus.START && (
              <MainBtn disabled={farmStatus !==EnumFarmStatus.START}  event={()=>onStartFarming()}>{t('startFarming')}</MainBtn>
            )}
            {farmStatus === EnumFarmStatus.FARMING && <MainTaimerBtn />}
            {farmStatus === EnumFarmStatus.CLAIM && (
              <MainBtn  event={()=>onClaimFarming()}>
                <div className={s.claim_home_btn}>  
                  <div>{t('сlaimFarm')}</div>
                  <div>
                    <KoinQuantity
                      coinValue={claimedCoins}
                      style={{
                        fontFamily: "SFProText",
                        color: "#000",
                        fontSize: "17px",
                        fontWeight: "800",
                      }}
                      isSmall={true}
                    />
                  </div>
                </div>
              </MainBtn>
            )}
          </div>
        </div>
        {state.isDailyReward && (
          <div className={`${s.daily_reward}`}>
          <BottomPopUp onClose={() => dispatch(setIsDailyReward(false))}>
            <DailyRewards
              buttonActive={bonusInfo?.status===EnumBonusStatus.CLAIM}
            />
          </BottomPopUp>
        </div>
        )} 
    
  </>
      );
  }