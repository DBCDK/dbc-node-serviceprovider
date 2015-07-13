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

var _clientsOpenSearchClientJs = require('../../clients/OpenSearch.client.js');

var _clientsOpenSearchClientJs2 = _interopRequireDefault(_clientsOpenSearchClientJs);

function getWorkData(work) {
  var general = {};
  if (work.collection.numberOfObjects === '1') {
    var record = work.collection.object;
    work.collection.object = [record];
  }
  var primary = work.collection.object[0].record;
  general.title = primary.title[0];
  if (primary.hasOwnProperty('title')) {
    primary.title.forEach(function (title) {
      if (title.hasOwnProperty('attributes')) {
        if (title.attributes['xsi:type'] === 'dkdcplus:series') {
          general.series = title.$value;
        }
      }
    });
  }
  if (primary.hasOwnProperty('creator')) {
    (function () {
      var creators = [];
      primary.creator.forEach(function (creator) {
        if (!creator.hasOwnProperty('attributes')) {
          creators.push(creator);
        } else if (creator.attributes['xsi:type'] !== 'oss:sort') {
          creators.push(creator.$value);
        }
      });
      general.creators = creators;
    })();
  }
  if (primary.hasOwnProperty('abstract')) {
    general.description = primary.abstract;
  } else if (primary.hasOwnProperty('description')) {
    general.description = primary.description;
  }
  if (primary.hasOwnProperty('description')) {
    if (primary.description.hasOwnProperty('attributes')) {
      if (primary.description.attributes['xsi:type'] === 'dkdcplus:series') {
        general.series = primary.description.$value;
      }
    }
  }
  var subjects = [];
  if (primary.hasOwnProperty('subject')) {
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
        if (subject.attributes['xsi:type'] === 'dkdcplus:DBCO') {
          subjects.push(subject.$value);
        }
      }
    });
  }
  if (primary.hasOwnProperty('spatial')) {
    if (primary.spatial instanceof Array === false) {
      var spatial = primary.spatial;
      primary.spatial = [spatial];
    }
    primary.spatial.forEach(function (subject) {
      subjects.push(subject.$value);
    });
  }
  if (primary.hasOwnProperty('temporal')) {
    if (primary.temporal instanceof Array === false) {
      var temporal = primary.temporal;
      primary.temporal = [temporal];
    }
    primary.temporal.forEach(function (subject) {
      subjects.push(subject.$value);
    });
  }
  if (subjects.length > 0) {
    general.subjects = subjects;
  }
  if (primary.hasOwnProperty('hasPart')) {
    (function () {
      var tracks = [];
      primary.hasPart.forEach(function (track) {
        if (track.hasOwnProperty('attributes')) {
          if (track.attributes['xsi:type'] === 'dkdcplus:track') {
            tracks.push(track.$value);
          }
        }
      });
      if (tracks.length > 0) {
        general.tracks = tracks;
      }
    })();
  }
  if (primary.hasOwnProperty('contributor')) {
    (function () {
      var actors = [];
      var cont = primary.contributor;
      if (primary.contributor instanceof Array) {
        primary.contributor = cont;
      } else {
        primary.contributor = [cont];
      }
      primary.contributor.forEach(function (contributor) {
        if (contributor.hasOwnProperty('attributes')) {
          if (contributor.attributes['xsi:type'] === 'dkdcplus:act') {
            actors.push(contributor.$value);
          }
          if (contributor.attributes['xsi:type'] === 'dkdcplus:prf') {
            actors.push(contributor.$value);
          }
        }
      });
      if (actors.length > 0) {
        general.actors = actors;
      }
    })();
  }
  if (primary.hasOwnProperty('language')) {
    (function () {
      var languages = [];
      primary.language.forEach(function (language) {
        if (!language.hasOwnProperty('attributes')) {
          languages.push(language);
        }
      });
      general.languages = languages;
    })();
  }

  return general;
}

function getManifestationData(work) {
  var specific = [];
  var types = [];
  var i = 0;
  var manifest = work.formattedCollection.briefDisplay.manifestation;
  if (work.formattedCollection.briefDisplay.manifestation instanceof Array) {
    work.formattedCollection.briefDisplay.manifestation = manifest;
  } else {
    work.formattedCollection.briefDisplay.manifestation = [manifest];
  }
  work.collection.object.forEach(function (manifestation) {
    var accessType = work.formattedCollection.briefDisplay.manifestation[i].accessType;
    var type = manifestation.record.type.$value;
    if (types.indexOf(type) === -1) {
      var minorwork = {};
      types.push(type);
      minorwork.type = type;
      minorwork.accessType = accessType;
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
    i++;
  });

  return specific;
}

exports['default'] = Provider.registerTransform({

  events: function events() {
    return ['getOpenSearchWork'];
  },

  getWorkResult: function getWorkResult(request) {
    return _clientsOpenSearchClientJs2['default'].getWorkResult(request);
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
      newWork.general = getWorkData(work);
      newWork.specific = getManifestationData(work);
      data.result = newWork;
    });

    return data;
  }

});
module.exports = exports['default'];