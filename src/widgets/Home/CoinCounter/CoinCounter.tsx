
import React from 'react';
import s from './CoinCounter.module.scss';
import {useOutletContext} from "@widgets/Wrap/Wrap.tsx";
import coin_ico from "@shared/Home/assets/home_img/coin_ico.svg";

const CoinCounter: React.FC = () => {
    let {farmedCoins}=useOutletContext();
    farmedCoins=40

    const [integerPart, decimalPart] = farmedCoins.toFixed(2).split('.');

    return (
      <div className={s.counter}>
        <div className={s.counter_part}>
          <span className={s.digit}>{integerPart[0]}</span>
          <span className={s.digit}>{integerPart[1]}</span>
        </div>
        <span className={s.dot}>.</span>
        <div className={s.counter_part}>
          <span className={s.digit}>{decimalPart[0]}</span>
          <span className={s.digit}>{decimalPart[1]}</span>
        </div>
        <img src={coin_ico} className={s.koin_quantity_img}/>
      </div>
    );
};

export default CoinCounter;
