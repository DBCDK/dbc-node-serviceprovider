'use strict';

import * as Provider from '../../Provider.js';
import {isArray, isEmpty} from 'lodash';

export default Provider.registerTransform({

  events() {
    let eventsArr = [];

    if (this.services.has('popsuggest')) {
      eventsArr.push('getPopSuggestions');
    }

    return eventsArr;
  },

  getPopSuggestionsRequest(query) {
    const PopSuggest = this.services.get('popsuggest');
    return PopSuggest.getSuggestions([
      {
        index: 'term.creator',
        query: query,
        fields: ['display.creator']
      },
      {
        index: 'term.title',
        query: query,
        fields: ['fedoraPid', 'display.title']
      }
    ]);
  },

  requestTransform(event, query) {
    if (event === 'getPopSuggestions') {
      return this.getPopSuggestionsRequest(query);
    }
  },

  _getIndex(response) {
    let index = '';
    if (isArray(response.responseHeader.qf)) {
      index = response.responseHeader.qf.join();
    }
    else {
      index = response.responseHeader.qf.join();
    }

    return index;
  },

  responseTransform(response) {
    let data = {};
    if (response.error) {
      data = {
        error: true,
        statusCode: response.error.statusCode,
        statusMessage: response.error.statusMessage
      };
    }
    else if (isEmpty(response.response.docs)) {
      data.isEmpty = true;
      data.index = this._getIndex(response);
    }
    else {
      data = {
        index: this._getIndex(response),
        docs: response.response.docs
      };
    }

    return data;
  }
});
