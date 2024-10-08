export  function changeCoinFormat(num:number):string{
    let helpArr=num.toString().split('').reverse();
    const arrowIndex:number=helpArr.indexOf('.');
    let middleArr=helpArr.slice(-(helpArr.length - arrowIndex-1));

    let result:string[]=[];
    for (let i = 0; i < middleArr.length; i += 3) {
        const group = middleArr.slice(i, i + 3).reverse().join('');
        result.push(group)
    }

    return result.reverse().join(' ')+ helpArr.splice(0,arrowIndex+1).reverse().join('');

}
