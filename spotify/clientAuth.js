const rp = require('request-promise-native');
const { client_id, client_secret, redirect_uri } = require('./config.js');

const clientAuthOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var userAuthOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    redirect_uri: redirect_uri,
    grant_type: 'authorization_code'
  },
  json: true
};


module.exports = {
  tokenAsync: async () => {
    return rp.post(clientAuthOptions)
      .then(body => {
        return body.access_token;
      })
      .catch(err => {
        console.log(err);
        return;
      })
  },
  userAuthAsync: async (code) => {
    userAuthOptions.form.code = code;
    return rp.post(userAuthOptions)
      .then(body => {
        return body;
      })
      .catch(err => {
        console.log(err);
        return;
      })
  }
}
