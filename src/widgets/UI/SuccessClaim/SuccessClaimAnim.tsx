import Lottie from "react-lottie";
import animationData from "@shared/UIComponents/assets/purcased_anim.json";


export const  SuccessClaimAnim= () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Lottie options={defaultOptions}  />
    );
};