import s from './KoinQuantity.module.scss'
import coin_ico from '@shared/Home/assets/home_img/coin_ico.webp'
import {memo, useEffect, useRef} from 'react'
import CountUp from "react-countup";
import {changeCoinFormat} from "@shared/Home/helpersFunc/changeCoinFormat.ts";

const KoinQuantity= memo(function KoinQuantity({coinValue,isBalanceAnim}:{coinValue:number,isBalanceAnim:boolean}){
    const prevCoinValueRef = useRef(1);
    useEffect(()=> {
      prevCoinValueRef.current = coinValue
    },[coinValue])
        return (
          <div className={s.koin_quantity}>
            <div className={s.koin_quantity_value_wrap}>
              {isBalanceAnim && <CountUp
                className={`${s.koin_quantity_value} ${s.current}`}
                start={prevCoinValueRef.current}
                end={coinValue}
                duration={3}
                useEasing={true}
                separator=" "
                enableScrollSpy={true}
              />}
              {!isBalanceAnim && <span>{changeCoinFormat(coinValue)}</span>}
            </div>
            <img src={coin_ico} className={s.koin_quantity_img}/>
          </div>
        )
  }
)
export default KoinQuantity;