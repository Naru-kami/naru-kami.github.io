import React, { useMemo } from 'react';
import { Card, Paper } from '@mui/material';
import Plot from 'react-plotly.js';
import { ArtifactStore, useStore } from '../Data/Store';

const layout = {
  xaxis: { title: 'Days', mirror: true, ticks: 'outside', showline: true, showgrid: true, zeroline: false, color: "#FFF" },
  yaxis: { title: '', range: [0, 102], mirror: true, autotick: false, ticks: 'outside', tick0: 0, dtick: 10, showline: true, showgrid: true, showticksuffix: 'all', ticksuffix: "%", zeroline: false, color: "#FFF", rangemode: 'nonnegative' },
  margin: { l: 55, r: 35, b: 70, t: 35, pad: 4 },
  showlegend: false,
  hovermode: "x",
  dragmode: false,
  hoverlabel: { bgcolor: "#181c2d" },
  plot_bgcolor: "#181c2d",
  paper_bgcolor: "#181c2d"
} as Plotly.Layout;

const config = {
  responsive: true,
  displaylogo: false,
  showTips: false,
  toImageButtonOptions: {
    format: 'svg',
    filename: 'Artifact statistics'
  }
} as Plotly.Config;

const traceconfig = {
  name: "",
  mode: 'line',
  fill: 'tozeroy',
  fillcolor: '#1772CB33',
  line: {
    color: '#1772CB',
    size: 2
  },
  hovertemplate: "<b> %{y:.2f}% <br> %{x:.0f} Days <br>"
}

type Plotdata = {
  x: number[],
  y: number[],
} & typeof traceconfig;

export default function Chart() {
  const [plotx] = useStore((store: ArtifactStore) => store.plotdata.x);
  const [ploty] = useStore((store: ArtifactStore) => store.plotdata.y);
  const trace = useMemo<Plotdata>(() => ({ x: plotx, y: ploty, ...traceconfig }), [plotx, ploty]);

  return (
    <Card elevation={2} style={{ maxHeight: '620px', maxWidth: '100%', marginInline: 'auto', aspectRatio: 16 / 9 }}>
      <Plot
        data={[trace]}
        layout={layout}
        config={config}
        style={{ width: "100%", height: "100%" }}
      />
    </Card>
  )
}
