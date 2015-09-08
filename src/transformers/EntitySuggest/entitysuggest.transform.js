'use strict';

import {isArray, isEmpty} from 'lodash';

const EntitySuggestTransform = {

  event() {
    return 'getEntitySuggestions';
  },

  getEntitySuggestionsRequest(query) {
    let requests = [];

    requests.push(this.callServiceClient('popsuggest', 'getEntitySuggestions', {
      index: 'library',
      query: query + '<=folkebibliotek'
    }));

    return requests;
  },

  requestTransform(event, query) {
    if (event === 'getEntitySuggestions') {
      return this.getEntitySuggestionsRequest(query);
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
    else if (!isEmpty(response.params.path.method) && response.params.path.method === 'entity-suggest') {
      if (isEmpty(response.response.suggestions)) {
        data.isEmpty = true;
        data.index = response.params.path.index;
      }
      else {
        data = this.parseEntitySuggestData(response);
      }
    }
    else if (isEmpty(response.response.docs)) {
      data.isEmpty = true;
      data.index = this.getIndex(response);
    }
    else {
      data = this.parseData(response, query);
      data.query = query;
    }

    return data;
  },

  getIndex(response) {
    let index = '';
    if (isArray(response.responseHeader.qf)) {
      index = response.responseHeader.qf.join();
    }
    else {
      index = response.responseHeader.qf.join();
    }

    return index.replace(',rec.collectionIdentifier', '');
  },

  /**
   * Parse data coming from the entity-suggest service
   */
  parseEntitySuggestData(response) {
    const docs = [];

    const numItems = (response.response.suggestions.length <= 10) ? response.response.suggestions.length : 10;

    for (let i = 0; i < numItems; i++) {
      if (response.response.suggestions[i]) {
        docs.push({library: response.response.suggestions[i].suggestion});
      }
    }

    return {
      index: response.params.path.index,
      docs: docs,
      query: response.params.path.query
    };
  }
};

export default EntitySuggestTransform;
