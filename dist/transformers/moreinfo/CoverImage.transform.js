'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _ProviderJs = require('../../Provider.js');

var Provider = _interopRequireWildcard(_ProviderJs);

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

exports['default'] = Provider.registerTransform({

  _query: '',
  events: function events() {
    return ['getCoverImage'];
  },

  getSearchResultList: function getSearchResultList(request) {
    var MoreInfo = this.services.get('coverimage');
    return MoreInfo.getMoreInfoResult({
      identifiers: identifiers.identifiers
    });
  },

  /**
   * Transforms the request from the app to MoreInfo request parameters
   *
   * @param {Array} the pid from Open Search
   * @return {Array} request parameters using More Info terminology
   */

  requestTransform: function requestTransform(request) {

    var identifiers = [];

    request.forEach(function (value) {
      value.forEach(function (pid) {
        identifiers.push(pid.pid.split(':').pop());
      });
    });

    return this.getMoreInfoResult({
      identifiers: identifiers
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

    var data = {};
    data.result = [];

    var result = prep.checkResponse(response);

    if (result.errorcode != undefined) {
      data.result.push(result);
    } else {
      response.identifierInformation.forEach(function (identifier) {
        if (identifier.identifierKnown == true) {
          var url = undefined;
          identifier.coverImage.forEach(function (size) {
            if (size.attributes.imageSize == 'detail_500') {
              url = size.$value;
            }
          });
          if (url !== '') {
            data.result.push(url);
            return data;
          }
        }
      });
    }

    return data;
  }
});
module.exports = exports['default'];