import React from 'react';
import Plot from 'react-plotly.js';
import { Card } from '@mui/material'

const layout = {
  xaxis: { title: 'Days', mirror: true, ticks: 'outside', showline: true, showgrid: true, zeroline: false, color: "#FFF" },
  yaxis: { title: '', range: [0, 102], mirror: true, autotick: false, ticks: 'outside', tick0: 0, dtick: 10, showline: true, showgrid: true, showticksuffix: 'all', ticksuffix: "%", zeroline: false, color: "#FFF" },
  margin: { l: 55, r: 35, b: 70, t: 35, pad: 4 },
  showlegend: false,
  hovermode: "x",
  hoverlabel: { bgcolor: "#0C0F1E" },
  plot_bgcolor: "#0C0F1E",
  paper_bgcolor: "#0C0F1E"
};
const config = { responsive: true, displaylogo: false, showTips: false };

export default function Chart({ plotdata }) {
  const [trace, setTrace] = React.useState(() => ({ x: plotdata.x, y: plotdata.y, name: "", mode: 'line', line: { color: '#1772CB', size: 2 }, hovertemplate: "<b> %{y:.2f}% <br> %{x:.0f} Days <br>" }));

  React.useEffect(() => {
    setTrace(prev => ({ ...prev, x: plotdata.x, y: plotdata.y }));
  }, [plotdata.x, plotdata.y]);

  return (
    <Card variant='outlined' sx={{ height: 537 }}>
      <Plot data={[trace]} layout={layout} config={config} style={{ width: "100%", height: "100%" }} />
    </Card>
  )
}
