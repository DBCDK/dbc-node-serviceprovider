'use strict';

import * as Provider from '../../Provider.js';
import * as prep from './response-preparation.js';

export default Provider.registerTransform({

  events() {
    return ['getOpenSearchWork'];
  },

  getSearchResultList(request) {
    const OpenSearch = this.services.get('opensearch');
    return OpenSearch.getWorkResult([request]);
  },

  requestTransform(event, request) {

    return this.getWorkResult({
      query: request.query,
      start: request.offset,
      stepValue: request.worksPerPage,
      allObjects: request.allManifestations
    });

  },

  responseTransform(response) {

    let data = {};
    data.result = [];
    data.info = {};
    data.error = [];

    let result = prep.checkResponse(response);

    if (result.hasOwnProperty('errorcode')) {
      data.error.push(result);
      return data;
    } else if (result.collections === '0') {
      data.info.hits = result.hits;
      data.info.collections = result.collections;
      return data;
    }

    data.info.hits = result.hits;
    data.info.collections = result.collections;

    if (result.collections === '1') {
      let searchResult = response.result.searchResult;
      response.result.searchResult = [searchResult];
    }

    response.result.searchResult.forEach((work) => {
      let newWork = {};
      let general = {};
      let primary = work.collection.object[0].record;
      general.title = primary.title[0];
      let creators = [];
      primary.creator.forEach((creator) => {
        if (creator.attributes['xsi:type'] !== 'oss:sort') {
          creators.push(creator.$value);
        }
      });
      general.creators = creators;
      if (primary.abstract !== '') {
        general.description = primary.abstract;
      }
      if (primary.description.attributes['xsi:type'] === 'dkdcplus:series') {
        general.series = primary.description.$value;
      }
      let subjects = [];
      primary.subject.forEach((subject) => {
        if (subject.attributes['xsi:type'] === 'dkdcplus:DBCS') {
          subjects.push(subject.$value);
        }
        if (subject.attributes['xsi:type'] === 'dkdcplus:DBCF') {
          subjects.push(subject.$value);
        }
      });
      general.subjects = subjects;
      let languages = [];
      primary.language.forEach((language) => {
        if (!language.attributes) {
          languages.push(language);
        }
      });
      general.languages = languages;
      newWork.general = general;
      let specific = [];
      let types = [];
      work.collection.object.forEach((manifestation) => {
        let type = manifestation.record.type.$value;
        if (types.indexOf(type) === -1) {
          let minorwork = {};
          types.push(type);
          minorwork.type = type;
          let identifiers = [];
          identifiers.push(manifestation.identifier);
          minorwork.identifiers = identifiers;
          let dates = [];
          dates.push(manifestation.record.date);
          minorwork.dates = dates;
          specific.push(minorwork);
        } else {
          specific.forEach((minorwork) => {
            if (type === minorwork.type) {
              minorwork.identifiers.push(manifestation.identifier);
              minorwork.dates.push(manifestation.record.date);
            }
          });
        }
      });
      newWork.specific = specific;
      data.result.push(newWork);

    });

    return data;

  }

});
