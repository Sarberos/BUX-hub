export const keepCoinsFormat = (coins: number): string => {
    let coinStr = coins.toString();
    let dotIndex = coinStr.indexOf('.');

    if (dotIndex !== -1) {
        let decimalPart = coinStr.slice(dotIndex + 1);
        if (decimalPart.length === 1) {
            coinStr += '0';
        }
    } else {
        coinStr += '.00';
    }
    return coinStr;
}