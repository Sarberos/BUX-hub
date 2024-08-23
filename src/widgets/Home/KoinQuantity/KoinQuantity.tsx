import s from './KoinQuantity.module.scss'
import coin_ico from '@shared/Home/assets/home_img/coin_ico.svg'

// export type TKoinQuantityProps={
//   currentCoins:number
// }

export default function KoinQuantity({style,imgStyle,coinValue}:{coinValue:number,style?:React.CSSProperties,imgStyle?:React.CSSProperties}){

    return (
        <div className={s.koin_quantity}>
                <p style={style} className={s.koin_quantity_value}>{coinValue}</p>
                <div className={s.koin_quantity_img}>
                  <img style={imgStyle} src={coin_ico} alt="" className={s.koin_quantity_img} />
                </div>
            </div>
    )
}