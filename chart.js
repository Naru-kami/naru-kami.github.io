let myChart = document.getElementById("myChart").getContext("2d");
let simulChart = new Chart(myChart, {
    type:"line",
    data:{
        labels: [0],
        datasets:[{
            label: "",
            data: [],
            fill : true,
            tension : 0.2,
            borderColor: "rgba(23,114,203,0.8)",
            fillColor: "rgba(151,205,187,1)"
        }]
    },
    options:{
        plugins:{
            title:{ display: false },
            legend:{ display: false },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        let label = "";
                        label += (context.label) + " pulls";
                        return label;
                    },
                    title: function(context) {
                        let title = "";
                        title += (context[0].parsed.y).toFixed(1) + " %";
                        return title;
                    }
                },
                titleFont: { weight: "normal" }
            }
        },
        scales:{
            y: {
                ticks: {
                    callback: function(value) {
                        return value + "%";
                    }
                },
                max: 100,
                beginAtZero: true
            },
            x: {
                title: {
                    display: true,
                    text: "Number of pulls"
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'x'
        },
        elements:{
            point:{
                radius: 0,
                hitRadius: 0.9,
                hoverRadius: 1,
                hoverBorderWidth: 4
            }
        }
    }
});

function draw(){
    simulChart.data.labels = [];
    simulChart.data.datasets[0].data = [];
    let datas = wishing(1000000);
    simulChart.data.labels = simulChart.data.labels.concat(datas.pullnumber);
    simulChart.data.datasets[0].data = simulChart.data.datasets[0].data.concat(datas.pullsResult);
    simulChart.options.scales.x.ticks = {
        autoSkip: true,
        callback: function(value, index, values) {
            let newticks = Math.ceil(Math.max.apply(null, datas.pullnumber)/50/5)*5;
            if (value % newticks == 0){
                return value;
            }
        },
        maxRotation : 0
    };
    simulChart.update('none');
}