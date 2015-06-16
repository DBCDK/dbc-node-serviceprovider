'use strict';

import * as Provider from '../../Provider.js';

export default Provider.registerTransform({

  events() {
    return ['getFilterGuides'];
  },

  getSuggestions(request) {
    const OpenSuggest = this.services.get('opensuggest');
    return OpenSuggest.getSuggestions({
      index: request.index,
      query: request.query
    });
  },

  requestTransform(event, query) {
    return this.getSuggestions({
      index: 'scanphrase.subject',
      query
    })
  },

  responseTransform(data) {
    console.log('responseTransform', data);
    return data;
  }
});
