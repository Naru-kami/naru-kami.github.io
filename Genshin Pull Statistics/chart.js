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
                        if(context[0].parsed.y <= 99.8 && context[0].parsed.y >= 0.2){
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