'use strict';

const LogoutUserTransform = {

  event() {
    return 'logoutUser';
  },

  requestTransform(event, query) { // eslint-disable-line no-unused-vars
    let promise = this.callServiceClient('profile', 'logoutUser', query);
    return promise;
  },

  responseTransform(response, query) { // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};

export default LogoutUserTransform;
