import s from './KoinQuantity.module.scss'
import coin_ico from '@shared/Home/assets/home_img/small_coin_prod.png'
import {memo} from 'react'
import {changeCoinFormat} from "@shared/Home/helpersFunc/changeCoinFormat.ts";

const KoinQuantity= memo(function KoinQuantity({coinValue}:{coinValue:number}){
        return (
        <div className={s.koin_quantity}>
                <div  className={s.koin_quantity_value_wrap}>
                    <span className={`${s.koin_quantity_value} ${s.current}`}>{changeCoinFormat(coinValue)}</span>
                </div>
                <img src={coin_ico}  className={s.koin_quantity_img} />
            </div>
    )
}
)
export default KoinQuantity;