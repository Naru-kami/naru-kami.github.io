import React, { useCallback } from 'react'
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Button, Tooltip, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const ResetButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[800]),
  backgroundColor: purple[800],
  '&:hover': {
    backgroundColor: purple[900],
  },
  minWidth: '36px',
  height: '40px',
}));

export default function ResetStorage({ storageKey, executeFunction }: { storageKey?: string[], executeFunction?: () => void }) {

  const ResetStorage = useCallback(() => {
    storageKey?.forEach(key => {
      localStorage.removeItem(key);
    });
    executeFunction && executeFunction();
  }, [storageKey, executeFunction]);

  return (
    <Tooltip title={<Typography variant='body2'>Reset all values to its default</Typography>} arrow placement='top'>
      <ResetButton onClick={ResetStorage}>
        <ReplayIcon />
      </ResetButton>
    </Tooltip>
  )
}
