'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var _lodash = require('lodash');

var ResultListTransform = {

  event: function event() {
    return 'getOpenSearchResultList';
  },

  getSearchResultList: function getSearchResultList(request) {
    return this.callServiceClient('opensearch', 'getSearchResult', request);
  },

  /**
   * Transforms the request from the application to Open Search request parameters
   *
   * @param {string} event
   * @param {Object} request
   * @return {Object} request parameters using Open Search terminology
   */

  requestTransform: function requestTransform(event, request) {
    var sort = request.sort;

    if (request.sort === 'default') {
      sort = 'popularity_descending';
    }

    return this.getSearchResultList({
      query: request.query,
      start: request.offset,
      stepValue: request.worksPerPage,
      sort: sort,
      facets: {
        facetName: 'term.workType',
        numberOfTerms: 15
      }
    });
  },

  /**
   * Extract facets from the response.
   *
   * @param {Object} response The response from which the facets should be extracted.
   * @return {Array} result Array of facets. Empty array if none is found.
   */
  getFacets: function getFacets(response) {
    var facets = response.result.facetResult.facet || {};
    var result = [];

    if (facets.hasOwnProperty('facetTerm')) {
      var facetTerms = (0, _lodash.isArray)(facets.facetTerm) ? facets.facetTerm : [facets.facetTerm];
      facetTerms.forEach(function (value) {
        result.push({
          type: facets.facetName,
          value: value.term,
          displayValue: value.term,
          cssClass: 'worktype'
        });
      });
    }
    return result;
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
      info: {
        facets: []
      },
      error: []
    };

    var result = prep.checkResponse(response);

    if (result.hasOwnProperty('errorcode')) {
      data.error.push(result);
      return data;
    } else if (result.collections === '0') {
      data.info.hits = result.hits;
      data.info.collections = result.collections;
      data.info.more = result.more;
      return data;
    }

    data.info.hits = result.hits;
    data.info.collections = result.collections;
    data.info.more = result.more;

    if (result.collections === '1') {
      var searchResult = response.result.searchResult;
      response.result.searchResult = [searchResult];
    }

    data.info.facets = this.getFacets(response);

    response.result.searchResult.forEach(function (work) {
      var newWork = {};
      var no = work.collection.numberOfObjects;
      var identifiers = [];
      var title = undefined,
          creator = undefined,
          workType = undefined;
      if (no === '1') {
        identifiers.push(work.collection.object.identifier);
        title = work.formattedCollection.briefDisplay.manifestation.titleFull;
        creator = work.formattedCollection.briefDisplay.manifestation.creator;
        workType = work.formattedCollection.briefDisplay.manifestation.workType;
      } else {
        work.collection.object.forEach(function (identifier) {
          identifiers.push(identifier.identifier);
          title = work.formattedCollection.briefDisplay.manifestation[0].titleFull;
          creator = work.formattedCollection.briefDisplay.manifestation[0].creator;
          workType = work.formattedCollection.briefDisplay.manifestation[0].workType;
        });
      }
      newWork.identifiers = identifiers;
      newWork.title = title;
      newWork.creator = creator;
      newWork.workType = workType;
      data.result.push(newWork);
    });

    return data;
  }
};

exports['default'] = ResultListTransform;
module.exports = exports['default'];