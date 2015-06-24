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
    }, {
      index: 'term.subject',
      query: query,
      fields: ['term.subject']
    }]);
  },

  requestTransform: function requestTransform(event, query) {
    if (event === 'getPopSuggestions') {
      return this.getPopSuggestionsRequest(query);
    }
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
      data = this._parseData(response);
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

  _parseData: function _parseData(response) {
    var index = this._getIndex(response);
    var data = {
      index: index,
      docs: []
    };

    switch (index) {
      case 'term.creator':
        var creators = this._getCreators(response.response.docs);
        if (creators.length >= 1) {
          data.docs = creators;
        }

        break;
      case 'term.title':
        var titles = this._getTitles(response.response.docs);
        if (titles.length >= 1) {
          data.docs = titles;
        }
        break;
      case 'term.subject':
        var subjects = this._getSubjects(response.response.docs);
        if (subjects.length >= 1) {
          data.docs = subjects;
        }
        break;
      default:
        break;
    }

    return data;
  },

  _getCreators: function _getCreators(docs) {
    var creators = [];
    var counter = 0;
    docs.forEach(function (value) {
      if (value['display.creator'] && counter < 5) {
        creators.push({
          text: value['display.creator'].join()
        });
        counter++;
      }
    });

    return creators;
  },

  _getTitles: function _getTitles(docs) {
    var titles = [];
    var counter = 0;
    docs.forEach(function (value) {
      if (value['display.title'] && counter < 5) {
        titles.push({
          text: value['display.title'].join(),
          img: 'http://dummyimage.com/50x50/000/fff'
        });
        counter++;
      }
    });

    return titles;
  },

  _getSubjects: function _getSubjects(docs) {
    var creators = [];
    var counter = 0;
    docs.forEach(function (value) {
      if (value['term.subject'] && counter < 5) {
        creators.push({
          text: value['term.subject'].join()
        });
        counter++;
      }
    });

    return creators;
  }
});
module.exports = exports['default'];