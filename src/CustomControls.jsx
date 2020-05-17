import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Slider, Box, Container, Typography, Paper } from '@material-ui/core';


export default function CustomControls() {
  const data = useContext(DataContext);
  const controls = [{
    name: 'tempo',
    range: [60, 180],
    marks: [60, 80, 100, 120, 140, 160, 180],
    step: 1,
    scale: 1
  },
  {
    name: 'danceability',
    range: [0, 1],
    marks: [0, 1],
    step: .01,
    scale: 10
  },
  {
    name: 'energy',
    range: [0, 1],
    marks: [0, 1],
    step: .01,
    scale: 10
  },
  {
    name: 'valence',
    range: [0, 1],
    marks: [0, 1],
    step: .01,
    scale: 10
  }];

  return (
    <Paper >
      <Container>
        <Box py={4}>
          {/* <Typography id="range-slider" >
            Tempo
            </Typography>
          <Slider
            value={[data.seed.min_tempo, data.seed.max_tempo]}
            min={60}
            max={180}
            marks={[{ value: 60, label: 80 }, { value: 180, label: 180 }]}
            step={1}
            onChange={(e, value) => { console.log(value) }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={() => { }}
          /> */}

          {controls.map(control => {
            return (
              <>
                <Typography id={control.name}>
                  {control.name}
                </Typography>
                <Slider
                  id={control.name}
                  value={[data.seed[`min_${control.name}`], data.seed[`max_${control.name}`]]}
                  min={control.range[0]}
                  max={control.range[1]}
                  marks={control.marks.map(mark => ({ value: mark, label: mark * control.scale }))}
                  step={control.step}
                  onChange={(e, value) => {
                    data.seed[`min_${control.name}`] = value[0];
                    data.seed[`max_${control.name}`] = value[1];
                    data.setSeed(Object.create(data.seed))
                  }}
                  onChangeCommitted={() => { }}
                  valueLabelDisplay={"auto"}
                  aria-label={control.name}
                  aria-labelledby={control.name}
                  valueLabelFormat={value => (value * control.scale).toFixed(1)}
                />
              </>
            )
          })}




          {/* <Typography id="range-slider" >
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
          /> */}
        </Box>
      </Container>
    </Paper>
  )
}
