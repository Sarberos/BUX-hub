// @flow
import * as React from 'react';
import s from './RewardTimer.module.scss'
import {useTranslation} from "react-i18next";
import {useAppSelector} from "@shared/utilits/redux/hooks.ts";
import {useEffect, useState} from "react";

let counter=0

const toNextValue=(value:string, max = 10)=>{
  const numericValue=parseInt(value)
  if(numericValue>1){
    return `${numericValue-1}`;
  }else if(numericValue===1){
    return '0';
  }else if(numericValue>=0){
    return `${max-1}`
  }

}
export default React.memo(function RewardTimer () {
  const{t}=useTranslation()
  const timeUntilReward=useAppSelector(state=>state.reward.next_bonus_time);

  const [intS,demS]=(Math.floor(timeUntilReward/1000)%60).toString().padStart(2,'0').split('')
  const [intM,demM]=(Math.floor(timeUntilReward/1000/60)%60).toString().padStart(2,'0').split('')
  const [intH,demH]=(Math.floor(timeUntilReward/1000/60/60)).toString().padStart(2,'0').split('')

  const [animate, setAnimate] = useState<boolean>(false)

  useEffect(() => {
    setAnimate(false);
    const changeValueTimeOut=setTimeout(() => {
      setAnimate(true);
    }, 1250);
    return ()=> {
      clearTimeout(changeValueTimeOut);
      setAnimate(false)
    }
  }, [timeUntilReward]);
  counter++
  console.log('перерисовка' +counter)

  return (
    <div className={s.reward_timer}>
      <span>{`${t("nextReward")}:`}</span>
      <div>
        <span className={s.value}>
                <span>{intH}</span>
                <span>{demH}</span>
                <span>:</span>
                <span>{intM}</span>
                <span>{demM}</span>
                <span>:</span>
                <span>{intS}</span>
                <span>{demS}</span>
      </span>
        {timeUntilReward<=0 && (
          <span className={s.anim_value}>00:00:00</span>
        )}
        {timeUntilReward >0 && (
          <span className={animate ? `${s.anim_value} ${s.active}` : s.anim_value}>
            <span
              className={(intS === '0' && demS === '0' && demM === '0' && intM === '0' && demH === '0') ? s.active : ''}>{toNextValue(intH, 6)}</span>
            <span
              className={(intS === '0' && demS === '0' && demM === '0' && intM === '0') ? s.active : ''}>{toNextValue(demH)}&nbsp;</span>
            <span className={(intS === '0' && demS === '0' && demM === '0') ? s.active : ''}>{toNextValue(intM, 6)}</span>
            <span className={(intS === '0' && demS === '0') ? s.active : ''}>{toNextValue(demM)}&nbsp;</span>
            <span className={demS === '0' ? s.active : ''}>{toNextValue(intS, 6)}</span>
            <span className={s.active}>{toNextValue(demS)}</span>
        </span>
        )}
      </div>
    </div>
  );
})