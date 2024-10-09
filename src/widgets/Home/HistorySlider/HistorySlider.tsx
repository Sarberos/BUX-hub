import { historySlides } from "@shared/Home/consts/historyArr";  
import s from "./HistorySlider.module.scss";  
import { SwiperSlide, Swiper } from 'swiper/react';  
import { useEffect, useRef, useState } from "react";  
import { Autoplay, Pagination } from "swiper/modules";  
import { useTelegramApi } from "@shared/Home/hooks/useTelegramApi";  
import { SwiperPagination } from "@widgets/UI/SwiperPagination/SwiperPagination";

export const HistorySlider = ({ setIsHistory }: { setIsHistory: (v: boolean) => void }) => {  
  const swiperRef = useRef<any>(null);
  const { user } = useTelegramApi();  

  const [currentIndex, setCurrentIndex] = useState<number>(0);  
  const cngLanguages: string[] = ["ru", "be", "kk", "ky", "tt", "uz", "tg", "mo", "hy", "az"];  
  let historySlidesArray = historySlides.slice(0, 5);  
  if (user && user.language_code) {  
    historySlidesArray = cngLanguages.includes(user.language_code) ? historySlides.slice(0, 5) : historySlides.slice(5, 10);  
  }  

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
  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      const handleSlideChange = () => {
        setCurrentIndex(swiper.activeIndex);
        if (swiper.isEnd) {
          swiper.autoplay.stop();
          setTimeout(() => {
            setIsHistory(false);
          }, 7000);
        }  
      };
      swiper.on('slideChangeTransitionEnd', handleSlideChange);
      return () => {
        swiper.off('slideChangeTransitionEnd', handleSlideChange);
      };
    }
  }, []);

const handlePaginationClick = (index: number) => {  
  setCurrentIndex(index);  
  swiperRef.current.swiper.slideTo(index);  
};  

  return (
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
      autoplay={{ delay: 7500 }}
      slidesPerView={1}
      speed={400}
      loop={false}
    >
      {historySlidesArray &&
        historySlidesArray.map((elem, index) => (
          <SwiperSlide key={index}>
            <img src={elem} className={s.history_slide} />
            <button
              onTouchStart={stopAutoPlay}
              onTouchEnd={continueAutoPlay}
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className={`${s.swiper_btn} ${s.prev}`}
            ></button>
            <button className={`${s.swiper_btn} ${s.next}`}></button>
            <button
              onTouchStart={stopAutoPlay}
              onTouchEnd={continueAutoPlay}
              onClick={
                index === historySlidesArray.length - 1
                  ? () => setIsHistory(false)
                  : () => swiperRef.current.swiper.slideNext()
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
  );  
};