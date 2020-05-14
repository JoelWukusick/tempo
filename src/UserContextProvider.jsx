import React, {useState} from 'react';
import UserContext from './UserContext.jsx';
import Cookies from 'js-cookie';

function UserContextProvider(props) {
  const user = useState({
    username: Cookies.get('username'),
    access_token: Cookies.get('access_token'),
    refresh_token: Cookies.get('refresh_token')
  });

  return (
    <UserContext.Provider
      value={user}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;