import s from './MainClaim.module.scss'
import MainBtn from "@widgets/UI/MainBtn/MainBtn.tsx";
import {useTranslation} from "react-i18next";
import coin_ico from '@shared/Home/assets/home_img/coin_ico.svg'

interface IMainClaimBtnProps{
  onClick:()=>void
}

export const MainClaimBtn = ({onClick}:IMainClaimBtnProps) => {
  const {t}=useTranslation()
  return (
    <MainBtn  event={onClick} >
        <div className={s.claim_home_btn}>
          <p>{t('сlaimFarm')+" "+"40"}</p>
          <img src={coin_ico} alt="coin"/>
        </div>
  </MainBtn>
  )
}