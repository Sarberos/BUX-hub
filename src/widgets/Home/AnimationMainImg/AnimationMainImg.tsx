import { useEffect, useState } from "react";  
import Lottie from "react-lottie";  
import animationData from "@shared/Home/assets/anim/Animation - 1725476922777.json"; // Убедитесь, что путь к вашему файлу анимации правильный  

export const AnimationMainImg = () => {  
    const [size, setSize] = useState(300);  

    const updateSize = () => {  
        const newHeight = window.innerHeight * 0.44; // 30% от высоты экрана  

        setSize(newHeight);  
    };  

    useEffect(() => {  
        updateSize();  
        window.addEventListener("resize", updateSize);  
        return () => window.removeEventListener("resize", updateSize);  
    }, []);  

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

