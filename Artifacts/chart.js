MYCHART =  document.getElementById("myChart");

var trace = { x: [], y: [], name:"", mode: 'line', line: { color: '#1772CB', size: 2}, hovertemplate: "<b> %{y:.2f}% <br>" + " %{x:.0f} Days <br>" };
var data = [trace];
var layout = {
    xaxis: { title: 'Days', mirror: true, ticks: 'outside', showline: true, zeroline: false },
    yaxis: { title: '', range: [0,102], mirror: true, autotick: false, ticks: 'outside', tick0: 0, dtick: 10, showline: true, showticksuffix: 'all', ticksuffix: "%", zeroline: false },
    showlegend: true,
    margin:{ l: 55, r: 25, b: 50, t: 36, pad: 4 },
    showlegend: false,
    hovermode: "x",
    hoverlabel: { bgcolor: "#F8F9FA" },
    plot_bgcolor: "#F8F9FA",
    paper_bgcolor: "#F8F9FA"
};
Plotly.newPlot(MYCHART, data, layout, {responsive: true, displaylogo: false});

function datalabels(){
    const data = trace.y; var close = [], goal = [10, 25, 50, 75, 90];
    for (let i=0; i<5; i++) {
        close [i] = data.reduce(function(prev, curr) {
            return (Math.abs(curr - goal[i]) < Math.abs(prev - goal[i]) ? curr : prev);
        });
        goal[i] = trace.x[data.indexOf(close[i])];
    }
    layout.annotations = [
        {
            x: goal[0],
            y: close[0],
            xref: 'x',
            yref: 'y',
            text: close[0].toFixed(2)+'%<br>'+goal[0]+' Days',
            showarrow: true,
            arrowhead: 0,
            xanchor: 'left', 
            ax: 10,
            ay: 0,
            bordercolor: "rgb(0,0,0,0)",
            borderwidth: 1
        },
        {
            x: goal[1],
            y: close[1],
            xref: 'x',
            yref: 'y',
            text: close[1].toFixed(2)+'%<br>'+goal[1]+' Days',
            showarrow: true,
            arrowhead: 0,
            xanchor: 'left', 
            ax: 15,
            ay: 0,
            bordercolor: "rgb(0,0,0,0)",
            borderwidth: 1
        },
        {
            x: goal[2],
            y: close[2],
            xref: 'x',
            yref: 'y',
            text: close[2].toFixed(2)+'%<br>'+goal[2]+' Days',
            showarrow: true,
            arrowhead: 0,
            xanchor: 'right', 
            ax: -17,
            ay: 0,
            bordercolor: "rgb(0,0,0,0)",
            borderwidth: 1
        },
        {
            x: goal[3],
            y: close[3],
            xref: 'x',
            yref: 'y',
            text: close[3].toFixed(2)+'%<br>'+goal[3]+' Days',
            showarrow: true,
            arrowhead: 0,
            xanchor: 'right', 
            ax: -30,
            ay: 0,
            bordercolor: "rgb(0,0,0,0)",
            borderwidth: 1
        },
        {
            x: goal[4],
            y: close[4],
            xref: 'x',
            yref: 'y',
            text: close[4].toFixed(2)+'%<br>'+goal[4]+' Days',
            showarrow: true,
            arrowhead: 0,
            xanchor: 'right', 
            ax: -60,
            ay: 0,
            bordercolor: "rgb(0,0,0,0)",
            borderwidth: 1
        }
    ]
}