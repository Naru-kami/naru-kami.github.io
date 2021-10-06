function wishing(wanted){
    var _rate5 = 0.006;
    var _rate4 = 0.051;
    var _pity5 = 73;
    var _pity4 = 8
    var promoted = 0;
    var pulls = 0;
    var starglitters = 0;
    var prob5, prob4;

    var gc = 0
    var g = false;
    var counter5 = 1;
    var counter4 = 1;

    while (promoted < wanted){
    while (promoted < wanted) {
        pulls += 1;
        prob5 = _rate5 + Math.min(1, Math.max(0, (counter5 - _pity5) * 10 * _rate5));
        prob4 = _rate4 + Math.min(1, Math.max(0, (counter5 - _pity4) * 10 * _rate4));

        var x = Math.random();

        if (x < prob5){
            if (x <= prob5/2 || gc == 1){
                gc = 0;
                promoted += 1;
            } else{
                gc += 1;
            }
            counter5 = 1;
            counter4 += 1;
            starglitters += (10 * (wanted - g)) / wanted;
        } else if ( x < prob4 + prob5){
            counter5 += 1;
            counter4 = 1;
            starglitters += 2;
        } else {
            counter5 += 1;
            counter4 += 1;
        }
    }
    return pulls, starglitters, pulls - Math.floor(starglitters / 5) + 2;
}