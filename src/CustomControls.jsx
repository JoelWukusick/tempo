import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Slider, Box, Container, Typography, Tooltip, useMediaQuery } from '@material-ui/core';
import TooltipMobile from './TooltipMobile.jsx';
import theme from './theme.jsx';

export default function CustomControls() {
  const data = useContext(DataContext);
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const controls = [{
    label: 'Tempo',
    name: 'tempo',
    range: [60, 180],
    marks: [60, 80, 100, 120, 140, 160, 180],
    step: 1,
    scale: 1,
    description: 'The pace of a track in beats per minute (BPM)'
  },
  {
    label: 'Danceability',
    name: 'danceability',
    range: [0, 1],
    marks: [0, 1],
    step: .01,
    scale: 10,
    description: 'How suitable a track is for dancing, rhythmic stability, beat strength, and overall regularity'
  },
  {
    label: 'Energy',
    name: 'energy',
    range: [0, 1],
    marks: [0, 1],
    step: .01,
    scale: 10,
    description: 'Intensity, activity, dynamic range, and perceived loudness'
  },
  {
    label: 'Valence',
    name: 'valence',
    range: [0, 1],
    marks: [0, 1],
    step: .01,
    scale: 10,
    description: 'Musical positivity, happiness, cheerfulness, euphoria'
  }];

  return (
    <Container>
      <Box py={4} px={1}>
        {controls.map(control => {
          return (
            <>
              <Tooltip title={control.description} placement='top-start' arrow>
                <Typography id={control.name} display='inline'>
                  {`${control.label} `}
                  {mobile ? <TooltipMobile title={control.description}>
                  </TooltipMobile> : null}
                </Typography>
              </Tooltip>
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
  )
}
