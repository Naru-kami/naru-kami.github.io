import { useState, useCallback } from 'react'
import { Card, CardActionArea, IconButton, Typography, Dialog, DialogContent, DialogTitle, Link } from '@mui/material'
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[700],
  '&:hover': {
    backgroundColor: red[900],
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'inherit',
  textDecoration: 'underline',
  position: 'sticky',
  top: '0',
  zIndex: '1',
  paddingLeft: '1.5rem',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: '3rem',
  }
}))

export default function Info() {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen(o => !o);
  }, [setOpen]);

  return (
    <Card elevation={4} sx={{ height: '100%' }}>
      <CardActionArea onClick={toggleOpen} sx={{ height: '100%', p: 2 }}>
        <Typography variant='body1' sx={{ textAlign: 'center' }} >
          Enter the main and minor affixes, and the number of upgrade rolls of your desired artifact.
          If you wish to know the maths behind the calculation, <u>view this explanation</u>.
        </Typography>
      </CardActionArea>
      <Dialog open={open} onClose={toggleOpen} maxWidth="md">
        <StyledDialogTitle variant="h5">
          <CloseButton onClick={toggleOpen} sx={{ width: '30px', height: '30px', borderRadius: 1, float: "right", ml: 2 }}>
            <Close />
          </CloseButton>
          How it works
        </StyledDialogTitle>
        <DialogContent sx={{ px: { sm: '3rem' }, overflowY: 'visible' }}>
          The Genshin fandom wiki has the datamined numbers for infividual <Link href="https://genshin-impact.fandom.com/wiki/Artifact/Distribution">artifact affix distributions</Link> as
          well as their <Link href="https://genshin-impact.fandom.com/wiki/Loot_System/Artifact_Drop_Distribution">quality drop distributions</Link> from various sources.
          <br />
          <i>Note</i>: While the fandom wiki site about quality drop distribution cited user submitted data by the Data Gathering Discord community, the Discord community is citing the quality drop distribution site as a datamined source.
          This circular citing makes it unclear what the actual source for the data is.

          <Typography variant='h6' sx={{ textDecoration: 'underline', mb: 1 }}>Main affix configuration</Typography>
          Getting the probability of the main affix configuration is straight forward. It is the odds of getting the type of artifact multiplied by the odds of getting the specific main affix.
          <BlockMath math="P_{main} = P_{type} \cdot P_{main}" />

          <Typography variant="h6" sx={{ textDecoration: 'underline', mb: 1 }}>Minor affix configuration</Typography>
          This descibes the odds of getting the set of desired minor affixes.
          Once a certain minor affix is rolled, it is removed from the pool for the next minor affix roll.
          More formally, for 4 desired minor affixes with weights <InlineMath math="[w_a, w_b, w_c, w_d]" />
          <BlockMath math="\begin{equation}P_{sub}^{a,b,c,d} = \frac{w_a}{\sum_{i} w_i} \cdot \frac{w_b}{\sum_{i} w_i-w_a} \cdot \frac{w_c}{\sum_{i} w_i-w_a-w_b} \cdot \frac{w_d}{\sum_{i} w_i-w_a-w_b-w_c},\end{equation}" />
          where each minor affix carries a (possibly different) weight <InlineMath math="w_i" />.
          <br />
          However, this just gives the odds of rolling them in that particular order.
          Since we do not care about the order, we need to generate every possible <Link href="https://en.wikipedia.org/wiki/Heap's_algorithm">permutation</Link> of minor affixes, then calculate the probability for each permutation of the set <InlineMath math="[w_a, w_b, w_c, w_d]" /> using <InlineMath math="(1)" />.
          <BlockMath math="P_{sub} = \sum_{(i,j,k,l) \in Perm\{a,b,c,d\}} P_{sub}^{i,j,k,l}" />

          <Typography variant="h6" sx={{ textDecoration: 'underline', mb: 1 }}>Minor affix enhancements</Typography>
          Each upgrade is independent with equal probability, so the chance of upgrading <u>exactly</u> <InlineMath math="[a, b, c, d]" /> times respectively, can be obtained using the <Link href="https://en.wikipedia.org/wiki/Multinomial_distribution">multinomial distribution</Link>:
          <BlockMath math="\begin{equation}P_{upgrade}^{a,b,c,d} = \frac{n!}{a!\cdot b!\cdot c!\cdot d!} \,\, \left(\frac{1}{4}\right)^n \hspace{1.5em} \mathrm{with}\hspace{0.5em}n=a+b+c+d\end{equation}" />
          To get the probability of upgrading within a range in each minor affix, we can use <Link href="https://en.wikipedia.org/wiki/Composition_(combinatorics)">weak compositions</Link> to generate all allowed combination of upgrades, and use <InlineMath math="(2)" /> to sum up the probabilities.
          Since an artifact can either start with 3 or 4 initial minor affixes, with the chance <InlineMath math="s_{n}" /> depending on the drop source,
          <BlockMath math="P_{upgrade}\sum_{\substack{i+j+k+l = n\\ i,j,k,l \ge 0}}P_{upgrade}^{i,j,k,l} \cdot s_{n}" />

          <Typography variant="h6" sx={{ textDecoration: 'underline', mb: 1 }}>Final odds per drop</Typography>
          The probability of getting the desired artifact on each drop is then
          <BlockMath math="P = P_{main} \cdot P_{sub} \cdot P_{upgrade} \cdot P_{set}" />
          In general, the probability of getting the desired artifact at least once within <InlineMath math='x' /> attempts is just the complement of not getting it at all: <InlineMath math="1 - (1 - p)^{x}" />, where <InlineMath math="1-p" /> is the chance of failure.
          Depending on the source, there is a chance <InlineMath math="d" /> of getting 2 artifact drops per attempt.
          Then, the chance of failure includes 2 cases: either a single non-desired artifact, or two non-desired artifacts
          <BlockMath math="f = \left(1 - d\right)\left(1 - P\right) + d\left(1 - P\right)^2 = \left(1 - P\right)\left(1 - Pd\right)" />
          Thus the probability of getting the desired artifact at least once within <InlineMath math='x' /> attempts is then
          <BlockMath math="P\left(X \ge 1\right) = 1 - f^x" />
          Generally, the expectation value of the geometric series is <InlineMath math="{E(X)=\frac{1}{q}}" />, so the average number of attempts to get the desired artifact is
          <BlockMath math="E\left(X\right) = \frac{1}{1-f} = \frac{1}{P\left(1+d\left(1-P\right)\right)}" />

          <Typography variant="h6" sx={{ textDecoration: 'underline', mb: 1 }}>Stygian Onslaught</Typography>
          During the disturbance outbreak in the Stygian Onslaught event, one extra guaranteed artifact will drop every 6th drop.
          The extra artifacts also needs to be a failure:
          <BlockMath math="P\left(X \ge 1\right) = 1 - f^x \left(1 - P \right)^{\lfloor x / 6 \rfloor}" />
          The right part is the <Link href="https://en.wikipedia.org/wiki/Survival_function">survival function</Link> <InlineMath math="{F(x) = f^x \left(1 - P \right)^{\lfloor x / 6 \rfloor}}" />.
          The expectation value is <InlineMath math="{E(X) = \sum_{x=0}^{\infty} F(x)}" />.
          Using the substitution <InlineMath math="{x = 6m + r}" />, we can rewrite the expression as
          <BlockMath math="E(X) = \sum_{r=0}^{5} \sum_{m=0}^{\infty} f^{6m+r} \left(1 - p \right)^{m} = \sum_{r=0}^{5} f^r \sum_{m=0}^{\infty} \left(f^{6} \left(1 - p \right)\right)^{m}" />
          then use the formula for the geometric series to get the closed form for the expectation value
          <BlockMath math="E(X) = \sum_{r=0}^{5}f^r \cdot \frac{1}{1 - f^{6} \left(1 - p \right)} = \frac{1 - f^{6}}{\left(1 - f\right)\left(1 - f^{6} \left(1 - p \right)\right)}" />
          On a last remark, when <InlineMath math="S = \sum_{r=0}^{5} f^r" />, then <InlineMath math="S - Sf = 1 - f^6" />, thus <InlineMath math="S = \frac{1 - f^6}{1 - f}" />.
        </DialogContent>
      </Dialog>
    </Card>
  )
}

