import s from './KoinQuantity.module.scss'
import coin_ico from '@shared/Home/assets/home_img/coin_ico.svg'

export default function KoinQuantity(){
    return (
        <div className={s.koin_quantity}>
                <p className={s.koin_quantity_value}>1,661.120</p>
                <div className={s.koin_quantity_img}>
                  <img src={coin_ico} alt="" className={s.koin_quantity_img} />
                </div>
            </div>
    )
}