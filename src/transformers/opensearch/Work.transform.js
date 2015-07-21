'use strict';

import * as prep from './response-preparation.js';

function getRecordData(record, element, attribute, attValue) {
  let dataElement = [];

  if (record.hasOwnProperty(element)) {
    record[element].forEach(function (elem) {
      if (elem.hasOwnProperty('attributes')) {
        if (elem.attributes[attribute] === attValue) {
          dataElement.push(elem.$value);
        }
      }
    });
  }

  return dataElement;
}

function getRecordDataNoAttribute(record, element) {
  let dataElement = [];
  if (record.hasOwnProperty(element)) {
    record[element].forEach(function (elem) {
      dataElement.push(elem.$value);
    });
  }

  return dataElement;
}

function getWorkData(work) {
  let general = {};
  let primary = work.collection.object[0].record;

  general.title = getRecordData(primary, 'title', 'xsi:type', 'dkdcplus:full')[0];

  let series = getRecordData(primary, 'title', 'xsi:type', 'dkdcplus:series');
  if (series.length > 0) {
    general.series = series;
  } else {
    series = getRecordData(primary, 'description', 'xsi:type', 'dkdcplus:series');
    if (series.length > 0) {
      general.series = series;
    }
  }

  if (primary.hasOwnProperty('creator')) {
    let creators = [];
    primary.creator.forEach(function (creator) {
      if (!creator.hasOwnProperty('attributes')) {
        creators.push(creator.$value);
      } else if (creator.attributes['xsi:type'] !== 'oss:sort') {
        creators.push(creator.$value);
      }
    });
    general.creators = creators;
  }

  let description = getRecordDataNoAttribute(primary, 'abstract');
  if (description.length > 0) {
    general.description = description;
  } else {
    description = getRecordDataNoAttribute(primary, 'description');
    if (description.length > 0) {
      general.description = description;
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
  let tracks = getRecordData(primary, 'hasPart', 'xsi:type', 'dkdcplus:track');
  if (tracks.length > 0) {
    general.tracks = tracks;
  }
  if (primary.hasOwnProperty('contributor')) {
    let actors = [];
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
        languages.push(language.$value);
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
  work.collection.object.forEach(function (manifestation) {
    const accessType = work.formattedCollection.briefDisplay.manifestation[i].accessType;
    const type = manifestation.record.type[0].$value;
    if (types.indexOf(type) === -1) {
      let minorwork = {};
      types.push(type);
      minorwork.type = type;
      minorwork.accessType = accessType;
      let identifiers = [];
      identifiers.push(manifestation.identifier);
      minorwork.identifiers = identifiers;
      let dates = [];
      dates.push(manifestation.record.date[0].$value);
      minorwork.dates = dates;
      specific.push(minorwork);
    } else {
      specific.forEach(function (minorwork) {
        if (type === minorwork.type) {
          minorwork.identifiers.push(manifestation.identifier);
          minorwork.dates.push(manifestation.record.date[0].$value);
        }
      });
    }
    i++;
  });

  return specific;
}

const WorkTransform = {

  event() {
    return 'getOpenSearchWork';
  },

  getWorkResult(request) {
    return this.callClient('opensearch', 'getWorkResult', request);
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
      work = prep.restructureRecords(work);
      newWork.general = getWorkData(work);
      newWork.specific = getManifestationData(work);
      data.result = newWork;

    });

    return data;

  }
};

export default WorkTransform;
