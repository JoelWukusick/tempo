import React, { useContext, setState } from 'react';
import UserContext from './UserContext.jsx';
import Login from './Login.jsx';
import TabBar from './TabBar.jsx';
import Search from './Search.jsx';
import Controls from './Controls.jsx';
import Playlists from './Playlists.jsx';
import { BrowserRouter, Route } from "react-router-dom";

function Main() {
  const user = useContext(UserContext);
  return (
    user[0].username ?
      <BrowserRouter>
        <TabBar />
        <Route path='/' exact component={Search} />
        <Route path='/search' component={Search} />
        <Route path='/controls' component={Controls} />
        <Route path='/playlists' component={Playlists} />
      </BrowserRouter> :
      <Login />
  )

}

export default Main;