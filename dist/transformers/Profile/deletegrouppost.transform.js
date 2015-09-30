'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var QueryGroupsTransform = {
  event: function event() {
    return 'deleteGroupPost';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars
    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };
    return this.callServiceClient('profile', 'removeGroupPost', {
      groupId: query,
      accessToken: passport.user.id
    });
  },

  responseTransform: function responseTransform(response, query, connection) {
    // eslint-disable-line no-unused-vars
    return {};
  }
};

exports['default'] = QueryGroupsTransform;
module.exports = exports['default'];