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

  events: function events() {
    return ['getOpenSearchResultList'];
  },

  getSearchResultList: function getSearchResultList(request) {
    var OpenSearch = this.services.get('opensearch');
    return OpenSearch.getSearchResult([request]);
  },

  /**
   * Transforms the request from the application to Open Search request parameters
   *
   * @param {String} the query from the user
   * @param {String} the number of the first collection wanted in the search result
   * @param {String} the number of works to retrieve
   * @param {String} which sort to use
   * @return {Object} request parameters using Open Search terminology
   */

  requestTransform: function requestTransform(event, request) {
    var sort = request.sort;

    if (request.sort == 'default') {
      sort = 'rank_frequency';
    }

    return this.getSearchResultList({
      query: request.query,
      start: request.offset,
      stepValue: request.worksPerPage,
      sort: sort
    });
  },

  /**
   * Transforms the response from Open Search webservice to a representation 
   * that can be used by the application
   *
   * @param {Object} the response from the webservice
   * @return {Object} the transformed result
   */

  responseTransform: function responseTransform(response) {

    var data = {};
    data.result = [];
    data.info = [];
    data.error = [];

    var result = prep.checkResponse(response);

    if (result.hasOwnProperty('errorcode')) {
      data.error.push(result);
      return data;
    } else if (result.collections == 0) {
      data.info.push(result);
      return data;
    }

    data.info.push(result);

    if (result.collections == 1) {
      var searchResult = response.result.searchResult;
      response.result.searchResult = [searchResult];
    }

    response.result.searchResult.forEach(function (work) {
      var newWork = {};
      var no = work.collection.numberOfObjects;
      var identifiers = [];
      var title = undefined;
      var workType = undefined;
      if (no === '1') {
        identifiers.push(work.collection.object.identifier);
        title = work.formattedCollection.briefDisplay.manifestation.title;
        workType = work.formattedCollection.briefDisplay.manifestation.workType;
      } else {
        work.collection.object.forEach(function (identifier) {
          identifiers.push(identifier.identifier);
          title = work.formattedCollection.briefDisplay.manifestation[0].title;
          workType = work.formattedCollection.briefDisplay.manifestation[0].workType;
        });
      }
      newWork.identifiers = identifiers;
      newWork.title = title;
      newWork.workType = workType;
      data.result.push(newWork);
    });

    return data;
  }

});
module.exports = exports['default'];