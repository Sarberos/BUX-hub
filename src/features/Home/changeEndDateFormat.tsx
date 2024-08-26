export const changeEndDateFormat=(date:string|null)=>{
    if (!date) {  
        return null; 
    }  
    const pastDate:Date = new Date(date);
    const now:Date= new Date();

    const dateDifferce=(pastDate.getTime())-now.getTime();
    const minuts:number = dateDifferce>=0? Math.floor(dateDifferce/60000) :0;
    const hours:number =dateDifferce>=0? Math.floor(minuts/60):0;
    const currentMin :number=minuts%60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(currentMin).padStart(2, '0');



    return {formattedHours,formattedMinutes,minuts:currentMin,hours}
}