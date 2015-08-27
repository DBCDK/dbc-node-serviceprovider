'use strict';

const CreateUserTransform = {

  event() {
    return 'createUser';
  },

  requestTransform(event, query) { // eslint-disable-line no-unused-vars
    let promise = this.callServiceClient('profile', 'createUser', query);
    return promise;
  },

  responseTransform(response, query) { // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};


export default CreateUserTransform;
