'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CommentOnGroupPostTransform = {

  event: function event() {
    return 'commentOnGroupPost';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars
    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };

    var commentObject = {
      accessToken: passport.user.id,
      uid: passport.user.uid,
      postId: query.postId,
      commentText: query.commentText
    };

    return this.callServiceClient('profile', 'commentOnGroupPost', commentObject);
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    var isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = CommentOnGroupPostTransform;
module.exports = exports['default'];