import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import DataContext from './DataContext.jsx';


export default function TabBar() {
  const data = useContext(DataContext);
  console.log(data.page)
  return (
    <AppBar position="static" >
      <Tabs value={data.page} variant={'fullWidth'}>
        <Tab label='search' icon={<SearchIcon />} onClick={() => data.setPage('/')} value={'/'} component={Link} to={'/'} />
        <Tab label='controls' icon={<TuneIcon />} onClick={() => data.setPage('/controls')} value={'/controls'} component={Link} to={'/controls'} />
        <Tab label='playlist' icon={<QueueMusicIcon />} onClick={() => data.setPage('/playlist')} value={'/playlist'} component={Link} to={'/playlist'} />
      </Tabs>
    </AppBar>
  );
}