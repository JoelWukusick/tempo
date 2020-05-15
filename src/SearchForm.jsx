import React from 'react';
import { Container, Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

export default function SearchForm() {
  const classes = useStyles();

  return (
    <Container spacing={3}>
      <Grid className={classes.grid} container spacing={3} >
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
      <TextField noValidate autoComplete="off" fullWidth color='primary' id='search' label={`search`} variant="filled" />
    </Container >
  )
}