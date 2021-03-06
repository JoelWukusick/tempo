import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Grid, Container, Fab, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    textAlign: 'center',
  },
  brightButton: {
    width: '100%',
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  grid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}))

function Login() {
  const { setUsername } = useContext(DataContext);
  const classes = useStyles();
  return (
    <Container>
      <Box py={'20vh'} px={4}>
        <Grid className={classes.grid} container justify='center' spacing={3}  >
          <Grid item xs={12} sm={8} md={4} lg={3}>
            <Fab className={classes.brightButton} color='secondary' href='/login' variant='extended'>Log in with Spotify</Fab>
          </Grid>
          <Grid item xs={12} sm={8} md={4} lg={3}>
            <Fab className={classes.button} color='primary' onClick={() => { setUsername('demo') }} variant='extended' >Continue without save option</Fab>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;