function wishing(n) {
    let wanted = Number(document.getElementById("focus_count").value);
    let _rate5 = Banner().rate5;
    let _rate4 = Banner().rate4;
    let _pity5 = Banner().pity5;
    let _pity4 = Banner().pity4;
    let prob5 = 0;
    let prob4 = 0;
    let pullsResult = [0];
    let pullnumber = [0];
    let checking = document.getElementById("sg_use").checked;
    let g = document.getElementById('goal').value;
    for (let j = 0; j < n; j++){
        let gc = Banner().gc;
        let counter5 = Number(document.getElementById("pity_count").value);
        let counter4 = 1;
        let starglitters = Number(document.getElementById("sg_count").value);
        let pulls = 0;
        let promoted = 0;
        let fs1 = 0, fs2 = 0, fs3 = 0;
        let offbanner = document.getElementById("offbanner").checked ? 1 : 0;
        
        while (promoted < wanted) {
            pulls += 1;
            if (checking && starglitters >= 5) {
                pulls -= 1;
                starglitters -= 5;
            }
            prob5 = Math.min(1, _rate5 + Math.max(0, (counter5 - _pity5) * 10 * _rate5));
            prob4 = Math.min(1, _rate4 + Math.max(0, (counter4 - _pity4) * 10 * _rate4));
            let x = Math.random();
            if (x < prob5) {
                if(document.getElementById('goal').value == 0){
                    if (x <= prob5/2 || gc == 1){
                        gc = 0;
                        promoted += 1;
                    } else {
                        gc += 1;
                    }
                } else if (document.getElementById('goal').value == 1){
                    if(offbanner == 1) { x*=0.75; }
                    if (x <= prob5*0.375 || gc == 2){
                        gc = 0;
                        promoted += 1;
                    } else {
                        gc += 1;
                    }
                     x > prob5*0.75 ? offbanner += 1 : offbanner = 0;
                }
                counter5 = 1;
                counter4 += 1;
                starglitters += GetStarglitter(5, promoted + Number(document.getElementById("5s_c").value),true);
            } else if ( x < prob4 + prob5) {
                counter5 += 1;
                counter4 = 1;
                if (g == 0){
                    if ( x < (prob4+prob5)/3/2 ){
                        starglitters += GetStarglitter(4, fs1 + Number(document.getElementById("4s1").value),false);
                        fs1 += 1;
                    } else if (x < (prob4+prob5)/3 ){
                        starglitters += GetStarglitter(4, fs2 + Number(document.getElementById("4s2").value),false);
                        fs2 += 1;
                    } else if (x < (prob4+prob5)/2 ) {
                        starglitters += GetStarglitter(4, fs3 + Number(document.getElementById("4s3").value),false);
                        fs3 += 1;
                    }
                }
                else {starglitters += 2;}
            } else {
                counter5 += 1;
                counter4 += 1;
            }
        }
        if (pullsResult[pulls] == null){
            for (let k = pullsResult.length; k <= pulls; k++){
                pullsResult.push(0);
                pullnumber.push(k);
            }
        }
        pullsResult[pulls] += 1/n*100;
    }
    for(let h = 1; h < pullsResult.length; h++){
        pullsResult[h] += pullsResult[h-1];
    }
    return { pullnumber, pullsResult };
}

function GetStarglitter(star, count, bool){
    if (bool === true){return 10;}
    if ( star == 5){
        if ( count == -1 ) {
            return 0;
        } else if ( count >= 0 && count < 6 ) {
            return 10;
        } else { return 25;}
    } else if ( star == 4 ){
        if ( count == -1 ) {
            return 0;
        } else if ( count >= 0 && count < 6 ) {
            return 2;
        } else { return 10;}
    }
}

function Banner(){
    let rate5 = 0.006;
    let rate4 = 0.051;
    let pity5 = 73;
    let pity4 = 8;
    let gc = document.getElementById("gcCheck").checked ? 1: 0;
    if (document.getElementById('goal').value == 1){
        rate5 = 0.007;
        rate4 = 0.06;
        pity5 = 62;
        gc = Number(document.getElementById("gcCounter").value);
    }
    return {rate5,rate4,pity5,pity4,gc};
    
}