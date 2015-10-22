'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var LeaveGroupTransform = {

  event: function event() {
    return 'leaveGroup';
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

    return this.callServiceClient('profile', 'leaveGroup', group);
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    var isSuccesful = true;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = LeaveGroupTransform;
module.exports = exports['default'];