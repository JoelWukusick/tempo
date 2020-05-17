import React, { useContext} from 'react';
import DataContext from './DataContext.jsx';

import Login from './Login.jsx';
import TabBar from './TabBar.jsx';
import Search from './Search.jsx';
import Controls from './Controls.jsx';
import Playlist from './Playlist.jsx';
import { BrowserRouter, Route } from "react-router-dom";


function Main() {
  const data = useContext(DataContext);

  return (
    data.username ?
        <BrowserRouter>
          <TabBar />
          <Route path='/' exact component={Search} />
          <Route path='/controls' component={Controls} />
          <Route path='/playlist' component={Playlist} />
        </BrowserRouter>
      :
      <Login />
  )
}

export default Main;