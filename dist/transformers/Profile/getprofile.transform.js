'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var GetProfileTransform = {

  event: function event() {
    return 'getProfile';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars
    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };
    var params = {
      accessToken: passport.user.id,
      id: passport.user.uid
    };

    return this.callServiceClient('profile', 'getProfile', params);
  },

  responseTransform: function responseTransform(response, query, connection) {
    // eslint-disable-line no-unused-vars
    var loopbackProfile = JSON.parse(response.body);

    var profile = {
      name: loopbackProfile.email,
      imageUrl: loopbackProfile.imageUrl,
      favoriteLibraries: loopbackProfile.favoriteLibraries,
      likes: loopbackProfile.likes,
      userIsLoggedIn: !loopbackProfile.error
    };

    return profile;
  }
};

exports['default'] = GetProfileTransform;
module.exports = exports['default'];