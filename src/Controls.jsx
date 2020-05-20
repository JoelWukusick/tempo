import React, { useState, useContext } from 'react';
import DataContext from './DataContext.jsx';
import BottomNav from './BottomNav.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Container, Fab, Grid, Button, Box } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import CustomControls from './CustomControls.jsx';
import PresetControls from './PresetControls.jsx';



export default function Controls() {
  const { controlScreen, setControlScreen } = useContext(DataContext);

  return (
    <>
      <BrowserRouter>
        <Container>
          <Box m={2} >
            <ToggleButtonGroup
              size='small'
              value={controlScreen}
              exclusive
              aria-label="search type">
              <ToggleButton onClick={() => { setControlScreen('custom') }} value='custom' component={Link} to={'/controls'} aria-label="centered">
                custom
            </ToggleButton>
              <ToggleButton onClick={() => { setControlScreen('presets') }} value='presets' component={Link} to={'/controls/preset'} aria-label="right aligned">
                preset
            </ToggleButton>
            </ToggleButtonGroup>
          </Box >
          <Box pb={10}>
            <Route exact path='/controls' component={CustomControls} />
            <Route path='/controls/preset' component={PresetControls} />
          </Box>
        </Container>
      </BrowserRouter >
      <BottomNav/>
    </>
  )

}
