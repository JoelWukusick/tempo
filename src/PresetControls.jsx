import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Link } from 'react-router-dom';
import { Box, Container, Card, CardContent, CardActionArea, Typography, Grid } from '@material-ui/core';
import presets from './presets.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '14px'
  },
  description: {
    fontSize: '12px',
    color: theme.palette.text.secondary
  }
}));


export default function PresetControls({ setOption }) {
  const { seed, setSeed, setControlScreen } = useContext(DataContext);
  const classes = useStyles();

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
                  <CardActionArea component={Link} to={'/controls/custom'} onClick={(e) => { handleSelectPreset(preset) }}>
                    <CardContent>
                      <Typography className={classes.title} variant="h6" align='center'>
                        {preset.name}
                      </Typography>
                      <Typography className={classes.description} align='center'>
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
