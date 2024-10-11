
import  {useEffect, useState} from 'react';
import s from './CoinCounter.module.scss';
import coin_ico from "@shared/Home/assets/home_img/coin_ico.svg";
import {useAppSelector} from "@shared/utilits/redux/hooks.ts";

const CoinCounter= () => {
  console.log('CoinCounter')
  const homeState=useAppSelector(state => state.home)
  const prevValue=homeState.farmedCoins + 0.01;
  const [animate, setAnimate] = useState(false);
  const [integerPart, decimalPart] = homeState.farmedCoins.toFixed(2).split('.');
  const [prevIntegerPart, prevDecimalPart] = prevValue.toFixed(2).split('.');
  useEffect(() => {
    const changeValueTimeOut=setTimeout(() => {
      setAnimate(true);
      const animTimeout =setTimeout(() => {
        setAnimate(false);
      }, 500);
      return ()=>clearTimeout(animTimeout)
    }, 2175);
    return ()=>clearTimeout(changeValueTimeOut)
  }, [homeState.farmedCoins]);


  return (
      <div className={s.counter_wrap}>
        <div className={s.counter}>
          <div className={s.counter_part}>
            <span className={animate && prevIntegerPart[0]!== integerPart[0] ? `${s.digit} ${s.up}`:`${s.digit}`}>{integerPart[0]}</span>
            <span className={animate && prevIntegerPart[1]!== integerPart[1] ? `${s.digit} ${s.up}`:`${s.digit}`}>{integerPart[1]}</span>
          </div>
          <span className={s.dot}>.</span>
          <div className={s.counter_part}>
            <span className={animate && prevDecimalPart[0]!== decimalPart[0] ? `${s.digit} ${s.up}`:`${s.digit}`}>{decimalPart[0]}</span>
            <span className={animate ? `${s.digit} ${s.up}`:`${s.digit}`}>{decimalPart[1]}</span>
          </div>
        </div>
        <div className={animate ? `${s.counter} ${s.new} ${s.up}`:`${s.counter} ${s.new}`}>
          <div className={s.counter_part}>
            <span className={prevIntegerPart[0]=== integerPart[0]?`${s.digit} ${s.unVis}`:`${s.digit}`}>{prevIntegerPart[0]}</span>
            <span className={prevIntegerPart[1]=== integerPart[1]?`${s.digit} ${s.unVis}`:`${s.digit}`}>{prevIntegerPart[1]}</span>
          </div>
          <span className={prevIntegerPart[1]=== integerPart[1]?`${s.dot} ${s.unVis}`:`${s.dot}`}>.</span>
          <div className={s.counter_part}>
            <span className={prevDecimalPart[0]=== decimalPart[0]?`${s.digit} ${s.unVis}`:`${s.digit}`}>{prevDecimalPart[0]}</span>
            <span className={`${s.digit} `}>{prevDecimalPart[1]}</span>
          </div>
        </div>
        <img src={coin_ico} className={s.koin_quantity_img}/>
      </div>
  );
};

export default CoinCounter;
