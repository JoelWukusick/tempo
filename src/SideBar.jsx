import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import DataContext from './DataContext.jsx';


export default function TabBar({children}) {

  return (
    <AppBar position="static" >
      {children}
    </AppBar>
  );
}