'use strict';

const UpdateProfileTransform = {

  event() {
    return 'updateProfile';
  },

  requestTransform(event, query, connection) { // eslint-disable-line no-unused-vars
    const loopbackProfile = {
      email: query.name,
      imageUrl: query.imageUrl,
      id: connection.request.session.passport.user.uid,
      accessToken: connection.request.session.passport.user.id
    };
    let promise = this.callServiceClient('profile', 'updateProfile', loopbackProfile);
    return promise;
  },

  responseTransform(response, query) { // eslint-disable-line no-unused-vars
    const isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};


export default UpdateProfileTransform;
