function Binom(k, n, p){
    if(k > n || k < 0){
        return 0;
    }
    if(k == 0){
        return pow(1.0-p, double(n));
    }
    return Binom(k-1, n, p) * (n-k+1.0) / double(k) * p / (1.0-p) ;
}

function BinomCDF(k, n, p){
    if(k > n || k < 0){
        return 0;
    }
    var sum = 0;
    for(let i = 0; i <= k; i++){
        sum += Binom(i, n, p);
    }
    return sum;
}

function frac(k){
    if(k == 0){
        return 1;
    } else {
        return k*frac(k-1);
    }
}

function swap(arr, a, b){
    var c = arr[a];
    arr[a] = arr[b];
    arr[b] = c;
    return arr;
}

function permutate(k, sub, mainstat){
    if (k == 1){
        artichance += advancedodds(mainstat, sub.slice()) / (frac(sub.filter(e => e == -1).length));
    }
    else{
        permutate(k - 1, sub, mainstat);
        for(let i = 0; i < k-1; i ++){
            if( k % 2 == 0)
                swap(sub,i,k-1);
            else
                swap(sub,0,k-1);
            permutate(k - 1, sub, mainstat);
        }
    }
}

function calcodds(mainstat, arr) {
    if(arr.includes(mainstat[1]))
        return 0;
    var chance=1;//hp , atk, def, hp%,atk%,def%, ER%, EM ,cr%,cd%
    var weights = [150, 150, 150, 100, 100, 100, 100, 100, 75, 75];
    if ( (mainstat[1] < 10) && (mainstat[1] >= 0) ){
        weights[mainstat[1]] = 0;
    }
    for (let i = 0; i < arr.length; i++){
        chance *= weights[arr[i]] / (weights.reduce( (a,b) => a + b, 0));
        weights[arr[i]] = 0;
    }
    return chance;
}

function advancedodds(mainstat, arr){
    if (arr.includes(-1) == false)
        return calcodds(mainstat, arr);
    else{
        var chance = 0;
        let hmax = arr[0] == -1 ? 10 : 1;
        let imax = arr[1] == -1 ? 10 : 1;
        let jmax = arr[2] == -1 ? 10 : 1;
        let kmax = arr[3] == -1 ? 10 : 1;
        for(let h = 0; h < hmax; h++){
            for(let i = 0; i < imax; i++){
                for(let j = 0; j < jmax; j++){
                    for(let k = 0; k < kmax; k++){
                        arr[0] = hmax == 1 ? arr[0] : h;
                        arr[1] = imax == 1 ? arr[1] : i;
                        arr[2] = jmax == 1 ? arr[2] : j;
                        arr[3] = kmax == 1 ? arr[3] : k;
                        chance += calcodds(mainstat, arr);
                    }
                }
            }
        }
        return chance;
    }
}

function calcmainodds(mainstat){
    var mainchance = 0.2;
    var mainweights;
    switch(mainstat[0]){
        case 0:
            break;
        case 1:
            break;
        case 2:
            mainweights = [0, 0, 0, 1334, 1333, 1333, 500, 500, 0, 0];
            mainchance *= mainweights[mainstat[1]] / (mainweights.reduce( (a,b) => a + b, 0));
            break;
        case 3:
            mainweights = [0, 0, 0, 850, 850, 800, 0, 100, 0, 0, 200, 200, 200, 200, 200, 200, 200];
            console.log(mainweights[mainstat[1]] / (mainweights.reduce( (a,b) => a + b, 0)));
            mainchance *= mainweights[mainstat[1]] / (mainweights.reduce( (a,b) => a + b, 0));
            break;
        case 4:
            mainweights = [0, 0, 0, 1100, 1100, 1100, 0, 200, 500, 500, 500];
            mainchance *= mainweights[mainstat[1]] / (mainweights.reduce( (a,b) => a + b, 0));
            break;
    }
    return mainchance;
}

var artichance;

function main(){
    var subbase = [0,0,0,0];
    var mainbase = [0,0];
    mainbase[0] = Number(document.getElementById("type").value);
    mainbase[1] = Number(document.getElementById("main").value);
    subbase[0] = Number(document.getElementById("sub1").value);
    subbase[1] = Number(document.getElementById("sub2").value);
    subbase[2] = Number(document.getElementById("sub3").value);
    subbase[3] = Number(document.getElementById("sub4").value);
    artichance = 0;
    console.log(mainbase, subbase);
    permutate(subbase.length, subbase, mainbase);
    artichance *= calcmainodds(mainbase);
    console.log(artichance*100);
    document.getElementById("basestat").innerHTML = "Base Artifact chance:  " + (artichance*100).toLocaleString(undefined, {minimumFractionDigits: 6, maximumFractionDigits: 6}) + " %";
}


document.addEventListener('DOMContentLoaded', Action);
function Action(){
    var run = document.getElementById("runButton");
    run.addEventListener("click", main);
}