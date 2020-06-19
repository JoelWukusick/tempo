import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import Login from './Login.jsx';
import Search from './Search.jsx';
import Controls from './Controls.jsx';
import Playlist from './Playlist.jsx';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Drawer, Tabs, Tab, AppBar, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import theme from './theme.jsx';
import BottomNav from './BottomNav.jsx';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: 'calc(50vh - 132px)',
    maxHeight: '112px'
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '100px'
    },
  },
  spacer: {
    height: 'calc(50vh - 152px)',
    maxHeight: '80px',
    minHeight: '16px',
    [theme.breakpoints.down('xs')]: {
      maxHeight: '16px'
    },
  },
  navBar: {
    backgroundColor: theme.palette.background.paper,
    height: '100vh'
  },
  verticalTab: {
    width: '82px',
    minWidth: '82px',
    height: '94px',
  },
}));

export default function Main() {
  const { username, page, setPage, setControlScreen } = useContext(DataContext);
  const classes = useStyles();
  const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    username ?
      <BrowserRouter>
        {largeScreen ?
          <Drawer
            variant="permanent"
            anchor="left"
          ><div className={classes.navBar}>
              <div className={classes.toolbar} />
              <Tabs value={page} orientation='vertical'>
                <Tab className={classes.verticalTab} label='search' icon={<SearchIcon fontSize='large' />} onClick={() => setPage('/')} value={'/'} component={Link} to={'/'} />
                <Tab className={classes.verticalTab} label='controls' icon={<TuneIcon fontSize='large' />} onClick={() => { setControlScreen('presets'); setPage('/controls'); }} value={'/controls'} component={Link} to={'/controls'} />
                <Tab className={classes.verticalTab} label='playlist' icon={<QueueMusicIcon fontSize='large' />} onClick={() => setPage('/playlist')} value={'/playlist'} component={Link} to={'/playlist'} />
              </Tabs>
            </div>
          </Drawer> :
          <AppBar position="static" color='inherit'>
            <Tabs value={page} variant={'fullWidth'}>
              <Tab label='search' icon={<SearchIcon />} onClick={() => setPage('/')} value={'/'} component={Link} to={'/'} />
              <Tab label='controls' icon={<TuneIcon />} onClick={() => { setControlScreen('presets'); setPage('/controls'); }} value={'/controls'} component={Link} to={'/controls'} />
              <Tab label='playlist' icon={<QueueMusicIcon />} onClick={() => setPage('/playlist')} value={'/playlist'} component={Link} to={'/playlist'} />
            </Tabs>
          </AppBar >
        }
        <div className={classes.content}>
          <div className={classes.spacer} />
          <Route path='/' exact component={Search} />
          <Route path='/controls' component={Controls} />
          <Route path='/playlist' component={Playlist} />
        </div>
        <BottomNav />
      </BrowserRouter>
      :
      <Login />
  )
}