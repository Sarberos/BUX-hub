import Lottie from "react-lottie";  
import animationData from "@shared/Home/assets/anim/Animation - 1725476922777.json"; 

export const AnimationMainImg = () => {  
    const size=window.innerHeight * 0.35;

    const defaultOptions = {  
        loop: true,  
        autoplay: true,  
        animationData: animationData,  
        rendererSettings: {  
            preserveAspectRatio: 'xMidYMid slice'  
        }  
    };  

    return <Lottie options={defaultOptions} height={size} width={300} />;  
};















// import Lottie from 'react-lottie';  
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

//     return <Lottie options={defaultOptions} height={250} width={250} />;  
// };  

