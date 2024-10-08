import Lottie from "react-lottie";  
import animationData from "@shared/Home/assets/anim/Animation - 1725476922777.json";
import s from './AnimationMainImg.module.scss'

export const AnimationMainImg = ({isActive}:{isActive:boolean}) => {
    const defaultOptions = {
        loop: true,  
        autoplay: true,  
        animationData: animationData,
        rendererSettings: {  
            preserveAspectRatio: 'xMidYMid slice'  
        }  
    };  

    return (
      <div className={s.main_anim_wrap}>
          <Lottie options={defaultOptions} width={'100%'} isStopped={!isActive} />;
      </div>


      )

};















// import SuccessClaim from 'react-lottie';
// import animationData from '@shared/Home/assets/anim/Animation - 1725476922777.json'; // путь к вашему JSON файлу  

// export const AnimationMainImg = () => {  
//     const defaultOptions = {  
//         loop: true,  
//         autoplay: true, 
//         animationData: animationData,   
//         rendererSettings: {  
//             preserveAspectRatio: 'xMidYMid slice' 
//         }  
//     };  

//     return <SuccessClaim options={defaultOptions} height={250} width={250} />;
// };  

