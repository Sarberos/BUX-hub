import { historySlides } from "@shared/Home/consts/historyArr";  
import s from "./HistorySlider.module.scss";  
import { SwiperSlide, Swiper } from 'swiper/react';  
import { useEffect, useRef, useState } from "react";  
import { Autoplay, Pagination } from "swiper/modules";
import { SwiperPagination } from "@widgets/UI/SwiperPagination/SwiperPagination";
import animationData_1 from "@shared/UIComponents/assets/hisroty_bg_1.json";
import animationData_2 from "@shared/UIComponents/assets/hisroty_bg_2.json";
import Lottie from "react-lottie";
import {useAppSelector} from "@shared/utilits/redux/hooks.ts";

export const HistorySlider = ({ closeHistory }: { closeHistory: () => void }) => {
  const swiperRef = useRef<any>(null);
  const state= useAppSelector(state=>state.home)

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFirstAnim, setIsFirstAnim] = useState<boolean>(true)
  const historySlidesArray:string[] = state.lang ==="ru" ? historySlides.slice(0, 5) : historySlides.slice(5, 10);


  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      const handleSlideChange = () => {
        setCurrentIndex(swiper.activeIndex);
        if (swiper.isEnd) {
          swiper.autoplay.stop();
          setTimeout(() => {
            closeHistory()
          }, 7000);
        }  
      };
      swiper.on('slideChangeTransitionEnd', handleSlideChange);
      return () => {
        swiper.off('slideChangeTransitionEnd', handleSlideChange);
      };
    }
  }, []);
  const stopAutoPlay = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.autoplay.stop();
    }
  };
  const continueAutoPlay = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.autoplay.start();
    }
  };
const handlePaginationClick = (index: number) => {  
  setCurrentIndex(index);  
  swiperRef.current.swiper.slideTo(index);  
};
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: isFirstAnim ? animationData_1 : animationData_2,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <>
      <div className={s.history_slide_bg}>
        <Lottie options={defaultOptions} width={'100%'}/>;
      </div>
      <Swiper
        ref={swiperRef}
        className={s.swiper}
        modules={[Pagination, Autoplay]}
        pagination={false}
        navigation={{
          nextEl: ".swiper_btn.next",
          prevEl: ".swiper_btn.prev",
        }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        autoplay={{delay: 7500}}
        slidesPerView={1}
        speed={400}
        loop={false}
      >
        {historySlidesArray &&
          historySlidesArray.map((elem, index) => (
            <SwiperSlide key={index}>
              <img src={elem} alt="" className={s.history_slide}/>
              <button
                onTouchStart={stopAutoPlay}
                onTouchEnd={continueAutoPlay}
                onClick={() => {
                  swiperRef.current.swiper.slidePrev();
                  setIsFirstAnim(prevState => !prevState)
                }}
                className={`${s.swiper_btn} ${s.prev}`}
              ></button>
              <button className={`${s.swiper_btn} ${s.next}`}></button>
              <button
                onTouchStart={stopAutoPlay}
                onTouchEnd={continueAutoPlay}
                onClick={
                  index === historySlidesArray.length - 1
                    ? () => closeHistory()
                    : () => {
                      swiperRef.current.swiper.slideNext();
                      setIsFirstAnim(prevState => !prevState)
                    }
                }
                className={`${s.swiper_btn} ${s.next}`}
              ></button>
            </SwiperSlide>
          ))}
        <div className={s.custom_pagination}>
          <SwiperPagination
            currentIndex={currentIndex}
            btnEvent={handlePaginationClick}
            array={historySlidesArray}
          />
        </div>
      </Swiper>
    </>
  );
};