export const changeDateFormat=(date:string|null)=>{
    if (!date) {  
        return null; 
    }  
    const pastDate:Date = new Date(date);
    const now:Date= new Date();

    const dateDifferce=(pastDate.getTime()+12*60*60*1000)-now.getTime();
    const sec:number=dateDifferce>=0? Math.floor(dateDifferce/1000):0;
    const minuts:number = dateDifferce>=0? Math.floor(dateDifferce/60000):0;
    const hours:number =dateDifferce>=0? Math.floor(minuts/60):0;
    const currentMin :number=minuts%60;
    const currentSec :number=sec%60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(currentMin).padStart(2, '0');
    const formattedSec=String(currentSec).padStart(2, '0');



    return {formattedHours,formattedMinutes,formattedSec,sec:currentSec,minuts:currentMin,hours}
}