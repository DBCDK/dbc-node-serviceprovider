'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var EntitySuggestTransform = {

  event: function event() {
    return 'getEntitySuggestions';
  },

  getEntitySuggestionsRequest: function getEntitySuggestionsRequest(query) {
    var requests = [];

    requests.push(this.callServiceClient('popsuggest', 'getEntitySuggestions', {
      index: 'library',
      query: query
    }));

    return requests;
  },

  requestTransform: function requestTransform(event, query) {
    if (event === 'getEntitySuggestions') {
      return this.getEntitySuggestionsRequest(query);
    }
  },

  responseTransform: function responseTransform(response, query) {
    var data = {};

    if (response.error) {
      data = {
        error: true,
        statusCode: response.error.statusCode,
        statusMessage: response.error.statusMessage
      };
    } else if (!(0, _lodash.isEmpty)(response.params.path.method) && response.params.path.method === 'entity-suggest') {
      if ((0, _lodash.isEmpty)(response.response.suggestions)) {
        data.isEmpty = true;
        data.index = response.params.path.index;
      } else {
        data = this.parseEntitySuggestData(response);
      }
    } else if ((0, _lodash.isEmpty)(response.response.docs)) {
      data.isEmpty = true;
      data.index = this.getIndex(response);
    } else {
      data = this.parseData(response, query);
      data.query = query;
    }

    return data;
  },

  getIndex: function getIndex(response) {
    var index = '';
    if ((0, _lodash.isArray)(response.responseHeader.qf)) {
      index = response.responseHeader.qf.join();
    } else {
      index = response.responseHeader.qf.join();
    }

    return index.replace(',rec.collectionIdentifier', '');
  },

  /**
   * Parse data coming from the entity-suggest service
   */
  parseEntitySuggestData: function parseEntitySuggestData(response) {
    var docs = [];

    var numItems = response.response.suggestions.length <= 10 ? response.response.suggestions.length : 10;

    for (var i = 0; i < numItems; i++) {
      if (response.response.suggestions[i]) {
        docs.push({ library: response.response.suggestions[i].suggestion });
      }
    }

    return {
      index: response.params.path.index,
      docs: docs,
      query: response.params.path.query
    };
  }
};

exports['default'] = EntitySuggestTransform;
module.exports = exports['default'];