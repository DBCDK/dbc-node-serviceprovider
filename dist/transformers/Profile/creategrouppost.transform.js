'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var QueryGroupsTransform = {
  event: function event() {
    return 'createGroupPost';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars

    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };
    return this.callServiceClient('profile', 'createGroupPost', {
      title: query.title,
      content: query.content,
      groupId: query.groupId,
      uid: passport.user.uid,
      postownerid: passport.user.uid,
      accessToken: passport.user.id
    });
  },

  responseTransform: function responseTransform(response, query, connection) {
    // eslint-disable-line no-unused-vars
    var isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = QueryGroupsTransform;
module.exports = exports['default'];