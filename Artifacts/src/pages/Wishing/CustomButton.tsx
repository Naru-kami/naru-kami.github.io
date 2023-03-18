import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const RunButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[900],
    },
  }));

export default function CustomButton({state, click}: {state: Boolean, click: () => void}) {
  return (
    <RunButton variant="contained" onClick={click} sx={{mt: 3, pl:'6px', ml:1}}>
        <span style={{fontVariant: 'small-caps', height: '24px'}}><strong>&nbsp;
            { !state && "Run"} {  state && "More Samples"}
        </strong></span>
    </RunButton>
  )
}
