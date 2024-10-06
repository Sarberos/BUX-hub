import s from './KoinQuantity.module.scss'
import coin_ico from '@shared/Home/assets/home_img/small_coin_prod.png'


function chamgeCoinFormat(num:number){
    let helpArr=num.toString().split('').reverse();
    const arrowIndex:number=helpArr.indexOf('.');
    let middleArr=helpArr.slice(-(helpArr.length - arrowIndex-1));

    let result:string[]=[];
    for (let i = 0; i < middleArr.length; i += 3) {
        const group = middleArr.slice(i, i + 3).reverse().join('');
        result.push(group)
    }

    return result.reverse().join(' ')+ helpArr.splice(0,arrowIndex+1).reverse().join('');

}

export default function KoinQuantity({style,coinValue,isSmall=false}:{coinValue:number|string,style?:React.CSSProperties,isSmall?:boolean}){

    return (
        <div className={isSmall ? `${s.koin_quantity} ${s.small}`:s.koin_quantity}>
                <div style={style} className={s.koin_quantity_value}>
                    {typeof coinValue === "number" ? chamgeCoinFormat(coinValue) :coinValue}
                </div>
                <img src={coin_ico}  className={s.koin_quantity_img} />
            </div>
    )
}