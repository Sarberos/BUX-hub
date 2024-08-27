
export const useTelegramApi=()=>{
    const tg =window.Telegram.WebApp;
    const user=tg?.initDataUnsafe?.user;
    const openLink=(url:string)=>{
        tg.openLink(url)
    }
    const onClose=()=>{
        tg.close
    }
    return({tg,user,onClose,openLink})
}