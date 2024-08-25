import { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Link, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import { Close, ErrorOutline } from '@mui/icons-material';
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
        <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
          <ErrorOutline sx={{ fontSize: 'inherit', mr: 0.5 }} /> Updated for 5.0. This approach uses {approach == "calculation" && "probability theory" || "a Monte-Carlo simulation"}.
        </Typography>
      </CardActionArea>
      {approach == 'calculation' &&
        <Dialog open={open} onClose={handleClose} maxWidth="md" >
          <DialogTitle sx={{ bgcolor: '#242734', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'underline', pl: { sm: '4rem' } }}>
            How it works
            <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto' }}>
              <Close />
            </CloseButton>
          </DialogTitle>
          <DialogContent sx={{ bgcolor: '#242734', px: { sm: '4rem' } }}>
            <Link href="https://drive.google.com/file/d/1EECcjNVpfiOTqRoS48hHWqH2Ake902vq/view" target="_blank">This document</Link> contains the basis for this work.
            Since the 5.0 update, a few things have changed.
            <br /><br />
            <Typography component='div' variant='h5' sx={{ textDecoration: 'underline', textAlign: 'center', mb: 1 }}>
              Character Banner
            </Typography>
            First, the character banner now has a 55/45 instead of a 50/50.
            This can be taken into account by modifying the binomial function. Now, getting constellation C<MathComponent tex='i' display={false} /> within <MathComponent tex='x' display={false} /> pulls is
            <Mathmode text='\sum_{k=i+1}^{2i+2-g} {i+1-g\choose k-(i+1)} \left( \frac{11}{20} \right)^{2i+2-g-k} \left( \frac{9}{20} \right)^{k-(i+1)} P_k(x)' /> <br />
            <Typography component='div' variant='h5' sx={{ textDecoration: 'underline', textAlign: 'center', mb: 1 }}>
              Weapon Banner
            </Typography>
            The weapon banner now has its Epitomized Path reduced from 2 to 1.
            Taking into consideration that we can start with a guarantee to get a featured 5 star weapon, the generating function to get refinement R<MathComponent tex='i' display={false} /> changes to
            <Mathmode text='\widetilde{r}(x) = \widetilde{a}_1 x + \widetilde{a}_2 x^2,' />
            where the coefficients now read <MathComponent display={false} tex='\widetilde{a}_1 = \frac{3}{4}\cdot\frac{1}{2} + g\cdot\frac{1}{4}\cdot\frac{1}{2}' />, as the guarantee raises the probability of getting the desired weapon on the first try to 50%,
            and <MathComponent display={false} tex='\widetilde{a}_2 = 1 - \widetilde{a}_1' />, as the epitomized path guarantees the desired 5 star weapon. <br />
            Therefore the generating function to get refinement R<MathComponent display={false} tex='i' /> is
            <Mathmode text='\widetilde{r}(x) \cdot \left( r(x) \right)^{i-1} = \sum_{k=1}^{2i} c_k x^k' /> <br />
            <Typography component='div' variant='h5' sx={{ textDecoration: 'underline', textAlign: 'center', mb: 1 }}>
              Combined Banners
            </Typography>
            The distribution to pull on both banners to get C<MathComponent display={false} tex='i' /> and R<MathComponent display={false} tex='j' /> is the convolution of the two:
            <Mathmode text='\text{C}_i \cdot \text{R}_j = \sum_{k=i+1}^{2i+2-g} {i+1-g \choose k-(i+1)} \left( \frac{11}{20} \right)^{2i+2-g-k} \left( \frac{9}{20} \right)^{k-(i+1)} P_k(x) \cdot \sum_{k=1}^{2j} c_k P_k(x)' />
          </DialogContent>
        </Dialog>}
      {approach == 'simulation' &&
        <Dialog open={open} onClose={handleClose} maxWidth="md" >
          <DialogTitle sx={{ bgcolor: '#242734', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'underline' }}>
            Basic flowchart
            <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto' }}>
              <Close />
            </CloseButton>
          </DialogTitle>
          <DialogContent sx={{ bgcolor: '#242734', pl: 5 }}>
            A simplified flowchart, which shows the steps the simulation makes to model the 5 star drop distribution.
            <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'space-between' }} >
              <Grid item xs={12} sm={5.5} textAlign='center'>
                Distribution to get constellation C<MathComponent tex='i' display={false} />
                <img src="flowchart.png" alt="distribution-flowchart" style={{ margin: '1rem auto auto' }} />
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ pl: 2 }} />
              <Grid item xs={12} sm={5.5} textAlign='center'>
                Distribution for doing X wishes
                <img src="flowchart2.png" alt="constellation-flowchart" style={{ margin: '1rem auto auto' }} />
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