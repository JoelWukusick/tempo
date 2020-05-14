import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  tabBar: {
  },
}));

export default function TabBar() {
  const classes = useStyles();
  const [page, setPage] = useState('/search');

  return (
    <AppBar position="static" className={classes.tabBar}>
      <Tabs value={page} variant={'fullWidth'}>
        <Tab label='Search' onClick={() => setPage('/search')} value={'/search'} component={Link} to={'/search'} />
        <Tab label='controls' onClick={() => setPage('/controls')} value={'/controls'} component={Link} to={'/controls'} />
        <Tab label='playlists' onClick={() => setPage('/playlists')} value={'/playlists'} component={Link} to={'/playlists'} />
      </Tabs>
    </AppBar>
  );
}