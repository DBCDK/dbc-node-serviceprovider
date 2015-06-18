'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _ProviderJs = require('../../Provider.js');

var Provider = _interopRequireWildcard(_ProviderJs);

var _lodash = require('lodash');

exports['default'] = Provider.registerTransform({

  events: function events() {
    var eventsArr = [];

    if (this.services.has('popsuggest')) {
      eventsArr.push('getPopSuggestions');
    }

    return eventsArr;
  },

  getPopSuggestionsRequest: function getPopSuggestionsRequest(query) {
    var PopSuggest = this.services.get('popsuggest');
    return PopSuggest.getSuggestions([{
      index: 'term.creator',
      query: query,
      fields: ['display.creator']
    }, {
      index: 'term.title',
      query: query,
      fields: ['fedoraPid', 'display.title']
    }]);
  },

  requestTransform: function requestTransform(event, query) {
    if (event === 'getPopSuggestions') {
      return this.getPopSuggestionsRequest(query);
    }
  },

  _getIndex: function _getIndex(response) {
    var index = '';
    if ((0, _lodash.isArray)(response.responseHeader.qf)) {
      index = response.responseHeader.qf.join();
    } else {
      index = response.responseHeader.qf.join();
    }

    return index;
  },

  responseTransform: function responseTransform(response) {
    var data = {};
    if (response.error) {
      data = {
        error: true,
        statusCode: response.error.statusCode,
        statusMessage: response.error.statusMessage
      };
    } else if ((0, _lodash.isEmpty)(response.response.docs)) {
      data.isEmpty = true;
      data.index = this._getIndex(response);
    } else {
      data = {
        index: this._getIndex(response),
        docs: response.response.docs
      };
    }

    return data;
  }
});
module.exports = exports['default'];