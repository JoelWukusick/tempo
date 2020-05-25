const { tokenAsync, userAuthAsync } = require('../spotify/clientAuth.js');
const rp = require('request-promise-native');
const queryString = require('query-string');

const getToken = (() => {
  let token;
  return async (refresh) => {
    if (refresh) {
      token = tokenAsync();
      return token;
    }
    token = token || tokenAsync();
    return token;
  }
})();

const getAuth = (() => {
  let token;
  return async (code) => {
    token = userAuthAsync(code);
    return token;
  }
})();

const getSpotify = async (url) => {
  return getToken()
    .then((token) => {
      let options = {
        method: 'get',
        url,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      return rp(options);
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        return getToken(true)
          .then((token) => {
            let options = {
              method: 'get',
              url,
              headers: {
                'Authorization': 'Bearer ' + token
              },
              json: true
            };
            return rp(options);
          })
          .catch((err) => {
            console.log(err);
            return [];
          });
      }
      console.log(err);
      return [];
    });
}

module.exports = {
  getGenreSeeds: async () => {
    let url = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';
    return getSpotify(url);
  },
  getRecommendations: async (paramsObject) => {
    let paramsString = queryString.stringify(paramsObject);
    let url = `https://api.spotify.com/v1/recommendations?market=US&${paramsString}`;
    return getSpotify(url);
  },
  search: async (params) => {
    params.limit = 10;
    let paramsString = queryString.stringify(params);
    let url = `https://api.spotify.com/v1/search?${paramsString}`;
    return getSpotify(url);
  },
  getUser: async (access_token) => {
    let options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };
    return rp(options);
  },
  getUserAuth: async (code) => {
    return getAuth(code);
  },
  generateRandomString: (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

