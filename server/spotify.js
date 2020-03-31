const { tokenAsync } = require('../spotify/clientAuth.js');
var rp = require('request-promise-native');


const getToken = (() => {
  let token;
  return async () => {
    token = token || tokenAsync();
    return token;
  }
})();

const constructQueryParam = (key, values) => {
  let string = `${key}=`;
  for (var i = 0; i < values.length && i < 20; i++) {
    string += values[i]
    if (i < values.length - 1 && i < 19 ) {
      string += '%2C'
    }
  }
  console.log(string)
  return string;
}

module.exports = {
  findArtist: async (q, limit) => {
    return getToken()
      .then((token) => {
        let options = {
          method: 'get',
          url: `https://api.spotify.com/v1/search?q=${q}&type=artist${limit ? '&limit=' + limit : ''}`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        return rp(options);
      })
      .catch((err) => {
        // console.log(err);
        return [];
      });
  },
  getTopTracks: async (artistId, limit) => {
    return getToken()
      .then((token) => {
        let options = {
          method: 'get',
          url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=ES${limit ? '&limit=' + limit : ''}`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        return rp(options);
      })
      .catch((err) => {
        // console.log(err);
        return [];
      });
  },
  getAlbums: async (artistId, limit) => {
    return getToken()
      .then((token) => {
        let options = {
          method: 'get',
          url: `https://api.spotify.com/v1/artists/${artistId}/albums?country=ES${limit ? '&limit=' + limit : ''}`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        return rp(options);
      })
      .catch((err) => {
        // console.log(err);
        return [];
      })
  },
  getTracks: async (albumIds) => {
    return getToken()
      .then((token) => {
        let paramString = constructQueryParam('ids', albumIds);
        let options = {
          method: 'get',
          url: `https://api.spotify.com/v1/albums?${paramString}`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        console.log(options)
        return rp(options);
      })
      .catch((err) => {
        console.log(err);
        return [];
      })
  }
}