'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _ProviderJs = require('../../Provider.js');

var Provider = _interopRequireWildcard(_ProviderJs);

var _clientsRecommendationsClientJs = require('../../clients/Recommendations.client.js');

var _clientsRecommendationsClientJs2 = _interopRequireDefault(_clientsRecommendationsClientJs);

exports['default'] = Provider.registerTransform({
  _query: '',
  events: function events() {
    return ['getRecommendations'];
  },

  requestTransform: function requestTransform(event, list) {
    return _clientsRecommendationsClientJs2['default'].getRecommendations(list);
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
        workType: 'book' // @todo Hardcoded for now, change to real worktype
      };
    });
  }

});
module.exports = exports['default'];