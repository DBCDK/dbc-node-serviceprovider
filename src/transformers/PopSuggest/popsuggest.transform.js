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
        index: 'display.creator',
        query: query,
        fields: ['display.creator']
      },
      {
        index: 'display.title',
        query: query,
        fields: ['fedoraPid', 'display.title']
      },
      {
        index: 'term.subject',
        query: query,
        fields: ['term.subject']
      }
    ]);
  },

  requestTransform(event, query) {
    if (event === 'getPopSuggestions') {
      return this.getPopSuggestionsRequest(query);
    }
  },

  responseTransform(response, query) {
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
      data = this._parseData(response);
      data.query = query;
    }

    return data;
  },

  _getIndex(response) {
    let index = '';
    if (isArray(response.responseHeader.qf)) {
      index = response.responseHeader.qf.join();
    }
    else {
      index = response.responseHeader.qf.join();
    }

    return index.replace(',rec.collectionIdentifier', '');
  },

  _parseData(response) {
    const index = this._getIndex(response);
    let data = {
      index: index,
      docs: []
    };

    const parsedDocs = this.parseDocs(response.response.docs, index);
    if (parsedDocs.length) {
      data.docs = parsedDocs;
    }

    return data;
  },

  parseDocs(docs, index) {
    let parsedDocs = [];
    let counter = 0;
    docs.forEach((value) => {
      if (value[index] && counter < 5) {
        parsedDocs.push({
          text: value[index].join(),
          pid: value.fedoraPid || null
        });
        counter++;
      }
    });

    return parsedDocs;
  }
});
