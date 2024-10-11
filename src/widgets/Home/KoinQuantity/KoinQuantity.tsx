import s from './KoinQuantity.module.scss'
import coin_ico from '@shared/Home/assets/home_img/coin_ico.webp'
import {memo, useEffect, useRef} from 'react'
import CountUp from "react-countup";

const KoinQuantity= memo(function KoinQuantity({coinValue}:{coinValue:number}){
    const prevCoinValueRef = useRef(1);
    useEffect(()=> {
      prevCoinValueRef.current = coinValue
    },[coinValue])
        return (
        <div className={s.koin_quantity}>
                <div  className={s.koin_quantity_value_wrap}>
                  <CountUp
                    className={`${s.koin_quantity_value} ${s.current}`}
                    start={prevCoinValueRef.current}
                    end={coinValue}
                    duration={3}
                    useEasing={true}
                    separator=" "
                    enableScrollSpy={true}
                  />
                </div>
                <img src={coin_ico}  className={s.koin_quantity_img} />
            </div>
    )
}
)
export default KoinQuantity;