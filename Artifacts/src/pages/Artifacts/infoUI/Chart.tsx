import React, { useMemo } from 'react';
import { Paper } from '@mui/material';
import Plot from 'react-plotly.js';
import { ArtifactStore, useStore } from '../Data/Store';

const layout = {
  xaxis: { title: 'Days', mirror: true, ticks: 'outside', showline: true, showgrid: true, zeroline: false, color: "#FFF" },
  yaxis: { title: '', range: [0, 102], mirror: true, autotick: false, ticks: 'outside', tick0: 0, dtick: 10, showline: true, showgrid: true, showticksuffix: 'all', ticksuffix: "%", zeroline: false, color: "#FFF" },
  margin: { l: 55, r: 35, b: 70, t: 35, pad: 4 },
  showlegend: false,
  hovermode: "x",
  dragmode: false,
  hoverlabel: { bgcolor: "#0C0F1E" },
  plot_bgcolor: "#0C0F1E",
  paper_bgcolor: "#0C0F1E"
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
    <Paper variant='outlined' sx={{ background: 'transparent' }}>
      <div style={{ maxHeight: '600px', maxWidth: '100%', marginInline: 'auto', aspectRatio: 14 / 9 }}>
        <Plot
          data={[trace]}
          layout={layout}
          config={config}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </Paper>
  )
}
