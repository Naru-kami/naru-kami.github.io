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
Plotly.newPlot(MYCHART, data, layout, {responsive: true});