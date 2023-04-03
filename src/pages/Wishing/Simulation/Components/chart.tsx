import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import { useStore, WishingStore } from '../../Store';
import { pdfToCdf, roundSigfig } from '../../utils';

const config = {
  responsive: true,
  displaylogo: false,
  showTips: false,
  toImageButtonOptions: {
    format: 'svg',
    filename: 'Pull statistics'
  }
} as Plotly.Config;

const traceconfig = {
  name: "",
  fillcolor: '#1772CB33',
  line: {
    color: '#1772CB',
  },
  marker: {
    size: 10,
  }
} as Plotly.Data;

function LinearProgressWithLabel() {
  const [progress] = useStore((store: WishingStore) => store.plotdataSim.progress);

  return (
    <Box sx={{ display: progress !== 100 ? 'flex' : 'none', alignItems: 'center', marginBottom: 1 }}>
      <Box sx={{ width: '100%', mr: 1, ml: 3.375 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35, mr: 2 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Chart() {
  const [x] = useStore(store => store.plotdataSim.x);
  const [y] = useStore(store => store.plotdataSim.y);
  const [cum] = useStore(store => store.plotdataSim.cumulative);
  const [char] = useStore(store => store.char.enabled);
  const [weap] = useStore(store => store.weap.enabled);
  const [mode] = useStore(store => store.mode);

  const trace = useMemo(() => {
    var samplesize = y.reduce((p, c) => p + c, 0);
    var _y = [...y].map(e => e / samplesize * 100);
    if (cum && mode == "distribution") {
      _y = pdfToCdf(_y);
    } else if (mode == "fixed") {
      _y.shift();
      _y = pdfToCdf(_y.reverse()).reverse();
    }
    const filler: string = mode == 'distribution' ? 'tozeroy' : 'none';
    const customdata = _y.map(e => roundSigfig(e, 4));
    const linemarker = mode == 'distribution' ? 'lines' : 'lines+markers';
    const hoverTemplate = mode == 'distribution' ? "<b> %{x:.0f} Pulls </b> <br> %{customdata}% <br>" : `<b> ${char ? 'C' : 'R'}%{x:.0f} </b> <br> %{customdata}% <br>`;
    return { x: x, y: _y, ...traceconfig, mode: linemarker, fill: filler, customdata: customdata, hovertemplate: hoverTemplate }
  }, [x, y, cum]) as Plotly.Data;

  const layout = useMemo(() => {
    const range = (weap ? [0.825, 5.125] : (char ? [-0.125, 6.125] : [0, 0]));
    const tickPrefix = (weap ? "R" : (char ? "C" : ""));
    const str = mode == 'fixed' ? {
      xaxis: { title: '', mirror: true, ticks: 'outside', showline: true, zeroline: false, color: "#FFF", tickprefix: tickPrefix, range: range, dtick: 1 },
      yaxis: { title: '', mirror: true, ticks: 'outside', showline: true, zeroline: false, color: "#FFF", ticksuffix: "%", range: [-1, 101], rangemode: 'normal' },
      margin: { l: 55, r: 35, b: 70, t: 35, pad: 4 },
      showlegend: false,
      hovermode: "x",
      dragmode: false,
      hoverlabel: { bgcolor: "#0C0F1E" },
      plot_bgcolor: "#0C0F1E",
      paper_bgcolor: "#0C0F1E"
    } : {
      xaxis: { title: 'Pulls', mirror: true, ticks: 'outside', showline: true, showgrid: true, zeroline: false, color: "#FFF" },
      yaxis: { title: '', mirror: true, ticks: 'outside', showline: true, showgrid: true, showticksuffix: 'all', ticksuffix: "%", zeroline: false, color: "#FFF", rangemode: 'nonnegative' },
      margin: { l: 55, r: 35, b: 70, t: 35, pad: 4 },
      showlegend: false,
      hovermode: "x",
      dragmode: false,
      hoverlabel: { bgcolor: "#0C0F1E" },
      plot_bgcolor: "#0C0F1E",
      paper_bgcolor: "#0C0F1E"
    };
    return str;
  }, [y]) as Plotly.Layout;

  return (
    <>
      <Paper variant='outlined' sx={{ background: 'transparent' }}>
        <div style={{ maxHeight: '620px', maxWidth: '100%', marginInline: 'auto', aspectRatio: 14 / 9 }}>
          <Plot
            data={[trace]}
            layout={layout}
            config={config}
            style={{ width: "100%", height: "100%" }}
          />
          <LinearProgressWithLabel />
        </div>
      </Paper>
    </>
  )
}