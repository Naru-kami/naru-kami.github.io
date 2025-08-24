import { useMemo } from 'react';
import { Card } from '@mui/material';
import Plot from 'react-plotly.js';
import { readStore, useStore } from '../Data/Store';

const config = {
  responsive: true,
  displaylogo: false,
  showTips: false,
  toImageButtonOptions: {
    format: 'svg',
    filename: 'Artifact statistics'
  }
} satisfies Partial<Plotly.Config>;

type Plotdata = {
  x: number[],
  y: number[],
};

export default function Chart() {
  const [plotdata] = useStore(store => store.plotdata);
  const [unit] = useStore(store => store.unit);
  const [resinPerDay] = useStore(store => store.supplementary[3]);
  const source = readStore(store => store.supplementary[2]);

  const dropSource = useMemo(() => source, [plotdata]);

  const traceconfig = useMemo(() => ({
    name: "",
    mode: 'line',
    fill: 'tozeroy',
    fillcolor: '#3472D540',
    line: {
      color: '#3472D5',
      size: 2
    },
    hovertemplate: "<b> %{y:.2f}% <br> %{x:.0f} " + ["Days", "Resin", "Artifacts"][unit] + " <br>"
  }), [unit]);

  const layout = useMemo<Partial<Plotly.Layout>>(() => ({
    xaxis: { title: ["Days", "Resin", "Artifacts"][unit], mirror: true, ticks: 'outside', showline: true, showgrid: true, zeroline: false, color: "#FFF" },
    yaxis: { title: '', range: [0, 102], mirror: true, autotick: false, ticks: 'outside', tick0: 0, dtick: 10, showline: true, showgrid: true, showticksuffix: 'all', ticksuffix: "%", zeroline: false, color: "#FFF", rangemode: 'nonnegative' },
    margin: { l: 55, r: 35, b: 70, t: 35, pad: 4 },
    showlegend: false,
    hovermode: "x",
    dragmode: false,
    hoverlabel: { bgcolor: "#181c2d" },
    plot_bgcolor: "#181c2d",
    paper_bgcolor: "#181c2d"
  }), [unit]);

  const trace = useMemo(() => {
    const resinCost = [20, 20, 40, 60, 0, 0][dropSource];
    const mult = [resinCost / resinPerDay, resinCost, 1][unit];
    return {
      x: plotdata.x.map(e => e * mult),
      y: plotdata.y,
      ...traceconfig
    }
  }, [plotdata, unit, resinPerDay]);

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
