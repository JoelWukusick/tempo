const express = require('express');
const app = express();
const port = 3000;
const client = require('../server/spotify.js');

app.use(express.static('dist'));

app.get('/search/artist', (req, res) => {
  client.findArtist(req.query.q, 10)
    .then(result => {
      res.send(result.artists.items)
    });
})

app.get('/artists/:artistId/top-tracks', (req, res) => {
  client.getTopTracks(req.params.artistId, 50)
    .then(result => {
      res.send(result.tracks)
    });
})

app.get('/artists/:artistId/albums', (req, res) => {
  client.getAlbums(req.params.artistId, 50)
    .then(result => {
      res.send(result.items)
    });
})

app.get('/artists/:artistId/tracks', (req, res) => {
  client.getAlbums(req.params.artistId, 50)
    .then(result => {
      albumIds = result.items.map(album => album.id);
      return client.getTracks(albumIds);
    })
    .then((results) => {
      return client.getTracksFeatures(results);
    })
    .then((tracks) => {
      res.send(tracks)
    })
})


app.listen(port, () => console.log(`Listening on port ${port}!`));