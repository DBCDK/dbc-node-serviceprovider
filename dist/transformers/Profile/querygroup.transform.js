'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var QueryGroupsTransform = {
  event: function event() {
    return 'queryGroups';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars
    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };
    return this.callServiceClient('profile', 'queryGroups', {
      query: query,
      accessToken: passport.user.id,
      id: passport.user.uid
    });
  },

  responseTransform: function responseTransform(response, query, connection) {
    // eslint-disable-line no-unused-vars
    return { groups: JSON.parse(response.body) };
  }
};

exports['default'] = QueryGroupsTransform;
module.exports = exports['default'];