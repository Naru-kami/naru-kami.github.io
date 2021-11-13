document.addEventListener('DOMContentLoaded', Action);
function Action(){
    var goalButton  = document.getElementById("goal"),
        runButton   = document.getElementById("runButton"),
        wanted      = document.getElementById("focus_count"),
        sgUse       = document.getElementById("sg_use"),
        goal        = document.getElementById('goal'),
        pityCount   = document.getElementById("pity_count"),
        sgCount     = document.getElementById("sg_count"),
        offbanner   = document.getElementById("offbanner"),
        c5s         = document.getElementById("5s_c"),
        c4s1        = document.getElementById("4s1"),
        c4s2        = document.getElementById("4s2"),
        c4s3        = document.getElementById("4s3"),
        gcCheck     = document.getElementById("gcCheck"),
        gcCounter   = document.getElementById("gcCounter"),
        Minus       = document.getElementById("-"),
        Plus        = document.getElementById("+"),
        Canvas      = document.getElementById("myChart");
    
    goalButton.addEventListener("change", getOption);
    runButton.addEventListener("click", draw);
    gcCheck.addEventListener("click", getOption);
    sgUse.addEventListener("click", showMe);

    goalButton.addEventListener("change", reset);
    wanted.addEventListener("input", reset);
    sgUse.addEventListener("input", reset);
    goal.addEventListener("input", reset);
    pityCount.addEventListener("input", reset);
    sgCount.addEventListener("input", reset);
    offbanner.addEventListener("input", reset);
    c5s.addEventListener("input", reset);
    c4s1.addEventListener("input", reset);
    c4s2.addEventListener("input", reset);
    c4s3.addEventListener("input", reset);
    gcCheck.addEventListener("input", reset);
    gcCounter.addEventListener("input", reset);
    Minus.addEventListener("mousedown", minus);
    Plus.addEventListener("mousedown", plus);
    Minus.addEventListener("mouseup", mouseup);
    Plus.addEventListener("mouseup", mouseup);
    Minus.addEventListener("mouseout", mouseup);
    Plus.addEventListener("mouseout", mouseup);    
    Canvas.addEventListener("mouseenter", hideLabel);
    Canvas.addEventListener("mouseleave", showLabel);

    const ye = 100000;
    document.getElementById("sampleSize").innerText = ye.toLocaleString(undefined);
}

var blob = new Blob([
    document.querySelector('#worker').textContent
], { type: "text/javascript" });
var blob2 = new Blob([
    document.querySelector('#worker2').textContent
], { type: "text/javascript" });

var worker,
    worker2, worker3, worker4
    smp = 100000,
    xArr = [],
    yArr = [],
    helper = [],
    holdStarter = null,
    holdActive = false,
    mouseDown = null,
    wCount = 0;

