function BinomPDF(k, n, p) {
    if(k > n || k < 0){
        return 0;
    }
    if(k == 0){
        return Math.pow(1.0-p, (n));
    }
    return BinomPDF(k-1, n, p) * (n-k+1.0) / (k) * p / (1.0-p) ;
}

function BinomCDF(start, n, p) {
    var sum = 0;
    for(let i = start; i <= n; i++){
        sum += BinomPDF(i, n, p);
    }
    return sum;
}

function binomial_cdf(x,n,p) {
    var log_pmf_k;
    var cdf = 0;
    var b = 0;
    for (let k = x; k<= n; k++) {
        if (k > 0)
            b += + Math.log(n-k+1) - Math.log(k) ;
        log_pmf_k = b + k * Math.log(p) + (n-k) * Math.log(1-p);
        cdf += Math.exp(log_pmf_k);
    }
    return cdf;
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
            document.getElementById("mainstat").innerHTML = "Mainstat Chance: " + (100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " %";
            break;
        case 1:
            document.getElementById("mainstat").innerHTML = "Mainstat Chance: " + (100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " %";
            break;
        case 2: {
            mainweights = [0, 0, 0, 1334, 1333, 1333, 500, 500, 0, 0];
            let x = mainweights[mainstat[1]] / (mainweights.reduce( (a,b) => a + b, 0));
            document.getElementById("mainstat").innerHTML = "Mainstat Chance: " + (x*100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " %";
            mainchance *= x;
            break;
        }
        case 3: {
            mainweights = [0, 0, 0, 850, 850, 800, 0, 100, 0, 0, 200, 200, 200, 200, 200, 200, 200];
            let x = mainweights[mainstat[1]] / (mainweights.reduce( (a,b) => a + b, 0));
            document.getElementById("mainstat").innerHTML = "Mainstat Chance: " + (x*100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " %";
            mainchance *= x;
            break;
        }
        case 4: {
            mainweights = [0, 0, 0, 1100, 1100, 1100, 0, 200, 500, 500, 500];
            let x = mainweights[mainstat[1]] / (mainweights.reduce( (a,b) => a + b, 0));
            document.getElementById("mainstat").innerHTML = "Mainstat Chance: " + (x*100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " %";
            mainchance *= x;
            break;
        }
    }
    return mainchance;
}

function exit(){
    if (worker) {
        worker.terminate();
        document.getElementById("myProgress").style.display = "none";
    }
}

function fact(n){
    if(n > 20)
        return 0;
    if(n == 0 || n == 1)
        return 1;
    var f = 1;
    for(let i = 2; i <= n; i++){
        f *= i;
    }
    return f;
}

function MultinomPDF( stat ){
    var N = stat.reduce( (a,b) => a+b, 0 );
    var chance = fact(N);
    for(let i = 0; i < stat.length; i++){
        chance /= fact(stat[i]);
    }
    chance *= Math.pow( 1/4, N);
    return chance;
}

function populate(){
    var trials = document.getElementById('resinA').value/document.getElementById('resinD').value;
    if (worker){
        worker.terminate();
    }
    if(artichance != 0){
        document.getElementById("myBar").style.width = 0 + "%";
        document.getElementById("myProgress").style.display = "block";
        worker = new Worker (window.URL.createObjectURL(blob));
        worker.postMessage({
            artichance: artichance,
            trials: trials
        })
        worker.onmessage = function (e) {
            if ( e.data.progress != null){
                document.getElementById("myBar").style.width = (e.data.progress/99*100).toFixed(1) + "%";
                document.getElementById("myBarText").innerHTML = (e.data.progress/99*100).toFixed(1) + "%";
                return;
            }
            simulChart.data.datasets[0].data = e.data.data;
            simulChart.data.labels = e.data.label;
            simulChart.options.scales.x.ticks = {
                autoSkip: true,
                callback: function(value, index, values) {
                    let r = simulChart.data.labels[value];
                    if (index % (Math.floor(values.length/20)) == 0) 
                        return r.toFixed(0);;
                },
                maxRotation : 0
            };
            simulChart.update('none');
            document.getElementById("myProgress").style.display = "none";
        }
    }
}

var blob = new Blob([
    document.querySelector('#worker').textContent
], { type: "text/javascript" });
var artichance, worker;

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
    permutate(subbase.length, subbase, mainbase);
    document.getElementById("subconfig").innerHTML = "Substat Config Chance: " + (artichance*100).toLocaleString(undefined, {minimumFractionDigits: 6, maximumFractionDigits: 6}) + " %";
    artichance *= calcmainodds(mainbase);
    document.getElementById("basestat").innerHTML = "Base Artifact chance:  " + (artichance*100).toLocaleString(undefined, {minimumFractionDigits: 6, maximumFractionDigits: 6}) + " %";
    populate();
}


document.addEventListener('DOMContentLoaded', Action);
function Action(){
    var run = document.getElementById("runButton");
    run.addEventListener("click", main);
}