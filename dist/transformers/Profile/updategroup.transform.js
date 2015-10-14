'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var UpdateGroupTransform = {

  event: function event() {
    return 'updateGroup';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars

    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };
    var group = {
      accessToken: passport.user.id,
      id: passport.user.uid
    };

    for (var i in query) {
      if (query.hasOwnProperty(i)) {
        group[i] = query[i];
      }
    }

    return this.callServiceClient('profile', 'updateGroup', group);
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    var isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = UpdateGroupTransform;
module.exports = exports['default'];