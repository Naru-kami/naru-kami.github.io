document.addEventListener('DOMContentLoaded', Action);
function Action(){
    var stat = document.getElementById("stat"),
        type = document.getElementById("type"),
        main = document.getElementById('main');

    main.addEventListener("change", hidesubs);
    type.addEventListener("change", artitype);
    type.addEventListener("change", hidesubs);
    stat.addEventListener("click", showstats);
}

function showstats(){
    var vis = document.getElementById("showchance").style.display;
    if(vis == 'none'){
        document.getElementById("showchance").style.display = 'block';
        document.getElementById("stat").innerHTML = "▲";
    } else {
        document.getElementById("showchance").style.display = 'none';
        document.getElementById("stat").innerHTML = "▼";
    }
}

function artitype(){
    for(let i = 0; i<12; i++)
        document.getElementById('main').getElementsByTagName('option')[i].hidden = true;
    switch(Number(document.getElementById('type').value)){
        case 0:
            document.getElementById('main').getElementsByTagName('option')[0].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[0].selected = 'selected';
            break;
        case 1:
            document.getElementById('main').getElementsByTagName('option')[1].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[1].selected = 'selected';
            break;
        case 2:
            document.getElementById('main').getElementsByTagName('option')[3].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[4].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[5].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[6].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[7].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[4].selected = 'selected';
            break;
        case 3: 
            document.getElementById('main').getElementsByTagName('option')[3].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[4].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[5].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[7].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[11].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[11].selected = 'selected';
            break;
        case 4: 
            document.getElementById('main').getElementsByTagName('option')[3].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[4].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[5].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[7].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[8].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[9].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[10].hidden = false;
            document.getElementById('main').getElementsByTagName('option')[8].selected = 'selected';
            break;
    }
}

function hidesubs(){
    for(let i = 1; i<=10; i++){
        document.getElementById('sub1').getElementsByTagName('option')[i].hidden = false;
        document.getElementById('sub2').getElementsByTagName('option')[i].hidden = false;
        document.getElementById('sub3').getElementsByTagName('option')[i].hidden = false;
        document.getElementById('sub4').getElementsByTagName('option')[i].hidden = false;
    }
    const ki = Number(document.getElementById('main').value)+1;
    if(ki-1 < 10 && ki-1 >=0){
        document.getElementById('sub1').getElementsByTagName('option')[ki].hidden = true;
        document.getElementById('sub2').getElementsByTagName('option')[ki].hidden = true;
        document.getElementById('sub3').getElementsByTagName('option')[ki].hidden = true;
        document.getElementById('sub4').getElementsByTagName('option')[ki].hidden = true;
    }
    if(Number(document.getElementById('sub1').value) == ki-1){
        document.getElementById('sub1').getElementsByTagName('option')[0].selected = 'selected';
    }
    if(Number(document.getElementById('sub2').value) == ki-1){
        document.getElementById('sub2').getElementsByTagName('option')[0].selected = 'selected';
    }
    if(Number(document.getElementById('sub3').value) == ki-1){
        document.getElementById('sub3').getElementsByTagName('option')[0].selected = 'selected';
    }
    if(Number(document.getElementById('sub4').value) == ki-1){
        document.getElementById('sub4').getElementsByTagName('option')[0].selected = 'selected';
    }
}