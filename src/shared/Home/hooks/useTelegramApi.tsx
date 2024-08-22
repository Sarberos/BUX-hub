
export const useTelegramApi=()=>{
    const tg =window.Telegram.WebApp;
    const user=tg?.initDataUnsafe?.user;
    const onClose=()=>{
        tg.close
    }
    return({tg,user,onClose})
}