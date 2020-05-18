import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import queryString from 'query-string';
import Login from './Login.jsx';
import TabBar from './TabBar.jsx';
import Search from './Search.jsx';
import Controls from './Controls.jsx';
import Playlist from './Playlist.jsx';
import { BrowserRouter, Route } from "react-router-dom";


function Main() {
  const { setUsername, setAccess_token, setRefresh_token, username } = useContext(DataContext);
  const hashParams = queryString.parse(window.location.hash);
  window.location.hash = '';
  if (hashParams.id) {
    setUsername(hashParams.id);
    setAccess_token(hashParams.access_token);
    setRefresh_token(hashParams.refresh_token);
    sessionStorage.setItem('username', hashParams.id);
    sessionStorage.setItem('access_token', hashParams.access_token);
    sessionStorage.setItem('refresh_token', hashParams.refresh_token);
  }

  return (
    username ?
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