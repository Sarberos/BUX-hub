
export const calcFarmedCoins=(startDate:string)=>{
  const startTime=new Date(startDate);
  const nowTime=new Date();

  const timeDiferens=nowTime.getTime()-startTime.getTime();
  return Math.ceil(timeDiferens/2700*0.01)
}