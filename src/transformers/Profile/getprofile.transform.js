'use strict';

const GetProfileTransform = {

  event() {
    return 'getProfile';
  },

  requestTransform(event, query, connection) { // eslint-disable-line no-unused-vars
    const params = {
      accessToken: connection.request.session.passport.user.id,
      id: connection.request.session.passport.user.uid
    };
    let promise = this.callServiceClient('profile', 'getProfile', params);
    return promise;
  },

  responseTransform(response, query, connection) { // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};


export default GetProfileTransform;
