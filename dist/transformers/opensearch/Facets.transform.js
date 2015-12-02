'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var FacetsTransform = {

  event: function event() {
    return 'getOpenSearchFacets';
  },

  getFacets: function getFacets(request) {
    return this.callServiceClient('opensearch', 'getFacetResult', request);
  },

  /**
   * Transforms the request from the application to Open Search request parameters
   *
   * @param {string} event
   * @param {Object} request
   * @return {Object} request parameters using Open Search terminology
   */

  requestTransform: function requestTransform(event, request) {

    return this.getSearchFacets({
      query: request.query,
      facets: {
        facetName: ['facet.type', 'facet.creator', 'facet.subject', 'facet.language', 'facet.category', 'facet.date', 'facet.acSource'],
        numberOfTerms: request.number
      }
    });
  },

  /**
   * Transforms the response from Open Search webservice to a representation
   * that can be used by the application
   *
   * @param {Object} response the response from the webservice
   * @return {Object} the transformed result
   */
  responseTransform: function responseTransform(response) {
    var data = {
      result: [],
      info: {},
      error: []
    };

    var result = prep.checkResponse(response);

    if (result.hasOwnProperty('errorcode')) {
      data.error.push(result);
      return data;
    }

    var facetResult = response.result.facetResult || {};

    if (facetResult.hasOwnProperty('facet')) {
      facetResult.facet.forEach(function (f) {
        var terms = [];
        f.facetTerm.forEach(function (t) {
          var term = {};
          term.term = t.term;
          term.count = t.frequence;
          terms.push(term);
        });
        data.result.push({ facetName: f.facetName, terms: terms });
      });
    }

    return data;
  }
};

exports['default'] = FacetsTransform;
module.exports = exports['default'];