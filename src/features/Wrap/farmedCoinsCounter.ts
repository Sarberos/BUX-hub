
export const farmedCoinsCounter=(dateDifferce:number)=>{
        const coinsSpeed:number=3*60*60*1000/40;
        return Math.round((3*60*60*1000 - dateDifferce)/coinsSpeed*10000);
}