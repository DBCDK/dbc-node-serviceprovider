'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CreateGroupTransform = {

  event: function event() {
    return 'createGroup';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars
    query.email = query.name;

    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };
    var loopbackGroup = {
      accessToken: passport.user.id,
      id: passport.user.uid
    };

    for (var i in query) {
      if (query.hasOwnProperty(i)) {
        loopbackGroup[i] = query[i];
      }
    }

    return this.callServiceClient('profile', 'createGroup', loopbackGroup);
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    var isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = CreateGroupTransform;
module.exports = exports['default'];