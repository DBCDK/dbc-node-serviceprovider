'use strict';

import * as prep from './response-preparation.js';

const translations = {
  music: 'Musik',
  movie: 'Film',
  literature: 'Bog',
  game: 'Spil',
  periodica: 'Tidsskrift',
  track: 'Spor',
  article: 'Artikel',
  sheetmusic: 'Noder',
  map: 'Kort',
  review: 'Anmeldelse',
  bookdescription: 'Bog Beskrivelse'
};

const ResultListTransform = {

  event() {
    return 'getOpenSearchResultList';
  },

  getSearchResultList(request) {
    return this.callServiceClient('opensearch', 'getSearchResult', request);
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
   * Transforms the response from Open Search webservice to a representation
   * that can be used by the application
   *
   * @param {Object} the response from the webservice
   * @return {Object} the transformed result
   */
  responseTransform(response) {

    let data = {};
    data.result = [];
    data.info = {};
    data.error = [];

    let result = prep.checkResponse(response);

    if (result.hasOwnProperty('errorcode')) {
      data.error.push(result);
      return data;
    }
    else if (result.collections === '0') {
      data.info.hits = result.hits;
      data.info.collections = result.collections;
      data.info.more = result.more;
      return data;
    }

    data.info.hits = result.hits;
    data.info.collections = result.collections;
    data.info.more = result.more;


    let facet = response.result.facetResult.facet || {};
    if (facet.hasOwnProperty('facetTerm')) {
      data.info.facets = [];
      facet.facetTerm.forEach((value) => {
        if (translations[value.term]) {
          data.info.facets.push({
            type: facet.facetName,
            value: value.term,
            displayValue: translations[value.term],
            cssClass: 'worktype'
          });
        }
      });
    }

    if (result.collections === '1') {
      let searchResult = response.result.searchResult;
      response.result.searchResult = [searchResult];
    }

    response.result.searchResult.forEach((work) => {
      let newWork = {};
      let no = work.collection.numberOfObjects;
      let identifiers = [];
      let title, creator, workType;
      if (no === '1') {
        identifiers.push(work.collection.object.identifier);
        title = work.formattedCollection.briefDisplay.manifestation.titleFull;
        creator = work.formattedCollection.briefDisplay.manifestation.creator;
        workType = work.formattedCollection.briefDisplay.manifestation.workType;
      }
      else {
        work.collection.object.forEach((identifier) => {
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

export default ResultListTransform;
