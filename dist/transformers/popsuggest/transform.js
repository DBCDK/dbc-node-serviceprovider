'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _ProviderJs = require('../../Provider.js');

var Provider = _interopRequireWildcard(_ProviderJs);

exports['default'] = Provider.registerTransform({

  events: function events() {
    var eventsArr = [];

    if (this.services.has('popsuggest')) {
      eventsArr.push('getPopSuggestions');
    }

    return eventsArr;
  },

  getPopSuggestionsRequest: function getPopSuggestionsRequest(query) {
    console.log(query);
    var PopSuggest = this.services.get('popsuggest');
    return PopSuggest.getSuggestions([{
      index: 'term.creator',
      query: query,
      fields: ['fedoraPid', 'term.title', 'term.creator']
    }, {
      index: 'term.title',
      query: query,
      fields: ['fedoraPid', 'term.title', 'term.creator']
    }]);
  },

  getPopSuggestionsRequestResponse: function getPopSuggestionsRequestResponse() {
    console.log('popSuggestRequestResponse', arguments);
  },

  requestTransform: function requestTransform(event, query) {
    console.log('requestTransform');
    if (event === 'getPopSuggestions') {
      return this.getPopSuggestionsRequest(query);
    }
  },

  responseTransform: function responseTransform(data) {
    console.log('responseTransform', data);
    return data;
  }
});
module.exports = exports['default'];