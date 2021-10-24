var blob = new Blob([
    document.querySelector('#worker').textContent
], { type: "text/javascript" });

var worker;

function draw(){
    simulChart.data.labels = [];
    simulChart.data.datasets[0].data = [];
    document.getElementById("myBar").style.width = 0 + "%";
    document.getElementById("myProgress").style.display = "block";
    if (worker){worker.terminate();}
    worker = new Worker (window.URL.createObjectURL(blob));
    worker.postMessage({
        wanted  :   Number(document.getElementById("focus_count").value),   // wanted
        sgUse  :   document.getElementById("sg_use").checked,               // use starglitter?
        goal    :   document.getElementById('goal').value,                  // character or weapon banner
        pityCount: Number(document.getElementById("pity_count").value),     // counter for 5 star pity
        sgCount :  Number(document.getElementById("sg_count").value),       // starglitter count
        offbanner : document.getElementById("offbanner").checked,           // weapon banner offbanner 75%
        c5s :       Number(document.getElementById("5s_c").value),          // constellation count 5 and 4 star
        c4s1 :      Number(document.getElementById("4s1").value),           
        c4s2 :      Number(document.getElementById("4s2").value),           
        c4s3 :      Number(document.getElementById("4s3").value),           
        gcCheck :  document.getElementById("gcCheck").checked,              // guaranteed pity checkbox
        gcCounter: Number(document.getElementById("gcCounter").value),      // guaranteed pity for weapon banner
        n :         100000                                                  // iterations
    });
    
    worker.onmessage = function (e){
        document.getElementById("myProgress").style.display = "block";
        if ( e.data.progress != null){
            document.getElementById("myBar").style.width = e.data.progress/1000 + "%";
            document.getElementById("myBarText").innerHTML = e.data.progress/1000 + "%";
            return;
        }
        simulChart.data.labels = simulChart.data.labels.concat(e.data.pullnumber);
        simulChart.data.datasets[0].data = simulChart.data.datasets[0].data.concat(e.data.pullsResult);
        simulChart.options.scales.x.ticks = {
            autoSkip: true,
            callback: function(value, index, values) {
                let newticks = Math.ceil(Math.max.apply(null, e.data.pullnumber)/50/5+1)*5;
                if (value % newticks == 0){
                    return value;
                }
            },
            maxRotation : 0
        };
        simulChart.update('none');
        document.getElementById("myProgress").style.display = "none";
    }
}

function showMe (box) {
    var chbox = document.getElementById("sg_use");
    var vis = "none";
    if(chbox.checked == true){
    vis = "block";
    }
    document.getElementById(box).style.display = vis;
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