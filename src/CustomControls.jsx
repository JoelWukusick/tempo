import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Slider, Box, Container, Typography, Paper } from '@material-ui/core';


export default function CustomControls() {
  const data = useContext(DataContext);

  return (
    <Paper >
      <Container>
        <Box py={4}>
          <Typography id="range-slider" >
            Tempo
            </Typography>
          <Slider
            value={[data.seed.min_tempo, data.seed.max_tempo]}
            min={60}
            max={180}
            onChange={(e, value) => { console.log(value) }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={() => { }}
          />
          <Typography id="range-slider" >
            Danceability
            </Typography>
          <Slider
            value={[10, 20]}
            onChange={() => { }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={() => { }}
          />
          <Typography id="range-slider" >
            Energy
            </Typography>
          <Slider
            value={[10, 20]}
            onChange={() => { }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={() => { }}
          />
          <Typography id="range-slider" >
            Cheerfulness
            </Typography>
          <Slider
            value={[10, 20]}
            onChange={() => { }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={() => { }}
          />
        </Box>
      </Container>
    </Paper>
  )
}
