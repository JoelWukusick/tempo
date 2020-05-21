import React, { useState } from 'react';
import queryString from 'query-string';

const DataContext = React.createContext()
const hashParams = queryString.parse(window.location.hash);

if (hashParams.id) {
  sessionStorage.setItem('username', hashParams.id);
  sessionStorage.setItem('access_token', hashParams.access_token);
  sessionStorage.setItem('refresh_token', hashParams.refresh_token);
  window.location.hash = '';
}

function DataContextProvider(props) {
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [access_token, setAccess_token] = useState(sessionStorage.getItem('access_token'));
  const [refresh_token, setRefresh_token] = useState(sessionStorage.getItem('refresh_token'));
  const [seed, setSeed] = useState({ artist: [], track: [], genre: [], min_tempo: 136, max_tempo: 142, min_danceability: .6, max_danceability: 1, min_energy: .2, max_energy: 1, min_valence: 0, max_valence: 1 })
  const [seedStack, setSeedStack] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [page, setPage] = useState('/');
  const [controlScreen, setControlScreen] = useState('custom');

  return (
    <DataContext.Provider
      value={{
        username, setUsername,
        access_token, setAccess_token,
        refresh_token, setRefresh_token,
        seed, setSeed,
        seedStack, setSeedStack,
        playlist, setPlaylist,
        page, setPage,
        controlScreen, setControlScreen
      }}>
      {props.children}
    </DataContext.Provider>
  )
}

export const DataProvider = DataContextProvider
export const DataConsumer = DataContext.Consumer

export default DataContext