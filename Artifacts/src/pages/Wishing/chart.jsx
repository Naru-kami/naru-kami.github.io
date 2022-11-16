import React from 'react';
import Plot from 'react-plotly.js';
import { Card } from '@mui/material';
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const SwitchButton = styled(Button)(({ theme }) => ({
    width: 1,
    height: 50,
    ml: 'auto',
    color: theme.palette.getContrastText(blue[700]),
    backgroundColor: blue[700],
    '&:hover': {
      backgroundColor: blue[900],
    },
  }));

export default function Chart({ plotdata }) {
  const [trace, setTrace] = React.useState(() => ({ x: plotdata.x, y: plotdata.y, name: "", mode: 'line', line: { color: '#1772CB', size: 2 }, hovertemplate: "<b> %{y:.2f}% <br> %{x:.0f} Days <br>" }));
  const layout = {
    xaxis: { title: 'Days', mirror: true, ticks: 'outside', showline: true, showgrid: true, zeroline: false, color: "#FFF" },
    yaxis: { title: '', range: [0, 102], mirror: true, autotick: false, ticks: 'outside', tick0: 0, dtick: 10, showline: true, showgrid: true, showticksuffix: 'all', ticksuffix: "%", zeroline: false, color: "#FFF" },
    margin: { l: 55, r: 35, b: 65, t: 27, pad: 4 },
    showlegend: false,
    hovermode: "x",
    hoverlabel: { bgcolor: "#0C0F1E" },
    plot_bgcolor: "#0C0F1E",
    paper_bgcolor: "#0C0F1E"
  };
  const config = { responsive: true, displaylogo: false, showTips: false };

  React.useEffect(() => {
    setTrace(prev => ({ ...prev, x: plotdata.x, y: plotdata.y }));
  }, [plotdata.x, plotdata.y]);

  return (
    <>
    <Card variant='outlined' sx={{ height: 476 }}>
      <Plot data={[trace]} layout={layout} config={config} style={{ width: "100%", height: "100%" }} />
    </Card>
    <SwitchButton>
        <SyncAltIcon />
    </SwitchButton>
    </>
  )
}