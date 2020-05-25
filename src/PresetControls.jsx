import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Link } from 'react-router-dom';
import { Box, Container,  Card, CardContent, CardActionArea, Typography, Grid } from '@material-ui/core';
import presets from './presets.js';


export default function PresetControls({setOption}) {
  const { seed, setSeed, setControlScreen } = useContext(DataContext);

  function handleSelectPreset(preset) {
    setSeed(Object.assign(seed, preset.settings));
    setControlScreen('custom');
  }

  return (
      <Container >
        <Box pt={4} pb='16vh'>
          <Grid container spacing={3} justify='center'>
            {presets.map(preset => {
              return (
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card variant="outlined" >
                    <CardActionArea component={Link} to={'/controls'} onClick={(e) => { handleSelectPreset(preset) }}>
                      <CardContent>
                        <Typography variant="h6" component="h2" align='center'>
                          {preset.name}
                        </Typography>
                        <Typography color="textSecondary" align='center'>
                          {`${preset.settings.min_tempo}-${preset.settings.max_tempo} bpm`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            })
            }
          </Grid>
        </Box>
      </Container>
  )
}
