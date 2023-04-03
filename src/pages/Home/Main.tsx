import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const sx = {
  maxWidth: 500,
  minWidth: 250,
  borderRadius: 3,
  backgroundColor: 'rgb(18, 18, 18)'
}

export default function ActionAreaCard() {
  return (
    <Box sx={{
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
      gap: 5, p: 3, my: 2,
    }}>
      <Card elevation={24} sx={sx}>
        <CardActionArea component={RouterLink} to={'/Wishing'}>
          <CardMedia
            component="img"
            height="250"
            image="Wishing.png"
            alt="Wishing"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component={Box}>
              Wishing Chances
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Know your chances to wish on the character or weapon banner.
              Specify the number of wishes you plan to do, or the constellation or refinement you plan to get.
              It features a calculation mode for speed and accuracy and a simulation mode if you want to use Starglitter in the process.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card elevation={24} sx={sx}>
        <CardActionArea component={RouterLink} to={'/Artifacts'}>
          <CardMedia
            component="img"
            height="250"
            image="Artifacts.png"
            alt="Artifacts"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component={Box}>
              Artifact Chances
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Farming for a certain artifact?
              Specify the main- and substats and enter the range for the upgrade rolls you accept on the artifact.
              The amount of runs are converted to days.
              Expect to farm X amount of days to get a certain chance at your desired artifact.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}