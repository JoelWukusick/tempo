import React, { useState } from 'react';
import BottomNav from './BottomNav.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Container, Fab, Grid, Button, Box } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import CustomControls from './CustomControls.jsx';
import PresetControls from './PresetControls.jsx';


export default function Controls() {
  const [option, setOption] = useState('custom');

  return (
    <BrowserRouter>
      <Container>
        <Box m={1} />
        <ToggleButtonGroup
          size='small'
          value={option}
          exclusive
          aria-label="search type">
          <ToggleButton onClick={() => { setOption('custom') }} value='custom' component={Link} to={'/controls'} aria-label="centered">
            custom
            </ToggleButton>
          <ToggleButton onClick={() => { setOption('presets') }} value='presets' component={Link} to={'/controls/preset'} aria-label="right aligned">
            preset
            </ToggleButton>
        </ToggleButtonGroup>
        <Box m={1} />
      </Container>

      {/* <Container>
        <Box m={1} />
        <Grid container spacing={2} >
          <Grid item >
            <Button size='small' onClick={() => setOption('custom')} component={Link} to={'/controls'}>custom</Button>
          </Grid>
          <Grid item >
            <Button size='small' onClick={() => setOption('preset')} component={Link} to={'/controls/preset'}>presets</Button>
          </Grid>
        </Grid>
        <Box m={1} />
      </Container> */}

      <Route exact path='/controls' component={CustomControls} />
      <Route path='/controls/preset' component={PresetControls} />
      <BottomNav>
        <Fab color='primary' variant='extended' size='small'>get playlist</Fab>
      </BottomNav>
    </BrowserRouter >
  )

}
