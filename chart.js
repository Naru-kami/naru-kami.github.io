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
            backgroundColor: "rgba(104,104,104,0.25)"
        }]
    },
    plugins: [ChartDataLabels],
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
                        if (context[0].parsed.y == 0 || context[0].parsed.y >= 99.9999999999999){
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
                },
                titleFont: { weight: "normal" }
            },
            datalabels: {
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
            }
        },
        scales:{
            y: {
                ticks: {
                    stepSize: 10,
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
            mode: 'nearest',
            axis: 'x'
        },
        elements:{
            point:{
                radius: 0,
                hoverRadius: 4,
            }
        }
    }
});