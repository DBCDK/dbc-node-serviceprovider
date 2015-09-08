'use strict';

const UpdateProfileTransform = {

  event() {
    return 'saveLike';
  },

  requestTransform(event, query, connection) { // eslint-disable-line no-unused-vars
    // console.log(query);
    const params = {
      accessToken: connection.request.session.passport.user.id,
      uid: connection.request.session.passport.user.uid,
      item_id: query.item_id,
      value: null
    };

    let request = null;
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

  responseTransform(response, query) { // eslint-disable-line no-unused-vars
    // console.log(response);
    const isSuccesful = response.statusCode === 200;
    return JSON.parse(isSuccesful);
  }
};

export default UpdateProfileTransform;
