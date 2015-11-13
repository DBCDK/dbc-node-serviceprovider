'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var PopSuggestTransform = {

  event: function event() {
    return 'getPopSuggestions';
  },

  getPopSuggestionsRequest: function getPopSuggestionsRequest(query) {
    var requests = [];

    requests.push(this.callServiceClient('popsuggest', 'getPopSuggestions', {
      index: 'display.title',
      query: query.replace(' ', '%5C%20'), // prepending a \ to whitespace in query string
      fields: ['fedoraPid', 'display.title']
    }));

    requests.push(this.callServiceClient('entitysuggest', 'getCreatorSuggestions', {
      query: query
    }));

    requests.push(this.callServiceClient('entitysuggest', 'getSubjectSuggestions', {
      query: query
    }));

    return requests;
  },

  requestTransform: function requestTransform(event, query) {
    if (event === 'getPopSuggestions') {
      return this.getPopSuggestionsRequest(query);
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
    } else if (response.params && response.params.service && response.params.service === 'entity-suggest') {
      if ((0, _lodash.isEmpty)(response.response.suggestions)) {
        data.isEmpty = true;
        data.index = this.getEntitySuggestIndex(response.params.method);
      } else {
        data = this.parseEntitySuggestData(response, query);
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
  parseEntitySuggestData: function parseEntitySuggestData(response, query) {
    var index = this.getEntitySuggestIndex(response.params.method);
    var docs = [];

    var numItems = response.response.suggestions.length <= 5 ? response.response.suggestions.length : 5;

    for (var i = 0; i < numItems; i++) {
      if (response.response.suggestions[i]) {
        docs.push({ text: response.response.suggestions[i].suggestion });
      }
    }

    return { index: index, docs: docs, query: query };
  },

  getEntitySuggestIndex: function getEntitySuggestIndex(indx) {
    var index = '';
    if (indx === 'creator') {
      index = 'display.creator';
    } else if (indx === 'subject') {
      index = 'term.subject';
    }
    return index;
  },

  /**
   * Parse data coming from the suggest service
   */
  parseData: function parseData(response, query) {
    var index = this.getIndex(response);
    var data = {
      index: index,
      docs: []
    };

    var parsedDocs = this.parseDocs(response.response.docs, index, query);
    if (parsedDocs.length) {
      data.docs = parsedDocs;
    }

    return data;
  },

  parseDocs: function parseDocs(docs, index, query) {
    var parsedDocs = [];
    docs.forEach(function (value, key) {
      var shouldStopFilter = false;
      if (value[index] && key < 5) {
        var text = value[index].filter(function (string) {
          if (!shouldStopFilter && string.toLowerCase().lastIndexOf(query.toLowerCase(), 0) === 0) {
            shouldStopFilter = true;
            return true;
          }
          return false;
        });
        parsedDocs.push({
          text: (0, _lodash.isArray)(text) ? text.pop() : text,
          pid: value.fedoraPid || null
        });
      }
    });

    return parsedDocs;
  }
};

exports['default'] = PopSuggestTransform;
module.exports = exports['default'];