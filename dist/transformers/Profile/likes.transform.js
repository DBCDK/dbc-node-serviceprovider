'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var UpdateProfileTransform = {

  event: function event() {
    return 'saveLike';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars
    // console.log(query);
    var params = {
      accessToken: connection.request.session.passport.user.id,
      uid: connection.request.session.passport.user.uid,
      item_id: query.item_id,
      value: null
    };

    var request = null;
    switch (query.action) {
      case 'like':
        params.value = 1;
        request = this.callServiceClient('profile', 'saveLike', params);
        break;
      case 'remove':
        params.id = query.id;
        request = this.callServiceClient('profile', 'removeLike', params);
        break;
      default:
        break;
    }

    return request;
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    // console.log(response);
    var isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = UpdateProfileTransform;
module.exports = exports['default'];