import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { Card } from '@mui/material';
import { useStore } from '../../Store';
import { pdfToCdf, roundSigfig } from '../../utils';
import { userPrimogemSwitcher } from '../../InputCards/CurrencySwitcher';

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
  fillcolor: '#3472D540',
  line: {
    color: '#3472D5',
  },
  marker: {
    size: 10,
  }
} as Plotly.Data;

export default function Chart() {
  const [x] = useStore(store => store.plotdataCalc.x);
  const [y] = useStore(store => store.plotdataCalc.y);
  const [cum] = useStore(store => store.plotdataCalc.cumulative);
  const [char] = useStore(store => store.char.enabled);
  const [weap] = useStore(store => store.weap.enabled);
  const [mode] = useStore(store => store.mode);
  const [usePrimogem] = userPrimogemSwitcher();

  const trace = useMemo(() => {
    var _y = [...y];
    if (cum && mode == "distribution") {
      _y = pdfToCdf(_y);
    }
    const filler = mode == 'distribution' ? 'tozeroy' : 'none';
    const customdata = _y.map(e => roundSigfig(e, 4));
    const linemarker = mode == 'distribution' ? 'lines' : 'lines+markers';
    const hoverTemplate = mode == 'distribution' ? `<b> %{x:,.0f} ${usePrimogem ? 'Primos' : 'Wishes'} </b> <br> %{customdata}% <br>` : `<b> ${char ? 'C' : 'R'}%{x:,.0f} </b> <br> %{customdata}% <br>`;
    return { x: usePrimogem && mode == "distribution" ? x.map(e => e * 160) : x, y: _y, ...traceconfig, mode: linemarker, fill: filler, customdata: customdata, hovertemplate: hoverTemplate }
  }, [x, y, cum, usePrimogem]) as Plotly.Data;

  const layout = useMemo(() => {
    const range = (weap ? [0.825, 5.125] : (char ? [-0.125, 6.125] : [0, 0]));
    const tickPrefix = (weap ? "R" : (char ? "C" : ""));
    const str = mode == 'fixed' ? {
      xaxis: { title: '', mirror: true, ticks: 'outside', showline: true, zeroline: false, color: "#FFF", tickprefix: tickPrefix, range: range, dtick: 1 },
      yaxis: { title: '', mirror: true, ticks: 'outside', showline: true, zeroline: false, color: "#FFF", ticksuffix: "%", range: [-1, 101], rangemode: 'normal' },
      margin: { l: 55, r: 35, b: 70, t: 35, pad: 4 },
      showlegend: false,
      hovermode: "x",
      dragmode: matchMedia("(pointer: fine)").matches && "zoom",
      hoverlabel: { bgcolor: "#181c2d" },
      plot_bgcolor: "#181c2d",
      paper_bgcolor: "#181c2d"
    } : {
      xaxis: { title: usePrimogem && mode == "distribution" ? 'Primogems' : 'Wishes', mirror: true, ticks: 'outside', showline: true, showgrid: true, zeroline: false, color: "#FFF" },
      yaxis: { title: '', mirror: true, ticks: 'outside', showline: true, showgrid: true, showticksuffix: 'all', ticksuffix: "%", zeroline: false, color: "#FFF", rangemode: 'nonnegative' },
      margin: { l: 55, r: 35, b: 70, t: 35, pad: 4 },
      showlegend: false,
      hovermode: "x",
      dragmode: matchMedia("(pointer: fine)").matches && "zoom",
      hoverlabel: { bgcolor: "#181c2d" },
      plot_bgcolor: "#181c2d",
      paper_bgcolor: "#181c2d"
    };
    return str;
  }, [y, usePrimogem]) as Plotly.Layout;

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