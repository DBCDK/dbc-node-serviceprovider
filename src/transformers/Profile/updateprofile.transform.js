'use strict';

const UpdateProfileTransform = {

  event() {
    return 'updateProfile';
  },

  requestTransform(event, query, connection) { // eslint-disable-line no-unused-vars
    query.email = query.name;
    delete query.name;

    let loopbackProfile = {
      id: connection.request.session.passport.user.uid,
      accessToken: connection.request.session.passport.user.id
    };

    for (var i in query) {
      if (query.hasOwnProperty(i)) {
        loopbackProfile[i] = query[i];
      }
    }

    return this.callServiceClient('profile', 'updateProfile', loopbackProfile);
  },

  responseTransform(response, query) { // eslint-disable-line no-unused-vars
    const isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};


export default UpdateProfileTransform;
