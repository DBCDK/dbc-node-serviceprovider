'use strict';

import * as Provider from '../../Provider.js';

export default Provider.registerTransform({

  events() {
    return ['getFilterGuides'];
  },

  getSuggestions(request) {
    const OpenSuggest = this.services.get('OpenSuggest');
    return OpenSuggest.getSuggestions({
      index: request.index,
      query: request.query
    });
  },

  requestTransform(event, request) {
    return request.map(this.getSuggestions);
  },

  responseTransform(data) {
    console.log('responseTransform', data);
    return data;
  }
});
