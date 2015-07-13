'use strict';

import * as Provider from '../../Provider.js';
import * as prep from './response-preparation.js';
import OpenSearch from '../../clients/OpenSearch.client.js';

function getWorkData(work) {
  let general = {};
  if (work.collection.numberOfObjects === '1') {
    let record = work.collection.object;
    work.collection.object = [record];
  }
  let primary = work.collection.object[0].record;
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
  }
  if (primary.hasOwnProperty('description')) {
    if (primary.description.hasOwnProperty('attributes')) {
      if (primary.description.attributes['xsi:type'] === 'dkdcplus:series') {
        general.series = primary.description.$value;
      }
    }
  }
  let subjects = [];
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
      let spatial = primary.spatial;
      primary.spatial = [spatial];
    }
    primary.spatial.forEach(function (subject) {
      subjects.push(subject.$value);
    });
  }
  if (primary.hasOwnProperty('temporal')) {
    if (primary.temporal instanceof Array === false) {
      let temporal = primary.temporal;
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
    let tracks = [];
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
  }
  if (primary.hasOwnProperty('contributor')) {
    let actors = [];
    const cont = primary.contributor;
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

  return general;
}

function getManifestationData(work) {
  let specific = [];
  let types = [];
  let i = 0;
  const manifest = work.formattedCollection.briefDisplay.manifestation;
  if (work.formattedCollection.briefDisplay.manifestation instanceof Array) {
    work.formattedCollection.briefDisplay.manifestation = manifest;
  } else {
    work.formattedCollection.briefDisplay.manifestation = [manifest];
  }
  work.collection.object.forEach(function (manifestation) {
    const accessType = work.formattedCollection.briefDisplay.manifestation[i].accessType;
    const type = manifestation.record.type.$value;
    if (types.indexOf(type) === -1) {
      let minorwork = {};
      types.push(type);
      minorwork.type = type;
      minorwork.accessType = accessType;
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
    i++;
  });

  return specific;
}

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
      newWork.general = getWorkData(work);
      newWork.specific = getManifestationData(work);
      data.result = newWork;

    });

    return data;

  }

});
