import React from 'react';
import { Container, Grid, Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function SearchForm() {

  return (
    <Container >
      <Box m={1} />
      <Grid container spacing={2} >
        <Grid item >
          <Button size='small'>artist</Button>
        </Grid>
        <Grid item >
          <Button size='small'>genre</Button>
        </Grid>
        <Grid item >
          <Button size='small'>track</Button>
        </Grid>
      </Grid>
      <Box m={1} />
      <TextField noValidate autoComplete="off" fullWidth color='primary' id='search' label={`search`} variant="filled" />
    </Container >
  )
}