'use strict';

import {isArray, isEmpty} from 'lodash';

const CreateUserTransform = {

    event() {
        return 'createUser';
    },

    requestTransform(event, query) {
        console.log('requestTransform', query);
        let promise = this.callServiceClient('profile', 'createUser', query);
        return promise;
    },

    responseTransform(response, query) {
        //console.log('resTrans', response);
        return response;
    },
};

export default CreateUserTransform;
