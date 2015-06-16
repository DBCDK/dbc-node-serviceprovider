'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _ProviderJs = require('../../Provider.js');

var Provider = _interopRequireWildcard(_ProviderJs);

exports['default'] = Provider.registerTransform({
  _query: '',
  events: function events() {
    return ['getFilterGuides'];
  },

  getSuggestions: function getSuggestions(request) {
    var OpenSuggest = this.services.get('opensuggest');
    return OpenSuggest.getSuggestions({
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

  extractWordsForFilter: function extractWordsForFilter(suggestions, query) {
    return suggestions.map(function (element) {
      return element.suggestion;
    });
  }

});
module.exports = exports['default'];