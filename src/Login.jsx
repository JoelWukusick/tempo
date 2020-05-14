import React, { useContext } from 'react';
import UserContext from './UserContext.jsx';
import { Grid, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {

  },
  grid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}))

function Login() {
  const [user, setUser] = useContext(UserContext);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid className={classes.grid} container spacing={8}>
        <Grid item>
          <Button href='/login'>Log in with Spotify</Button>
        </Grid>
        <Grid item>
          <Button onClick={() => { setUser({ username: 'demo', access_token: null, refresh_token: null }) }}>Use without save option</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;