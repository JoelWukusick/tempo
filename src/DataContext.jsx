import React, { useState } from 'react';
import Cookies from 'js-cookie';

const DataContext = React.createContext()

function DataContextProvider(props) {
  const [username, setUsername] = useState(Cookies.get('username'));
  const [access_token, setAccess_token] = useState(Cookies.get('access_token'));
  const [refresh_token, setRefresh_token] = useState(Cookies.get('refresh_token'));
  const [seed, setSeed] = useState({ artist: [], track: [], genre: [], min_tempo: 136, max_tempo: 142, min_danceability: .6, max_danceability: 1, min_energy: .2, max_energy: 1, min_valence: 0, max_valence: 1 })
  const [seedStack, setSeedStack] = useState([]);
  const [playlist, setPlaylist] = useState([{
    "name": "Testament",
    "id": "28hJdGN1Awf7u3ifk2lVkg",
    "images": [
      {
        "height": 640,
        "url": "https://i.scdn.co/image/4532a0586a8e9ad483f068208e84120db3d04f6d",
        "width": 640
      },
      {
        "height": 320,
        "url": "https://i.scdn.co/image/7230c4074104eac00202599be1a1be16d7a3ccdc",
        "width": 320
      },
      {
        "height": 160,
        "url": "https://i.scdn.co/image/053191e73733c0c9d081859fdab2d9171e2905c3",
        "width": 160
      }
    ],
    "type": "artist"
  }]);
  const [page, setPage] = useState('/');

  return (
    <DataContext.Provider
      value={{
        username, setUsername,
        access_token, setAccess_token,
        refresh_token, setRefresh_token,
        seed, setSeed,
        seedStack, setSeedStack,
        playlist, setPlaylist,
        page, setPage
      }}>
      {props.children}
    </DataContext.Provider>
  )
}

export const DataProvider = DataContextProvider
export const DataConsumer = DataContext.Consumer

export default DataContext