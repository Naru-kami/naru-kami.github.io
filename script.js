function wishing() {
    const wanted = 1;
    const _rate5 = 0.006;
    const _rate4 = 0.051;
    const _pity5 = 73;
    const _pity4 = 8
    const promoted = 0;
    const pulls = 0;
    const starglitters = 0;
    const prob5, prob4;
    const pullsResult = [];
    const starglittersResult = [];
    const reducedResult = [];

    const gc = 0
    const g = false;
    const counter5 = 1;
    const counter4 = 1;

    while (promoted < wanted) {
        pulls += 1;
        prob5 = _rate5 + Math.min(1, Math.max(0, (counter5 - _pity5) * 10 * _rate5));
        prob4 = _rate4 + Math.min(1, Math.max(0, (counter5 - _pity4) * 10 * _rate4));

        const x = Math.random();

        if (x < prob5) {
            if (x <= prob5/2 || gc == 1){
                gc = 0;
                promoted += 1;
            } else {
                gc += 1;
            }
            counter5 = 1;
            counter4 += 1;
            starglitters += (10 * (wanted - g)) / wanted;
        } else if ( x < prob4 + prob5) {
            counter5 += 1;
            counter4 = 1;
            starglitters += 2;
        } else {
            counter5 += 1;
            counter4 += 1;
        }
    }

    pullsResult.push(pulls);
    starglittersResult.push(starglitters);
    reducedResult.push(pulls - Math.floor(starglitters / 5) + 2);
    return { pullsResult, starglittersResult, reducedResult };
}
