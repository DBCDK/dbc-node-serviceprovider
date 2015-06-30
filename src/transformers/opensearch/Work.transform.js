'use strict';

import * as Provider from '../../Provider.js';
import * as prep from './response-preparation.js';
import OpenSearch from '../../clients/OpenSearch.client.js';

export default Provider.registerTransform({

  events() {
    return ['getOpenSearchWork'];
  },

  getWorkResult(request) {
    return OpenSearch.getWorkResult([request]);
  },

  requestTransform(event, request) {
    let pid = 'rec.id=' + request.pid;
    return this.getWorkResult({
      query: pid,
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

    response.result.searchResult.forEach(function (work) {
      let newWork = {};
      let general = {};
      if (work.collection.numberOfObjects === '1') {
        let record = work.collection.object;
        work.collection.object = [record];
      }
      let primary = work.collection.object[0].record;
      general.title = primary.title[0];
      if (primary.hasOwnProperty('creator')) {
        let creators = [];
        primary.creator.forEach(function (creator) {
          if (!creator.hasOwnProperty('attributes')) {
            creators.push(creator);
          } else if (creator.attributes['xsi:type'] !== 'oss:sort') {
            creators.push(creator.$value);
          }
        });
        general.creators = creators;
      }
      if (primary.hasOwnProperty('abstract')) {
        general.description = primary.abstract;
      } else if (primary.hasOwnProperty('description')) {
        general.description = primary.description;
        if (primary.description.hasOwnProperty('attributes')) {
          if (primary.description.attributes['xsi:type'] === 'dkdcplus:series') {
            general.series = primary.description.$value;
          }
        }
      }
      if (primary.hasOwnProperty('subject')) {
        let subjects = [];
        primary.subject.forEach(function (subject) {
          if (subject.hasOwnProperty('attributes')) {
            if (subject.attributes['xsi:type'] === 'dkdcplus:DBCS') {
              subjects.push(subject.$value);
            }
            if (subject.attributes['xsi:type'] === 'dkdcplus:DBCF') {
              subjects.push(subject.$value);
            }
            if (subject.attributes['xsi:type'] === 'dkdcplus:DBCM') {
              subjects.push(subject.$value);
            }
          }
        });
        general.subjects = subjects;
      }
      if (primary.hasOwnProperty('language')) {
        let languages = [];
        primary.language.forEach(function (language) {
          if (!language.hasOwnProperty('attributes')) {
            languages.push(language);
          }
        });
        general.languages = languages;
      }
      newWork.general = general;
      let specific = [];
      let types = [];
      work.collection.object.forEach(function (manifestation) {
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
          specific.forEach(function (minorwork) {
            if (type === minorwork.type) {
              minorwork.identifiers.push(manifestation.identifier);
              minorwork.dates.push(manifestation.record.date);
            }
          });
        }
      });
      newWork.specific = specific;
      data.result = newWork;
    });

    return data;

  }

});
