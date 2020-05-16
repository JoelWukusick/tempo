import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

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

        <Tab label='search' icon={<SearchIcon />} onClick={() => setPage('/search')} value={'/search'} component={Link} to={'/'} />
        <Tab label='controls' icon={<TuneIcon />} onClick={() => setPage('/controls')} value={'/controls'} component={Link} to={'/controls'} />
        <Tab label='playlists' icon={<QueueMusicIcon />} onClick={() => setPage('/playlists')} value={'/playlists'} component={Link} to={'/playlists'} />
      </Tabs>
    </AppBar>
  );
}