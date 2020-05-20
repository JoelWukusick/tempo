import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Slider, Box, Container, Typography, Paper } from '@material-ui/core';


export default function CustomControls() {
  const data = useContext(DataContext);
  const controls = [{
    label: 'Tempo',
    name: 'tempo',
    range: [60, 180],
    marks: [60, 80, 100, 120, 140, 160, 180],
    step: 1,
    scale: 1
  },
  {
    label: 'Danceability',
    name: 'danceability',
    range: [0, 1],
    marks: [0, 1],
    step: .01,
    scale: 10
  },
  {
    label: 'Energy',
    name: 'energy',
    range: [0, 1],
    marks: [0, 1],
    step: .01,
    scale: 10
  },
  {
    label: 'Valence',
    name: 'valence',
    range: [0, 1],
    marks: [0, 1],
    step: .01,
    scale: 10
  }];

  return (
    <Paper >
      <Container>
        <Box pt={4} px={1}>
          {controls.map(control => {
            return (
              <>
                <Typography id={control.name}>
                  {control.label}
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
                    data.setSeed(Object.assign({}, data.seed))
                  }}
                  valueLabelDisplay={"auto"}
                  valueLabelFormat={value => {
                    if (control.range[1] < 100) {
                      return (value * control.scale).toFixed(1);
                    } else {
                      return value
                    }
                  }}
                />
              </>
            )
          })}
        </Box>
      </Container>
    </Paper>
  )
}
