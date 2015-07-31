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
    requests.push(this.callServiceClient('popsuggest', 'getSuggestions', {
      index: 'display.title',
      query: query,
      fields: ['fedoraPid', 'display.title']
    }));
    requests.push(this.callServiceClient('popsuggest', 'getSuggestions', {
      index: 'display.creator',
      query: query,
      fields: ['display.creator']
    }));
    requests.push(this.callServiceClient('popsuggest', 'getSuggestions', {
      index: 'term.subject',
      query: query,
      fields: ['term.subject']
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
    } else if ((0, _lodash.isEmpty)(response.response.docs)) {
      data.isEmpty = true;
      data.index = this._getIndex(response);
    } else {
      data = this._parseData(response, query);
      data.query = query;
    }

    return data;
  },

  _getIndex: function _getIndex(response) {
    var index = '';
    if ((0, _lodash.isArray)(response.responseHeader.qf)) {
      index = response.responseHeader.qf.join();
    } else {
      index = response.responseHeader.qf.join();
    }

    return index.replace(',rec.collectionIdentifier', '');
  },

  _parseData: function _parseData(response, query) {
    var index = this._getIndex(response);
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
    var _this = this;

    var parsedDocs = [];
    var counter = 0;
    docs.forEach(function (value) {
      var shouldStopFilter = false;
      if (value[index] && counter < 5) {
        parsedDocs.push({
          text: value[index].filter(function (string) {
            if (!_this.shouldFilter(index)) {
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

  shouldFilter: function shouldFilter(index) {
    return index === 'display.creator' || index === 'term.subject';
  }
};

exports['default'] = PopSuggestTransform;
module.exports = exports['default'];