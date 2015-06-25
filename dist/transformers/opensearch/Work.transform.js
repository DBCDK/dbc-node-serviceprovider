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
    return ['getOpenSearchWork'];
  },

  getWorkResult: function getWorkResult(request) {
    var OpenSearch = this.services.get('opensearch');
    return OpenSearch.getWorkResult([request]);
  },

  requestTransform: function requestTransform(event, request) {
    var pid = 'rec.id=' + request.pid;
    return this.getWorkResult({
      query: pid,
      start: request.offset,
      stepValue: request.worksPerPage,
      allObjects: request.allManifestations
    });
  },

  responseTransform: function responseTransform(response) {

    var data = {};
    data.result = [];
    data.info = {};
    data.error = [];

    var result = prep.checkResponse(response);

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
      var searchResult = response.result.searchResult;
      response.result.searchResult = [searchResult];
    }

    response.result.searchResult.forEach(function (work) {
      var newWork = {};
      var general = {};
      var primary = work.collection.object[0].record;
      general.title = primary.title[0];
      var creators = [];
      primary.creator.forEach(function (creator) {
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
      var subjects = [];
      primary.subject.forEach(function (subject) {
        if (subject.attributes['xsi:type'] === 'dkdcplus:DBCS') {
          subjects.push(subject.$value);
        }
        if (subject.attributes['xsi:type'] === 'dkdcplus:DBCF') {
          subjects.push(subject.$value);
        }
      });
      general.subjects = subjects;
      var languages = [];
      primary.language.forEach(function (language) {
        if (!language.attributes) {
          languages.push(language);
        }
      });
      general.languages = languages;
      newWork.general = general;
      var specific = [];
      var types = [];
      work.collection.object.forEach(function (manifestation) {
        var type = manifestation.record.type.$value;
        if (types.indexOf(type) === -1) {
          var minorwork = {};
          types.push(type);
          minorwork.type = type;
          var identifiers = [];
          identifiers.push(manifestation.identifier);
          minorwork.identifiers = identifiers;
          var dates = [];
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
      data.result.push(newWork);
    });

    return data;
  }

});
module.exports = exports['default'];