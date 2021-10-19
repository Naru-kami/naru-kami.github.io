function wishing(n) {
    let wanted = 1;
    let _rate5 = 0.006;
    let _rate4 = 0.051;
    let _pity5 = 73;
    let _pity4 = 8
    let prob5 = 0;
    let prob4 = 0;
    let pullsResult = [];
    let starglittersResult = [];
    let reducedResult = [];
    for (let i=0; i < wanted*180; i++){
        pullsResult.push(0);
        starglittersResult.push(0);
        reducedResult.push(0);
    }
    for (let j = 0; j < n; j++){
        let gc = 0
        let counter5 = 1;
        let counter4 = 1;
        let starglitters = 0;
        let pulls = 0;
        let promoted = 0;
        while (promoted < wanted) {
            pulls += 1;
            prob5 = _rate5 + Math.min(1, Math.max(0, (counter5 - _pity5) * 10 * _rate5));
            prob4 = _rate4 + Math.min(1, Math.max(0, (counter5 - _pity4) * 10 * _rate4));
            let x = Math.random();
            if (x < prob5) {
                if (x <= prob5/2 || gc == 1){
                    gc = 0;
                    promoted += 1;
                } else {
                    gc += 1;
                }
                counter5 = 1;
                counter4 += 1;
                starglitters += 10;
            } else if ( x < prob4 + prob5) {
                counter5 += 1;
                counter4 = 1;
                starglitters += 2;
            } else {
                counter5 += 1;
                counter4 += 1;
            }
        }
        pullsResult[pulls] += 1;
        starglittersResult[starglitters] += 1;
        reducedResult[pulls - Math.floor(starglitters / 5) + 2] += 1;
    }
    return { pullsResult, starglittersResult, reducedResult };
}
