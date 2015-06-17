'use strict';

import * as Provider from '../../Provider.js';
import {isArray} from 'lodash';

export default Provider.registerTransform({

  events() {
    let eventsArr = [];

    console.log(this.services.has('popsuggest'));
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
    if (data.error) {
      data = {
        error: true,
        statusCode: data.error.statusCode,
        statusMessage: data.error.statusMessage
      };
    }
    else if (isArray(data.responseHeader.qf)) {
      data.responseHeader.qf = data.responseHeader.qf.join();
    }

    console.log(data);
    return data;
  }
});
