'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var UpdateProfileTransform = {

  event: function event() {
    return 'updateProfile';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars
    query.email = query.name;
    delete query.name;

    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };
    var loopbackProfile = {
      accessToken: passport.user.id,
      id: passport.user.uid
    };

    for (var i in query) {
      if (query.hasOwnProperty(i)) {
        loopbackProfile[i] = query[i];
      }
    }

    return this.callServiceClient('profile', 'updateProfile', loopbackProfile);
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    var isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = UpdateProfileTransform;
module.exports = exports['default'];