function reset(){
    xArr = [];
    yArr = [];
    document.getElementById("runButton").innerHTML = "Run";
}
function draw(){
    if(worker){
        worker.terminate();
        worker2.terminate();
        worker3.terminate();
        worker4.terminate();
    }
    document.getElementById("myBar").style.width = 0 + "%";
    document.getElementById("myProgress").style.display = "block";
    worker = new Worker (window.URL.createObjectURL(blob));
    worker2 = new Worker (window.URL.createObjectURL(blob2));
    worker3 = new Worker (window.URL.createObjectURL(blob2));
    worker4 = new Worker (window.URL.createObjectURL(blob2));
    postToWorker(worker);
    postToWorker(worker2);
    postToWorker(worker3);
    postToWorker(worker4);
    worker2.onmessage = function(e){
        for( let v = 0; v < e.data.pullsResult.length; v++){
            if (xArr[v]==null){
                xArr.push(v);
                yArr.push(0);
                helper.push(0);
            }
            yArr[v] += e.data.pullsResult[v];
        }
        wCount += 1;
        if(wCount == 4){
            assemble();
        }
        worker2.terminate();
    }
    worker3.onmessage = function(e){
        for( let v = 0; v < e.data.pullsResult.length; v++){
            if (xArr[v]==null){
                xArr.push(v);
                yArr.push(0);
                helper.push(0);
            }
            yArr[v] += e.data.pullsResult[v];
        }
        wCount += 1;
        if(wCount == 4){
            assemble();
        }
        worker3.terminate();
    }
    worker4.onmessage = function(e){
        for( let v = 0; v < e.data.pullsResult.length; v++){
            if (xArr[v]==null){
                xArr.push(v);
                yArr.push(0);
                helper.push(0);
            }
            yArr[v] += e.data.pullsResult[v];
        }
        wCount += 1;
        if(wCount == 4){
            assemble();
        }
        worker4.terminate();
    }
    worker.onmessage = function (e){
        if ( e.data.progress != null){
            document.getElementById("myBar").style.width = e.data.progress + "%";
            document.getElementById("myBarText").innerHTML = e.data.progress + "%";
            return;
        }
        for( let v = 0; v < e.data.pullsResult.length; v++){
            if (xArr[v]==null){
                xArr.push(v);
                yArr.push(0);
                helper.push(0);
            }
            yArr[v] += e.data.pullsResult[v];
        }
        wCount += 1;
        if(wCount == 4){
            assemble();
        }
        worker.terminate();
    }
}
function assemble(){
    for ( v = 0; v < yArr.length; v++){
        helper[v] = yArr[v];
    }
    cumulate(helper);
    const n = helper[helper.length-1];
    normalize(helper, n);
    simulChart.data.labels = xArr;
    simulChart.data.datasets[0].data = helper;
    simulChart.options.scales.x.ticks = {
        autoSkip: true,
        callback: function(value, index, values) {
            let newticks = Math.ceil(Math.max.apply(null, xArr)/100/10)*10;
            if (value % newticks == 0){
                return value;
            }
        },
        maxRotation : 0
    };
    simulChart.update('none');
    document.getElementById("myProgress").style.display = "none";
    document.getElementById("runButton").innerHTML = "More samples";
    document.getElementById("sample").innerHTML = "&nbsp;&nbsp;&nbsp;Sample size: " + n.toLocaleString(undefined);
    helper = [];
    wCount = 0;
}
function postToWorker(f){
    f.postMessage({
        wanted      : Number(document.getElementById("focus_count").value),
        sgUse       : document.getElementById("sg_use").checked,
        goal        : document.getElementById('goal').value,
        pityCount   : Number(document.getElementById("pity_count").value),
        sgCount     : Number(document.getElementById("sg_count").value),
        offbanner   : document.getElementById("offbanner").checked,
        c5s         : Number(document.getElementById("5s_c").value),
        c4s1        : Number(document.getElementById("4s1").value),
        c4s2        : Number(document.getElementById("4s2").value),
        c4s3        : Number(document.getElementById("4s3").value),
        gcCheck     : document.getElementById("gcCheck").checked,
        gcCounter   : Number(document.getElementById("gcCounter").value),
        n           : smp/4
    });
}
function showMe () {
    var chbox = document.getElementById("sg_use");
    var vis = "none";
    if(chbox.checked == true){
    vis = "block";
    }
    document.getElementById("starglitter").style.display = vis;
}
function getOption() {
    var vis = "none";
    var vis2 = "block";
    var v = 0;
    var pityMax = 90,
        focusMax = 7;

    if(document.getElementById('goal').value == 1 && document.getElementById('gcCheck').checked == true){
    vis = "block";
    v = 2;
    }
    if(document.getElementById('goal').value == 1){
        pityMax = 80;
        focusMax = "";
        vis2 = "none";
    }
    document.getElementById("offbanner").checked = false;
    document.getElementById("const_input").style.display = vis2;
    document.getElementById("focus_count").max = focusMax;
    document.getElementById("pity_count").max = pityMax;
    document.getElementById("wpity").style.display = vis;
    document.getElementById("gcCounter").value = v;
}
function normalize(A, n){
    for(let i=0; i<A.length; i++){
        A[i] *= 100/n;
    }
    return A;
}
function cumulate(A){
    for(let h = 1; h < A.length; h++){
        A[h] += A[h-1];
    }
    return A;
}
function minus(){
    if (smp <= 0){return;}
    smp -= 100000;
    document.getElementById("sampleSize").textContent = smp.toLocaleString(undefined);
    holdStarter = setTimeout(() => {
        holdStarter = null;
        holdActive = true;
        mouseDown =  setInterval(iter,75);
        function iter(){
            if (smp>0){
                smp -= 100000;
                document.getElementById("sampleSize").textContent = smp.toLocaleString(undefined);
            }else 
                mouseup();
        }
    }, 500);
}
function plus(){
    smp += 100000;
    document.getElementById("sampleSize").textContent = smp.toLocaleString(undefined);
    holdStarter = setTimeout(() => {
        holdStarter = null;
        holdActive = true;
        mouseDown =  setInterval(iter,75);
        function iter(){
            smp += 100000;
            document.getElementById("sampleSize").textContent = smp.toLocaleString(undefined);
        }
    }, 500);
}
function mouseup(event){
    if(holdStarter) {
        clearTimeout(holdStarter);
    }else if(holdActive){
        holdActive = false;
        mouseDown = clearInterval(mouseDown);
        mouseDown = null;
    }
}

function hideLabel(){
    simulChart.options.plugins.datalabels = {display: false};
    simulChart.update("none");
}
function showLabel(){
    simulChart.options.plugins.datalabels = {
        display: function(e) {
            let data = e.dataset.data, close = [], goal = [10, 25, 50, 75, 90];
            for (let i=0; i<5; i++){
                close [i] = data.reduce(function(prev, curr) {
                    return (Math.abs(curr - goal[i]) < Math.abs(prev - goal[i]) ? curr : prev);
                });
                goal[i] = data.indexOf(close[i]);
            }
            return goal.includes(e.dataIndex)?'auto':false;
        },
        formatter: function(e, t) {
            return (e).toFixed(1) + " %\n" + t.dataIndex + " Pulls"
        },
        align: "225",
        anchor: "center",
        offset: 0,
        backgroundColor: "#000",
        borderRadius: 4,
        color: "#fff",
        opacity: 0.8,
        padding: {
            top: 4,
            right: 4,
            bottom: 0,
            left: 4
        }
    };
    simulChart.update("none");
}