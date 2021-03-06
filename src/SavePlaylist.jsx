import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Fab, Button, TextField, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';
import axios from 'axios';

export default function SavePlaylist() {
  const { playlist, username, access_token, refresh_token, setAccess_token, setRefresh_token } = useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const [playlistName, setPlaylistName] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function postPlaylist(token) {
    let headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${username}/playlists`,
      headers,
      data: { name: playlistName },
      json: true
    })
      .then((res) => {
        let uris = playlist.map(track => `spotify:track:${track.id}`)
        axios({
          method: 'post',
          url: `https://api.spotify.com/v1/users/${username}/playlists/${res.data.id}/tracks`,
          headers,
          data: { uris },
          json: true
        })
      })
      .then(res => {
        alert(`'${playlistName}' saved to your spotify account!`)
      })
  }

  function handleSave(e) {
    e.preventDefault();
    setOpen(false);
    postPlaylist(access_token)
      .catch((err) => {
        if (err.response.status === 401) {
          axios({
            method: 'post',
            url: '/api/refresh_token',
            data: { refresh_token },
            json: true
          })
            .then(res => {
              setAccess_token(res.data.access_token);
              sessionStorage.setItem('access_token', res.data.access_token);
              postPlaylist(res.data.access_token)
                .catch(err => alert(`Unable to save playlist: ${err}`));
            })
        } else {
          alert(`Unable to save playlist: ${err}`);
        }
      });
  }

  return (
    <>
      <Fab onClick={handleClickOpen} variant='extended' color='secondary' disabled={playlist.length === 0 || username === 'demo'}>save playlist</Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Save Playlist</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              Save playlist as a public playlist on your Spotify account.
          </DialogContentText>
            <TextField
              value={playlistName}
              color='primary'
              onChange={e => setPlaylistName(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Playlist Name"
              type="text"
              fullWidth
              variant='filled'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='inherit' >
              Cancel
          </Button>
            <Button onClick={handleSave} color='inherit' type='submit'>
              Save
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
