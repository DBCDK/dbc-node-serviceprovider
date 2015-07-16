'use strict';

import {isArray, isEmpty} from 'lodash';

const PopSuggestTransform = {

  events() {
    return ['getPopSuggestions'];
  },

  getPopSuggestionsRequest(query) {
    let requests = [];
    requests.push(this.callClient('popsuggest::getSuggestions', {
      index: 'display.title',
      query: query,
      fields: ['fedoraPid', 'display.title']
    }));
    requests.push(this.callClient('popsuggest::getSuggestions', {
      index: 'display.creator',
      query: query,
      fields: ['display.creator']
    }));
    requests.push(this.callClient('popsuggest::getSuggestions', {
      index: 'term.subject',
      query: query,
      fields: ['term.subject']
    }));

    return requests;
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
    } else if (isEmpty(response.response.docs)) {
      data.isEmpty = true;
      data.index = this._getIndex(response);
    } else {
      data = this._parseData(response, query);
      data.query = query;
    }

    return data;
  },

  _getIndex(response) {
    let index = '';
    if (isArray(response.responseHeader.qf)) {
      index = response.responseHeader.qf.join();
    } else {
      index = response.responseHeader.qf.join();
    }

    return index.replace(',rec.collectionIdentifier', '');
  },

  _parseData(response, query) {
    const index = this._getIndex(response);
    let data = {
      index: index,
      docs: []
    };

    const parsedDocs = this.parseDocs(response.response.docs, index, query);
    if (parsedDocs.length) {
      data.docs = parsedDocs;
    }

    return data;
  },

  parseDocs(docs, index, query) {
    let parsedDocs = [];
    let counter = 0;
    docs.forEach((value) => {
      let shouldStopFilter = false;
      if (value[index] && counter < 5) {
        parsedDocs.push({
          text: value[index].filter((string) => {
            if (!this.shouldFilter(index)) {
              return true;
            }
            if (!shouldStopFilter && string.toLowerCase().startsWith(query.toLowerCase(), 0)) {
              shouldStopFilter = true;
              return true;
            }
            return false;
          }),
          pid: value.fedoraPid || null
        });
        counter++;
      }
    });

    return parsedDocs;
  },

  shouldFilter(index) {
    return (index === 'display.creator' || index === 'term.subject');
  }
};

export default PopSuggestTransform;
