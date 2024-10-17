import s from './MainClaim.module.scss'
import MainBtn from "@widgets/UI/MainBtn/MainBtn.tsx";
import {useTranslation} from "react-i18next";
import coin_ico from '@shared/Home/assets/home_img/coin_ico.webp'

interface IMainClaimBtnProps{
  onClick:()=>void
}

export const MainClaimBtn = ({onClick}:IMainClaimBtnProps) => {
  const {t}=useTranslation()
  return (
    <MainBtn backColor={"#c3e0fa"}  event={onClick} >
        <div className={s.claim_home_btn}>
          <p>
            <span>{t('сlaimFarm')}</span>
            <span>{' 40'}</span>
          </p>
          <img src={coin_ico} alt="coin"/>
        </div>
  </MainBtn>
  )
}