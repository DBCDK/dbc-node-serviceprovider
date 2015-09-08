'use strict';

const GetProfileTransform = {

  event() {
    return 'getProfile';
  },

  requestTransform(event, query, connection) { // eslint-disable-line no-unused-vars
    const passport = connection.request.session.passport || {user: {id: '', uid: ''}};
    const params = {
      accessToken: passport.user.id,
      id: passport.user.uid
    };

    return this.callServiceClient('profile', 'getProfile', params);
  },

  responseTransform(response, query, connection) { // eslint-disable-line no-unused-vars
    const loopbackProfile = JSON.parse(response.body);

    const profile = {
      name: loopbackProfile.email,
      imageUrl: loopbackProfile.imageUrl,
      favoriteLibraries: loopbackProfile.favoriteLibraries,
      likes: loopbackProfile.likes,
      userIsLoggedIn: (!loopbackProfile.error)
    };

    return profile;
  }
};


export default GetProfileTransform;
