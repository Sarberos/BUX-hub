
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
        // tg.HapticFeedback.selectionChanged();
        tg.HapticFeedback.impactOccurred('rigid')
    }
    const rigidFeedBack=()=>{
        tg.HapticFeedback.impactOccurred('rigid')
    }
    return({tg,user,userId,onClose,openLink,hapticFeedBack,rigidFeedBack})
}