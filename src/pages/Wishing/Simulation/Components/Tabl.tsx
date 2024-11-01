import React, { useMemo } from 'react';
import { Card, styled, Typography } from '@mui/material';
import { useStore } from '../../Store';
import { pdfToCdf, roundSigfig } from '../../utils';

const StyledCard = styled(Card)(() => ({
  padding: 8,
  paddingLeft: 16,
  borderRadius: "6px",
}));

export default function Tabl() {
  const [y] = useStore(store => store.plotdataSim.y);
  const [char] = useStore(store => store.char.enabled);
  const [weap] = useStore(store => store.weap.enabled);

  const displayTrace: number[] = useMemo(() => {
    const l = +char * 7 + +weap * 5;
    var samplesize = y.reduce((p, c) => p + c, 0);
    var _y = [...y].map(e => e / samplesize * 100);
    _y.shift();
    _y = pdfToCdf(_y.reverse()).reverse();
    return (_y.length == l ? _y : new Array(l).fill(0));
  }, [y]);

  const str = useMemo(() => {
    return { prefix: (weap && "R" || char && "C"), offset: (+weap * 1 + +char * 0) }
  }, [y]);

  return (
    <Card elevation={2} sx={{ p: 2, mx: 'auto', mb: 2, position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
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
