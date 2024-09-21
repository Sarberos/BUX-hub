import { ruHistorySlider } from "@shared/Home/consts/historyArr"
import s from "./HistorySlider.module.scss"
import { SwiperSlide,Swiper } from 'swiper/react'
import { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { useOutletContext } from "@widgets/Wrap/Wrap";
import { useTelegramApi } from "@shared/Home/hooks/useTelegramApi";



export const HistorySlider=()=>{
  const swiperRef = useRef<any>(null); 
  const {setIsHistory}=useOutletContext()
  const [crossIsActive, setIsActive]=useState<boolean>(false)
  const {user}=useTelegramApi();
  console.log(user?.language_code);

  useEffect(() => {  
    const swiper = swiperRef.current?.swiper;  
    if (swiper) {  
      const handleSlideChange = () => {    
        if (swiper.isEnd) {  
          swiper.autoplay.stop(); 
          setTimeout(()=>{
            setIsActive(true)
          },3000)
        }  
      };  
      swiper.on('slideChangeTransitionEnd', handleSlideChange);  
      return () => {  
        swiper.off('slideChangeTransitionEnd', handleSlideChange);  
      };  
    }  
  }, []);  

    return (
      <>
        <Swiper
          ref={swiperRef}
          className={s.swiper}
          modules={[Autoplay]}
          navigation={{
            nextEl: ".swiper_btn.next",
            prevEl: ".swiper_btn.prev",
          }}
          autoplay={{ delay: 6000 }}
          slidesPerView={1}
          speed={400}
          loop={false}
        >
          {ruHistorySlider.map((elem, index) => (
            <SwiperSlide key={index}>
              <div className={s.history_wrap}>
                <div className={s.history_slide_wrap}>
                  <img src={elem} className={s.history_slide} />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <button
            className={`${s.swiper_btn} ${s.prev}`}
            onClick={() => swiperRef.current.swiper.slidePrev()}
          ></button>
          <button
            className={`${s.swiper_btn} ${s.next}`}
            onClick={() => swiperRef.current.swiper.slideNext()}
          ></button>
          {true && (
            <div
              onClick={() => setIsHistory(false)}
              className={
                crossIsActive
                  ? `${s.cross_wrap} ${s.active}`
                  : `${s.cross_wrap}`
              }
            >
              <div className={s.cross}>
                <span className={s.line1}></span>
                <span className={s.line2}></span>
              </div>
            </div>
          )}
        </Swiper>
      </>
    );
}
