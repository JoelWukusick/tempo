import React from 'react';
import { Slider, Box, Container, Typography, Paper } from '@material-ui/core';


export default function CustomControls() {
  return (
    <Paper >
      <Container>
        <Box py={4}>
          <Typography id="range-slider" >
            Tempo
            </Typography>
          <Slider
            value={[10, 20]}
            onChange={() => { }}
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
