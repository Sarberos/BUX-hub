
export const useTelegramApi=()=>{
    const tg =window.Telegram.WebApp;
    const user=tg?.initDataUnsafe?.user;
    const userId= user?.id;
    const openLink=(url:string)=>{
        tg.openLink(url)
    }
    const onClose=()=>{
        tg.close();
    }
    const hapticFeedBack=()=>{
        tg.HapticFeedback.impactOccurred('heavy')
    }
    return({tg,user,userId,onClose,openLink,hapticFeedBack})
}