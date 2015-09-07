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

    var loopbackProfile = {
      id: connection.request.session.passport.user.uid,
      accessToken: connection.request.session.passport.user.id
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