'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var JoinGroupTransform = {

  event: function event() {
    return 'joinGroup';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars

    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };
    var group = {
      accessToken: passport.user.id,
      memberId: passport.user.uid
    };

    for (var i in query) {
      if (query.hasOwnProperty(i)) {
        group[i] = query[i];
      }
    }

    return this.callServiceClient('profile', 'joinGroup', group);
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    var isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = JoinGroupTransform;
module.exports = exports['default'];