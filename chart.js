let myChart = document.getElementById("myChart").getContext("2d");

let simulChart = new Chart(myChart, {
    type:"line",
    data:{
        labels:[0,23,54,120,233,351,1049],
        datasets:[{
            label: "",
            data: [0,10,25,50,75,90,99.9],
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
                        console.log(context);
                        let label = "";
                        label += (context.label) + " pulls";
                        return label;
                    },
                    title: function(context) {
                        console.log(context);
                        let title = "";
                        title += (context[0].parsed.y).toFixed(1) + " %";
                        return title;
                    }
                },
                titleFont: { weight: "normal" },
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
        }
    }
});