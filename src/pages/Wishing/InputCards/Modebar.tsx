import React, { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea, Dialog, DialogContent, DialogTitle, Grid, IconButton, Link, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import { Close } from '@mui/icons-material';
import { MathComponent } from "mathjax-react";

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[700],
  '&:hover': {
    backgroundColor: red[900],
  },
}));

export default function Modebar({ approach }: { approach: string }) {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen]);
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  return (
    <Card sx={{ backgroundImage: 'none', backgroundColor: "#307ac3aa", color: '#fff' }}>
      <CardActionArea onClick={handleOpen} sx={{ p: 1 }}>
        <Typography variant='body1' sx={{ display: 'inline' }}>
          This method uses {approach == "calculation" && "probability theory" || "a Monte-Carlo simulation"}  to model the pull distribution.
        </Typography>
      </CardActionArea>
      {approach == 'calculation' &&
        <Dialog open={open} onClose={handleClose} sx={{ lineHeight: 1.8 }} >
          <DialogTitle sx={{ bgcolor: '#242734', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'underline', pl: { sm: '4rem' } }}>
            How it works
            <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto' }}>
              <Close />
            </CloseButton>
          </DialogTitle>
          <DialogContent sx={{ bgcolor: '#242734', px: { sm: '4rem' } }}>
            The basis of the work can be found in <Link href="https://drive.google.com/file/d/1EECcjNVpfiOTqRoS48hHWqH2Ake902vq/view" target="_blank">this document</Link>.
            <br /><br />
            To expand on it, for the weapon banner, if you start with a guarantee for the next featured weapon,
            the generating function to get one desired featured weapon changes to
            <Mathmode text='\widetilde{r}(x) = \widetilde{a}_1 x^1 + \widetilde{a}_2 x^2 + \widetilde{a}_3 x^3,' />
            where the coefficients now read  <MathComponent display={false} tex={String.raw`\widetilde{a}_1 = \frac{1}{2}`} />, as there is a 50% chance to get the desired weapon on the first 5
            star, <MathComponent display={false} tex={String.raw` \widetilde{a}_2 = \frac{1}{2}\cdot\frac{3}{4}\cdot\frac{1}{2}`} />, as there 50% to get the wrong featured weapon and a 37.5% to then get the right one,
            and <MathComponent display={false} tex={String.raw`\widetilde{a}_3 = 1-(\widetilde{a}_1 + \widetilde{a}_2)`} />, as the epitomized path guarantees it. <br />
            Therefore the generating function to get refinement <MathComponent display={false} tex={String.raw`i`} /> is
            <Mathmode text='\widetilde{r}(x) \cdot \left( r(x) \right)^{i-1} = \sum_{k=1}^{3i} c_k x^k .' />
            <Typography component='div' variant='h5' sx={{ textDecoration: 'underline', textAlign: 'center', mb: 1 }}>
              Combined Banners
            </Typography>
            The distribution to pull on both banners to get C<MathComponent display={false} tex={String.raw`_i`} /> and R<MathComponent display={false} tex={String.raw`_i`} /> is the convolution of the two:
            <Mathmode text='\text{C}_i \cdot \text{R}_i = \sum_{k=i+1}^{2i+2-g} \frac{{i+1-g \choose k-(i+1)}}{2^{i+1-g}} P_k(x) \cdot \sum_{j=1}^{3i} c_j P_j(x) .' />
          </DialogContent>
        </Dialog>}
      {approach == 'simulation' &&
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle sx={{ bgcolor: '#242734', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'underline' }}>
            Basic flowchart
            <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto' }}>
              <Close />
            </CloseButton>
          </DialogTitle>
          <DialogContent sx={{ bgcolor: '#242734', pl: 5 }}>
            A simplified flowchart, which shows the steps the simulation makes to model the 5 star drop distribution.
            <Grid container spacing={2} sx={{ mt: 3 }} >
              <Grid item xs={12} sm={6} display='flex' justifyContent='center' flexDirection='column' textAlign='center' gap={2}>
                Distribution to get specific constellation
                <img src="flowchart.png" alt="distribution-flowchart" style={{ margin: 'auto' }} />
              </Grid>
              <Grid item xs={12} sm={6} display='flex' justifyContent='center' flexDirection='column' textAlign='center' gap={2}>
                Constellation distribution for X wishes
                <img src="flowchart2.png" alt="constellation-flowchart" style={{ margin: 'auto' }} />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      }
    </Card>
  )
}

function Mathmode({ text }: { text: string }) {
  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <MathComponent
        tex={String.raw`${text}`}
      />
    </div>
  );
}