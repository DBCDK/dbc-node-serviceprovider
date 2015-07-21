'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var OpenSuggestTransform = {
  _query: '',
  event: function event() {
    return 'getFilterGuides';
  },

  getSuggestions: function getSuggestions(request) {
    return this.callClient('opensuggest', 'getSuggestions', {
      profile: 'opac',
      agency: '150013',
      index: request.index,
      query: request.query
    });
  },

  requestTransform: function requestTransform(event, query) {
    this._query = query;
    return this.getSuggestions({
      index: 'scanphrase.title',
      query: query
    });
  },

  responseTransform: function responseTransform(data) {
    return this.extractWordsForFilter(data.suggestions, this._query);
  },

  extractWordsForFilter: function extractWordsForFilter(suggestions) {
    return suggestions.map(function (element) {
      return element.suggestion;
    });
  }
};

exports['default'] = OpenSuggestTransform;
module.exports = exports['default'];