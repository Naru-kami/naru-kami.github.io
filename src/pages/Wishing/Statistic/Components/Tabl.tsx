import React, { useMemo } from 'react';
import { Card, styled, Typography } from '@mui/material';
import { useStore } from '../../Store';
import { roundSigfig } from '../../utils';

const StyledCard = styled(Card)(() => ({
  padding: 8,
  paddingLeft: 16,
  borderRadius: "6px",
}));

export default function Tabl() {
  const [y] = useStore(store => store.plotdataCalc.y);
  const [char] = useStore(store => store.char.enabled);
  const [weap] = useStore(store => store.weap.enabled);

  const displayTrace: number[] = useMemo(() => {
    const l = +char * 7 + +weap * 5;
    return (y.length == l ? y : new Array(l).fill(0));
  }, [y, char, weap]);

  const str = useMemo(() => {
    return { prefix: (weap && "R" || char && "C"), offset: (+weap * 1 + +char * 0) }
  }, [y, char, weap]);

  return (
    <Card elevation={2} sx={{ p: 2, mx: 'auto', mb: 2, position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
        {displayTrace.map((e, i) => {
          return <PercentCard key={i} id={`${str.prefix}` + (i + str.offset)} result={e} />
        })}
      </div>
    </Card>
  )
}

function PercentCard({ id, result }: { id: string, result: number }) {
  return (
    <StyledCard elevation={4}>
      <Typography variant='subtitle1' fontWeight={800}>
        {id}
      </Typography>
      <Typography variant='subtitle1' fontWeight={500}>
        {roundSigfig(result)}%
      </Typography>
    </StyledCard>
  );
}
