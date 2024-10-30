import { useCallback, useState } from 'react';
import { CardActionArea, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Link, styled, useMediaQuery, Typography, Card } from '@mui/material';
import { red } from '@mui/material/colors';
import { Close, ErrorOutline } from '@mui/icons-material';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[700],
  '&:hover': {
    backgroundColor: red[900],
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textDecoration: 'underline',
  position: 'sticky',
  top: '0px',
  zIndex: '1',
  paddingLeft: '1.5rem',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: '3rem',
  },
  transition: 'padding .25s cubic-bezier(0.4, 0, 0.2, 1)',
}))

export default function Modebar({ approach }: { approach: string }) {
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen]);
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  return (
    <Card elevation={2} sx={{ backgroundColor: "#307ac3bb" }}>
      <CardActionArea onClick={handleOpen} sx={{ p: 1 }}>
        <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
          <ErrorOutline sx={{ fontSize: 'inherit', mr: 0.5 }} /> Updated for 5.1. This approach uses {approach == "calculation" && "probability theory" || "a Monte-Carlo simulation"}.
        </Typography>
      </CardActionArea>
      {approach == 'calculation' &&
        <Dialog open={open} onClose={handleClose} maxWidth="md" >
          <StyledDialogTitle>
            How it works
            <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto' }}>
              <Close />
            </CloseButton>
          </StyledDialogTitle>
          <DialogContent sx={{ px: { sm: '3rem' }, overflowY: 'visible', transition: 'padding .25s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <Link href="https://drive.google.com/file/d/1EECcjNVpfiOTqRoS48hHWqH2Ake902vq/view" target="_blank">This document</Link> contains the basis for this work.
            <br />Since the 5.0 update, Hoyo has introduced few changes to the wishing system.
            <br /><br />
            <Typography component='div' variant='h5' sx={{ textDecoration: 'underline', textAlign: 'center', mb: 1 }}>
              Character Banner
            </Typography>
            Hoyo promises an increased chance of getting the promoted 5 star character.
            However, it is not a simple increase in odds from a 50:50 to a 55:45. Hoyo loves complicated pity systems.
            The current leading theory is explained in detail in <Link href="https://www.reddit.com/r/Genshin_Impact/comments/1f3ykny/capturing_radiance_details_observations_and/" target="_blank">this Reddit post</Link>, and backed by observations.
            In short, it is believed that for every lost 50:50, the chances to trigger Capturing Radiance increases by <InlineMath math="\left[0\%, 5\%, 50\%, 100\% \right]" />, meaning you should not lose more than 3 "50:50" in a row.
            <br /><br />
            To incorporate Capturing Radiance, we need to properly adjust the weighting for each 5 star pull.
            The weighting cannot be done by a convolution anymore, and since each 5 star pull is not independent anymore, we also cannot use the binomial formula.
            We need to build the entire binary tree and calculate the probability for each branch, where the odds for a win and lose change.
            The generating function to get constellation <InlineMath math='i' /> of the promoted character is
            <BlockMath math='\sum_{k=i+1}^{2i+2} p^{2i+2-k}_{k-i-1} \cdot x^k' />
            <InlineMath math='p^{w}_{l}' /> denotes the probabiliy of winning <InlineMath math='w' />-times and losing <InlineMath math='l' />-times.
            This includes every possible permutation of wins and loses, where the probability for each sequence is added together.
            <br /><br />
            <Typography component='div' variant='h5' sx={{ textDecoration: 'underline', textAlign: 'center', mb: 1 }}>
              Weapon Banner
            </Typography>
            The weapon banner now has its Epitomized Path reduced from 2 to 1.
            Taking into consideration that we can start with a guarantee to get a featured 5 star weapon, the generating function to get refinement R<InlineMath math='i' /> changes to
            <BlockMath math='\widetilde{r}(x) = \widetilde{a}_1 x + \widetilde{a}_2 x^2,' />
            where the coefficients now read <InlineMath math='\widetilde{a}_1 = \frac{3}{4}\cdot\frac{1}{2} + g\cdot\frac{1}{4}\cdot\frac{1}{2}' />, as the guarantee raises the probability of getting the desired weapon on the first try to 50%,
            and <InlineMath math='\widetilde{a}_2 = 1 - \widetilde{a}_1' />, as the epitomized path guarantees the desired 5 star weapon. <br />
            Therefore, the generating function to get refinement R<InlineMath math='i' /> is
            <BlockMath math='\widetilde{r}(x) \cdot \left( r(x) \right)^{i-1} = \sum_{k=1}^{2i} c_k x^k' /> <br />
            <Typography component='div' variant='h5' sx={{ textDecoration: 'underline', textAlign: 'center', mb: 1 }}>
              Combined Banners
            </Typography>
            The distribution to pull on both banners to get C<InlineMath math='i' /> and R<InlineMath math='j' /> is the convolution of the two:
            <div style={{ display: 'grid', overflow: 'auto' }}>
              <BlockMath math='\text{C}_i \cdot \text{R}_j = \sum_{k=i+1}^{2i+2-g} p^{2i+2-k}_{k-i-1} P_k(x) \cdot \sum_{k=1}^{2j} c_k P_k(x)' />
            </div>
          </DialogContent>
        </Dialog>}
      {approach == 'simulation' &&
        <Dialog open={open} onClose={handleClose} maxWidth="md" >
          <StyledDialogTitle>
            Basic flowchart
            <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto' }}>
              <Close />
            </CloseButton>
          </StyledDialogTitle>
          <DialogContent sx={{ px: { sm: '3rem' }, overflowY: 'visible' }}>
            The basis for this simulation is explained in detail in <Link href="https://www.hoyolab.com/article/497840" target="_blank">this Hoyolab Article</Link>.
            It goes over all the base rates, and the basics of the pity system for all banners and provides some pseudo code for the simulation.
            <br /> <br />
            A simplified flowchart, which shows each step of the simulation to model the 5 star drop distribution.
            <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'space-between', border: '1px solid #FFFFFF33' }} >
              <Grid item xs={12} sm={5.5} textAlign='center' sx={{ display: 'flex', flexDirection: 'column', pb: 2 }}>
                <div>Distribution for constellation C<InlineMath math='i' /></div>
                <img src="flowchart.png" alt="distribution-flowchart" style={{ margin: '1rem auto auto' }} />
              </Grid>
              {matches ? <Divider orientation="vertical" flexItem sx={{ pl: 4 }} /> : <Divider orientation="horizontal" flexItem sx={{ flex: '1 1 1px' }} />}
              <Grid item xs={12} sm={5.5} textAlign='center' sx={{ display: 'flex', flexDirection: 'column', pb: 2 }}>
                <div>Distribution for doing <InlineMath math='x' /> wishes</div>
                <img src="flowchart2.png" alt="constellation-flowchart" style={{ margin: '1rem auto auto' }} />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      }
    </Card>
  )
}
