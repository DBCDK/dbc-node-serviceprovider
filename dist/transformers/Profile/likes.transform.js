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
    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };

    var params = {
      accessToken: passport.user.id,
      uid: passport.user.uid,
      item_id: query.item_id,
      value: null
    };

    var id = query.id || null;

    var request = null;
    switch (query.action) {
      case 'like':
        params.value = 1;
        request = this.saveLike(params, id);
        break;
      case 'dislike':
        params.value = -1;
        request = this.saveLike(params, id);
        break;
      case 'remove':
        params.id = id;
        request = this.makeCallToServiceClient('removeLike', params);
        break;
      default:
        break;
    }

    return request;
  },

  saveLike: function saveLike(params, id) {
    var request = null;
    if (id) {
      params.id = id;
      request = this.makeCallToServiceClient('updateLike', params);
    } else {
      request = this.makeCallToServiceClient('saveLike', params);
    }

    return request;
  },

  makeCallToServiceClient: function makeCallToServiceClient(method, params) {
    return this.callServiceClient('profile', method, params);
  },

  responseTransform: function responseTransform(response) {
    var isSuccesful = response.statusCode === 204 || response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

exports['default'] = UpdateProfileTransform;
module.exports = exports['default'];