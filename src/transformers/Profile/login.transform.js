'use strict';

const LoginUserTransform = {

  event() {
    return 'loginUser';
  },

  requestTransform(event, query) { // eslint-disable-line no-unused-vars
    let promise = this.callServiceClient('profile', 'loginUser', query);
    return promise;
  },

  responseTransform(response, query) { // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};

export default LoginUserTransform;
