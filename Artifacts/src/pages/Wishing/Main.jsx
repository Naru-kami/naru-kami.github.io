import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Banner from './Banner'
import Goal from './Goal'
import Pity from './Pity';
import Guarantee from './Guarantee';
import Starglitter from './Starglitter';
import CustomButton from './CustomButton';
import Chart from './chart';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Main() {
  const [populeted, setpopulated] = React.useState(false)
  const pop = () => setpopulated(true);

  const [plotdata, setPlotdata] = React.useState({x:[], y:[]});
  function passPlotdata(val) {setPlotdata(p => ({...p, x: val.x, y: val.y})); }

  return (
    <ThemeProvider theme={darkTheme}>
      <Banner />
      <Goal />
      <Pity />
      <Guarantee />
      <Starglitter />
      <CustomButton state={populeted} click={pop} />
      <Chart plotdata={plotdata}/>
    </ThemeProvider>
  )
}
