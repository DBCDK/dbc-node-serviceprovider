'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _ProviderJs = require('../../Provider.js');

var Provider = _interopRequireWildcard(_ProviderJs);

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var _jsonpathObjectTransform = require('jsonpath-object-transform');

var _jsonpathObjectTransform2 = _interopRequireDefault(_jsonpathObjectTransform);

var _clientsMoreInfoClientJs = require('../../clients/MoreInfo.client.js');

var _clientsMoreInfoClientJs2 = _interopRequireDefault(_clientsMoreInfoClientJs);

function getImagesFromResponse(result) {
  var template = {
    images: ['$.identifierInformation..coverImage.*', {
      url: '$..$value',
      size: '$..imageSize',
      format: '$..imageFormat'
    }]
  };
  var transformed = (0, _jsonpathObjectTransform2['default'])(result, template);
  return transformed;
}

exports['default'] = Provider.registerTransform({

  _query: '',
  events: function events() {
    return ['getCoverImage'];
  },

  /**
   * Transforms the request from the app to MoreInfo request parameters
   *
   * @param {Array} the pid from Open Search
   * @return {Array} request parameters using More Info terminology
   */
  requestTransform: function requestTransform(request, data) {
    // eslint-disable-line
    var identifiers = data.map(function (pid) {
      return pid.split(':').pop();
    });
    return _clientsMoreInfoClientJs2['default'].getMoreInfoResult({ identifiers: identifiers });
  },

  /**
   * Transforms the respone from the MoreInfo webservice to a representation
   * that can be used by the application
   *
   * @param {Object} the response from MoreInfo
   * @return {Object} the transformed result
   */
  responseTransform: function responseTransform(response, identifiers) {
    var result = prep.checkResponse(response) || getImagesFromResponse(response);
    return {
      identifiers: identifiers,
      result: result
    };
  }
});
module.exports = exports['default'];