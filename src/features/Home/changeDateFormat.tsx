export const changeDateFormat=(date:string|null)=>{
    if (!date) {  
        return null; 
    }  
    const pastDate:Date = new Date(date);
    const now:Date= new Date();

    const dateDifferce=now.getTime()-pastDate.getTime();
    const minuts:number = Math.floor(dateDifferce/60000)
    const hours:number = Math.floor(minuts/60)

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minuts).padStart(2, '0');

    return {formattedHours,formattedMinutes}
}