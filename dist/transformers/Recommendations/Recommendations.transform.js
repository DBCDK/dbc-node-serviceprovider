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
    return ['getRecommendations'];
  },

  requestTransform: function requestTransform(event, list) {
    return this.services.get('recommend').getRecommendations(list);
  },

  responseTransform: function responseTransform(data) {
    return this.extractWorkInformation(data.result);
  },

  extractWorkInformation: function extractWorkInformation(result) {
    return result.map(function (element) {
      return {
        identifiers: [element[0]],
        title: element[1].title,
        creator: element[1].creator,
        workType: 'book' //@todo Hardcoded for now, change to real worktype
      };
    });
  }

});
module.exports = exports['default'];