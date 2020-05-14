import React, { useContext } from 'react';
import UserContext from './UserContext.jsx';
import Login from './Login.jsx';

function Main() {
  const user = useContext(UserContext);
  return (
    user[0].username ? <div>main</div> : <Login />
  )

}

export default Main;