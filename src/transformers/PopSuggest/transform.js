'use strict';

import * as Provider from '../../Provider.js';

export default Provider.registerTransform({

  events() {
    let eventsArr = [];

    if (this.services.has('popsuggest')) {
      eventsArr.push('getPopSuggestions');
    }

    return eventsArr;
  },

  getPopSuggestionsRequest(query) {
    console.log(query);
    const PopSuggest = this.services.get('popsuggest');
    return PopSuggest.getSuggestions([
      {
        index: 'term.creator',
        query: query,
        fields: ['fedoraPid', 'term.title', 'term.creator']
      },
      {
        index: 'term.title',
        query: query,
        fields: ['fedoraPid', 'term.title', 'term.creator']
      }
    ]);
  },

  getPopSuggestionsRequestResponse() {
    console.log('popSuggestRequestResponse', arguments);
  },

  requestTransform(event, query) {
    console.log('requestTransform');
    if (event === 'getPopSuggestions') {
      return this.getPopSuggestionsRequest(query);
    }
  },

  responseTransform(data) {
    console.log('responseTransform', data);
    return data;
  }
});
