document.addEventListener('DOMContentLoaded', Action);
function Action(){
    var goalButton  = document.getElementById("goal"),
        runButton   = document.getElementById("runButton"),
        wanted      = document.getElementById("focus_count"),
        sgUse       = document.getElementById("sg_use"),
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
        Switching   = document.getElementById("switch");
    
    goalButton.addEventListener("change", getOption);
    runButton.addEventListener("click", draw);
    gcCheck.addEventListener("click", getOption);
    sgUse.addEventListener("click", showMe);
    Switching.addEventListener("click", switchTo);

    goalButton.addEventListener("change", reset);
    wanted.addEventListener("input", reset);
    sgUse.addEventListener("input", reset);
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
    holdStarter = null,
    holdActive = false,
    mouseDown = null,
    wCount = 0,
    switcher = false;

function reset(){
    xArr = [];
    yArr = [];
    document.getElementById("runButton").innerHTML = "Run";
    simulChart.data.datasets[0].data = [];
    simulChart.data.labels = [0];
    simulChart.update();
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
        const len = e.data.pullsResult.length;
        const ylen = yArr.length;
        if (len > ylen){
            for( let v = 0; v < (len - ylen); v++){
                xArr.push(ylen+v);
                yArr.push(0);
            }
        }
        for( let v = 0; v < len; v++){
            yArr[v] += e.data.pullsResult[v];
        }
        wCount += 1;
        if(wCount == 4){
            assemble();
        }
        worker2.terminate();
    }
    worker3.onmessage = function(e){
        const len = e.data.pullsResult.length;
        const ylen = yArr.length;
        if (len > ylen){
            for( let v = 0; v < (len - ylen); v++){
                xArr.push(ylen+v);
                yArr.push(0);
            }
        }
        for( let v = 0; v < len; v++){
            yArr[v] += e.data.pullsResult[v];
        }
        wCount += 1;
        if(wCount == 4){
            assemble();
        }
        worker3.terminate();
    }
    worker4.onmessage = function(e){
        const len = e.data.pullsResult.length;
        const ylen = yArr.length;
        if (len > ylen){
            for( let v = 0; v < (len - ylen); v++){
                xArr.push(ylen+v);
                yArr.push(0);
            }
        }
        for( let v = 0; v < len; v++){
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
        const len = e.data.pullsResult.length;
        const ylen = yArr.length;
        if (len > ylen){
            for( let v = 0; v < (len - ylen); v++){
                xArr.push(ylen+v);
                yArr.push(0);
            }
        }
        for( let v = 0; v < len; v++){
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
    const n = yArr.reduce((a, b) => a + b, 0);
    simulChart.data.labels = xArr;
    if (switcher){
        yArr.forEach((element, index) => {
            simulChart.data.datasets[0].data[index] = yArr[index]/n*100;
        });
        simulChart.options.scales.y = {
            ticks: {
                callback: function(value) {
                    return value + "%";
                }
            },
            max: Math.ceil(yArr.reduce((a,b) => a>b?a:b,0)/n*100),
            beginAtZero: true
        };
    } else {
        yArr.forEach((element, index) => {
            if (index==0) {
                simulChart.data.datasets[0].data[index] = yArr[index]/n*100;
            } else {
                simulChart.data.datasets[0].data[index] = yArr[index]/n*100 + simulChart.data.datasets[0].data[index-1];
            }
        });
        simulChart.options.scales.y = {
            ticks: {
                stepSize: 10,
                callback: function(value) {
                    return value + "%";
                }
            },
            max: 100,
            beginAtZero: true
        };
    }
    simulChart.options.scales.x.ticks = {
        autoSkip: true,
        callback: function(value, index, values) {
            if (value % 10 == 0){
                return value;
            }
        },
        maxRotation : 0
    };
    simulChart.update('none');
    document.getElementById("myProgress").style.display = "none";
    document.getElementById("runButton").innerHTML = "More samples";
    document.getElementById("sample").innerHTML = "&nbsp;&nbsp;&nbsp;Sample size: " + n.toLocaleString(undefined);
    wCount = 0;
}
function postToWorker(f){
    f.postMessage({
        wanted      : Number(document.getElementById("focus_count").value),
        sgUse       : document.getElementById("sg_use").checked,
        goal        : document.getElementById('goal').value,
        pityCount   : Number(document.getElementById("pity_count").value)+1,
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
    var pityMax = 89,
        focusMax = 7;

    if(document.getElementById('goal').value == 1 && document.getElementById('gcCheck').checked == true){
    vis = "block";
    v = 2;
    }
    if(document.getElementById('goal').value == 1){
        pityMax = 79;
        focusMax = "";
        vis2 = "none";
    }
    document.getElementById("tooltiptext").textContent = "0 - " + pityMax;
    document.getElementById("offbanner").checked = false;
    document.getElementById("const_input").style.display = vis2;
    document.getElementById("focus_count").max = focusMax;
    document.getElementById("pity_count").max = pityMax;
    document.getElementById("wpity").style.display = vis;
    document.getElementById("gcCounter").value = v;
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
    if (true) {
        simulChart.options.plugins.datalabels = {display: false};
        simulChart.update("none");
    }
}
function showLabel(){
    if (switcher==false) {
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
                return (e).toFixed(1) + " %\n" + t.dataIndex + " Pulls";
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
}
function switchTo(){
    const n = yArr.reduce((a, b) => a + b, 0);
    if(switcher){
        switcher = false;
        yArr.forEach((element, index) => {
            if (index==0) {
                simulChart.data.datasets[0].data[index] = yArr[index]/n*100;
            } else {
                simulChart.data.datasets[0].data[index] = yArr[index]/n*100 + simulChart.data.datasets[0].data[index-1];
            }
        });
        simulChart.options.scales.y = {
            ticks: {
                stepSize: 10,
                callback: function(value) {
                    return value + "%";
                }
            },
            max: 100,
            beginAtZero: true
        };
        simulChart.options.plugins.tooltip.callbacks = {
            label: function(context) {
                let label = "";
                label += (context.label) + " pulls";
                return label;
            },
            title: function(context) {
                let title = "";
                if (context[0].parsed.y == 0 || context[0].parsed.y >= 100){
                    title += (context[0].parsed.y).toFixed(0) + " %";
                }else if(context[0].parsed.y <= 99.8 && context[0].parsed.y >= 0.2){
                    title += (context[0].parsed.y).toFixed(1) + " %";
                } else if (context[0].parsed.y > 99.98 || context[0].parsed.y < 0.02) {
                    title += (context[0].parsed.y).toFixed(3) + " %";
                } else {
                    title += (context[0].parsed.y).toFixed(2) + " %";
                }
                return title;
            }
        };
        showLabel();
    } else {
        switcher = true;
        yArr.forEach((element, index) => {
            simulChart.data.datasets[0].data[index] = yArr[index]/n*100;
        });
        simulChart.options.scales.y = {
            ticks: {
                callback: function(value) {
                    return value + "%";
                }
            },
            max: Math.ceil(yArr[0]==null?1:(yArr.reduce((a,b) => a>b? a:b,0)/n*100)),
            beginAtZero: true
        };
        simulChart.options.plugins.tooltip.callbacks = {
            label: function(context) {
                let label = "";
                label += (context.label) + " pulls";
                return label;
            },
            title: function(context) {
                let title = "";
                if (context[0].parsed.y == 0){
                    title += (context[0].parsed.y).toFixed(0) + " %";
                } else if (context[0].parsed.y >= 0.2){
                    title += (context[0].parsed.y).toFixed(2) + " %";
                } else if (context[0].parsed.y < 0.02) {
                    title += (context[0].parsed.y).toFixed(3) + " %";
                } else {
                    title += (context[0].parsed.y).toFixed(2) + " %";
                }
                return title;
            }
        };
        hideLabel();
    }
}