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
    var loopbackProfile = {
      email: query.name,
      imageUrl: query.imageUrl,
      id: connection.request.session.passport.user.uid,
      accessToken: connection.request.session.passport.user.id
    };
    var promise = this.callServiceClient('profile', 'updateProfile', loopbackProfile);
    return promise;
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    var isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = UpdateProfileTransform;
module.exports = exports['default'];