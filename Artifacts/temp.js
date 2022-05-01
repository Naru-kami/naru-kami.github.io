function randInt(min,max){
    var x = Math.random();
    return Math.floor( x * ( max + 1 - min ) + min );
}

function choices(Arr, weights){
    var n = 0, wc = 0, x = 0;
    for(let i = 0; i < weights.length; i++){
        n += weights[i];
    }
    x = randInt(0,n-1);
    for(let i = 0; i < weights.length; i++){
        wc += weights[i];
        if(x < wc){
            return Arr[i];
        }
    }
}

function callSubstats(Arr, n){
    var roll,
        substats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        subweights = [150, 150, 150, 100, 100, 100, 100, 100, 75, 75];
                    // [hp , atk, def, hp%,atk%,def%, ER%, EM ,cr%,cd%]
    if (n >= 1 && n <=10){
        subweights[substats.indexOf(n)] = 0;
    }
    for (let i = 2 ; i < 6 ; i++){
        roll = choices(substats, subweights, 10);
        Arr[i] = roll;
        subweights[substats.indexOf(roll)] = 0;
    }
}

function callArtifact(Arr){
    var x = randInt(1,5);
    Arr[0] = x;
    switch (x){
        case 1: { Arr[1] = x; callSubstats(Arr,x); break;}
        case 2: { Arr[1] = x; callSubstats(Arr,x); break;}
        case 3: {
            let v = [1,2,3,4,5,6,7,8,9,10];
            let w = [0,0,0,1334,1333,1333,500,500,0,0];
            Arr[1] = choices(v,w,10);
            callSubstats(Arr,Arr[1]);
            break;
        }
        case 4: {
            let v = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
            let w = [0,0,0,850,850,800,0,100,0,0,200,200,200,200,200,200,200];
            Arr[1] = choices(v,w,17);
            callSubstats(Arr,Arr[1]);
            break;
        }
        case 5: {
            let v = [1,2,3,4,5,6,7,8,9,10,11];
            let w = [0,0,0,1100,1100,1100,0,200,500,500,500];
            Arr[1] = choices(v,w,11);
            callSubstats(Arr,Arr[1]);
            break;
        }     
    }
}

function upgradeArtifact(){
    var upgrade = [0,0,0,0];
    for (let i = 0 ; i < 5; i++){
        upgrade[randInt(0,4)]++;
    }
    return upgrade;
}

var results = [0], artif = [0,0,0,0,0,0];
const c = 3;
for(let i = 0; i < 1e5; i++){
    let check = 0;
    let counter = 0;
    while(check < c){
        counter++;
        artif = [0,0,0,0,0,0];
        callArtifact(artif);
        if(artif[0] == 1 && artif[1] == 1){
            for(let j = 2; j < 6; j++){
                if(artif[j] == 5 || artif[j] == 9 || artif[j] == 10){
                    check++;
                }
            }
        }
        check = (check == c) ? c : 0;
    }
    if(results[i] == null){
        for (let k = results.length; k <= counter; k++){
            results.push(0);
        }
    }
    results[counter]++;
}