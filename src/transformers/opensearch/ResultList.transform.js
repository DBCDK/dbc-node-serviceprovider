'use strict';

import * as Provider from '../../Provider.js';
import * as prep from './response-preparation.js';

export default Provider.registerTransform({

  events() {
    return ['getOpenSearchResultList'];
  },
  
  getSearchResultList(request) {
    const OpenSearch = this.services.get('opensearch');
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

  requestTransform(event, request) {
    let sort = request.sort;

    if (request.sort == "default") {
      sort = "rank_frequency";
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

  responseTransform(response) {

    let data = {};
    data.result = [];
    data.error = [];
  
    let result = prep.checkResponse(response);
  
    if (result.hasOwnProperty('errorcode')) {
      data.error.push(result);
      return data;
    } else if (result.collections == 0) {
      //data.result.push(result);
      return data;
    }
  

  
    if (result.collections == 1) {
      let searchResult = response.result.searchResult;
      response.result.searchResult = [searchResult];
    }
  
    response.result.searchResult.forEach((work) => {
      let newWork = {};
      let no = work.collection.numberOfObjects;
      let identifiers = [];
      let title;
      let workType;
      if (no === "1") {
        identifiers.push(work.collection.object.identifier);
        title = work.formattedCollection.briefDisplay.manifestation.title;
        workType = work.formattedCollection.briefDisplay.manifestation.workType;
      } else {
        work.collection.object.forEach((identifier) => {
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
