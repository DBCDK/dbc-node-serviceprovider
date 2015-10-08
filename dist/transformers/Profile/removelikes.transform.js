'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var RemoveLikesTransform = {
  event: function event() {
    return 'resetLikes';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars
    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };

    var params = {
      accessToken: passport.user.id,
      uid: passport.user.uid
    };

    return this.callServiceClient('profile', 'resetLikes', params);
  },

  responseTransform: function responseTransform(response) {
    var isSuccesful = response.statusCode === 204 || response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = RemoveLikesTransform;
module.exports = exports['default'];