import React, { useState } from 'react';
import Cookies from 'js-cookie';


const DataContext = React.createContext()

function DataContextProvider(props) {
  const [username, setUsername] = useState(Cookies.get('username'));
  const [access_token, setAccess_token] = useState(Cookies.get('access_token'));
  const [refresh_token, setRefresh_token] = useState(Cookies.get('refresh_token'));
  const [seed, setSeed] = useState({ artist: [], track: [], genre: [], min_tempo: 136, max_tempo: 142, min_danceability: .6, max_danceability: 1, min_energy: .2, max_energy: 1, min_valence: 0, max_valence: 1 })
  const [seedStack, setSeedStack] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  return (
    <DataContext.Provider
      value={{
        username,
        setUsername,
        access_token,
        setAccess_token,
        refresh_token,
        setRefresh_token,
        seed,
        setSeed,
        seedStack,
        setSeedStack,
        playlist, setPlaylist
      }}>
      {props.children}
    </DataContext.Provider>
  )
}

export const DataProvider = DataContextProvider
export const DataConsumer = DataContext.Consumer

export default DataContext