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

  getSearchResultList: function getSearchResultList(request) {},

  /**
   * Transforms the request from the app to MoreInfo request parameters
   *
   * @param {Array} the pid from Open Search
   * @return {Array} request parameters using More Info terminology
   */

  requestTransform: function requestTransform(request, data) {

    var identifiers = data.map(function (pid) {
      return pid.split(':').pop();
    });
    var MoreInfo = this.services.get('coverimage');
    return MoreInfo.getMoreInfoResult({ identifiers: identifiers }).map(function (promise) {
      return promise.then(function (response) {
        return {
          identifiers: data,
          result: getImagesFromResponse(response)
        };
      });
    });
  },

  /**
   * Transforms the respone from the MoreInfo webservice to a representation
   * that can be used by the application
   *
   * @param {Object} the response from MoreInfo
   * @return {Object} the transformed result
   */
  responseTransform: function responseTransform(response) {
    //@todo fix hack created in requestTransform where
    return response;
    var data = {};
    data.result = [];

    var result = prep.checkResponse(response);

    if (result.errorcode != undefined) {
      data.result.push(result);
    } else {
      data.result = getImagesFromResponse(response);
    }
    return data;
  }
});
module.exports = exports['default'];