import Lottie from "react-lottie";  
import animationData from "@shared/Home/assets/anim/Animation - 1725476922777.json"; 

export const AnimationMainImg = () => {
    const defaultOptions = {  
        loop: true,  
        autoplay: true,  
        animationData: animationData,
        rendererSettings: {  
            preserveAspectRatio: 'xMidYMid slice'  
        }  
    };  

    return <Lottie options={defaultOptions} style={{position:'relative',left:'6px'}} width={'100%'}/>;
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

