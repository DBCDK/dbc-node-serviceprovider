'use strict';
/**
 * @file
 * Transformation of request to and response from the Opensearch webservice,
 * for presentation of work data.
 */

import * as prep from './response-preparation.js';

/**
 * Extracts data from elements (with attributes) in a record
 *
 * @param {Object} record the record being transformed
 * @param {String} element the name of the element being processed
 * @param {String} attribute the name of the attribute
 * @param {String} attValue the wanted value of the attribute
 * @return {Array}
 */
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

/**
 * Extracts data from elements (without attributes) in a record
 *
 * @param {Object} record the record being transformed
 * @param {String} element the name of the element being processed
 * @return {Array}
 */
function getRecordDataNoAttribute(record, element) {
  let dataElement = [];
  if (record.hasOwnProperty(element)) {
    record[element].forEach(function (elem) {
      dataElement.push(elem.$value);
    });
  }

  return dataElement;
}

/**
 * Extracts series data about the work
 *
 * @param {Object} general the general information of the work
 * @param {Object} primary the primary data from the work being transform
 * @return Null
 */
function getSeries(general, primary) {
  let series = getRecordData(primary, 'title', 'xsi:type', 'dkdcplus:series');
  let link = '';
  if (series.length > 0) {
    link = series[0].replace(/ ; .*/, '');
    link = link.replace(/Samhørende: /, '');
    link = link.replace(/.* del af: /, '');
    general.series = {value: series, search_link: '/search?phrase.titleSeries=' + encodeURIComponent(link)};
  } else {
    series = getRecordData(primary, 'description', 'xsi:type', 'dkdcplus:series');
    if (series.length > 0) {
      link = series[0].replace(/ ; .*/, '');
      link = link.replace(/Samhørende: /, '');
      link = link.replace(/.* del af: /, '');
      general.series = {value: series, search_link: '/search?phrase.titleSeries=' + encodeURIComponent(link)};
    }
  }
}

/**
 * Extracts creator data about the work
 *
 * @param {Object} general the general information of the work
 * @param {Object} primary the primary data from the work being transform
 * @return Null
 */
function getCreators(general, primary) {

  if (primary.hasOwnProperty('creator')) {
    let creators = [];
    primary.creator.forEach(function (creator) {
      if (!creator.hasOwnProperty('attributes')) {
        creators.push({value: creator.$value, search_link: '/search?phrase.creator=' + encodeURIComponent(creator.$value)});
      } else if (creator.attributes['xsi:type'] !== 'oss:sort') {
        creators.push({value: creator.$value, search_link: '/search?phrase.creator=' + encodeURIComponent(creator.$value)});
      }
    });
    general.creators = creators;
  }

  if (primary.hasOwnProperty('contributor')) {
    let actors = [];
    primary.contributor.forEach(function (contributor) {
      if (contributor.hasOwnProperty('attributes')) {
        if (contributor.attributes['xsi:type'] === 'dkdcplus:act') {
          actors.push({value: contributor.$value, search_link: '/search?phrase.creator=' + encodeURIComponent(contributor.$value)});
        }
        if (contributor.attributes['xsi:type'] === 'dkdcplus:prf') {
          actors.push({value: contributor.$value, search_link: '/search?phrase.creator=' + encodeURIComponent(contributor.$value)});
        }
      }
    });
    if (actors.length > 0) {
      general.actors = actors;
    }
  }

}

/**
 * Extracts description data about the work
 *
 * @param {Object} general the general information of the work
 * @param {Object} primary the primary data from the work being transform
 * @return Null
 */
function getDescription(general, primary) {

  let description = getRecordDataNoAttribute(primary, 'abstract');
  if (description.length > 0) {
    general.description = description;
  } else {
    description = getRecordDataNoAttribute(primary, 'description');
    if (description.length > 0) {
      general.description = description;
    }
  }

}

/**
 * Extracts subject data about the work
 *
 * @param {Object} general the general information of the work
 * @param {Object} primary the primary data from the work being transform
 * @return Null
 */
function getSubjects(general, primary) {

  let subjects = [];
  if (primary.hasOwnProperty('subject')) {
    primary.subject.forEach(function (subject) {
      if (subject.hasOwnProperty('attributes')) {
        if (subject.attributes['xsi:type'] === 'dkdcplus:DBCS') {
          subjects.push({value: subject.$value, search_link: '/search?phrase.subject=' + encodeURIComponent(subject.$value)});
        }
        if (subject.attributes['xsi:type'] === 'dkdcplus:DBCF') {
          subjects.push({value: subject.$value, search_link: '/search?phrase.subject=' + encodeURIComponent(subject.$value)});
        }
        if (subject.attributes['xsi:type'] === 'dkdcplus:DBCM') {
          subjects.push({value: subject.$value, search_link: '/search?phrase.subject=' + encodeURIComponent(subject.$value)});
        }
        if (subject.attributes['xsi:type'] === 'dkdcplus:DBCO') {
          subjects.push({value: subject.$value, search_link: '/search?phrase.subject=' + encodeURIComponent(subject.$value)});
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
      subjects.push({value: subject.$value, search_link: '/search?phrase.subject=' + encodeURIComponent(subject.$value)});
    });
  }
  if (primary.hasOwnProperty('temporal')) {
    if (primary.temporal instanceof Array === false) {
      let temporal = primary.temporal;
      primary.temporal = [temporal];
    }
    primary.temporal.forEach(function (subject) {
      subjects.push({value: subject.$value, search_link: '/search?phrase.subject=' + encodeURIComponent(subject.$value)});
    });
  }
  if (subjects.length > 0) {
    general.subjects = subjects;
  }

}

/**
 * Extracts dk5 data about the work
 *
 * @param {Object} general the general information of the work
 * @param {Object} primary the primary data from the work being transform
 * @return Null
 */
function getDk5(general, primary) {

  let dk5s = [];

  let dk5 = getRecordData(primary, 'subject', 'xsi:type', 'dkdcplus:DK5');
  let dk5text = getRecordData(primary, 'subject', 'xsi:type', 'dkdcplus:DK5-Text');
  if (dk5.length > 0) {
    dk5s.push({value: dk5, search_link: '/search?dkcclterm.dk=' + encodeURIComponent(dk5), text: dk5text});
    general.dk5s = dk5s;
  }

}

/**
 * Extracts audience data about the work
 *
 * @param {Object} general the general information of the work
 * @param {Object} primary the primary data from the work being transform
 * @return Null
 */
function getAudience(general, primary) {

  let audience = {};

  let age = getRecordData(primary, 'audience', 'xsi:type', 'dkdcplus:age');
  audience.age = age;
  if (age.length === 0) {
    let ages = getRecordData(primary, 'subject', 'xsi:type', 'dkdcplus:DBCN');
    for (let i = ages.length - 1; i >= 0; i--) {
      if (!ages[i].match(/for \d* år/)) {
        ages.splice(i, 1);
      }
    }
    let no_ages = [];
    for (let i = ages.length - 1; i >= 0; i--) {
      let a = ages[i].replace(/for (\d*) år/, '$1');
      no_ages.push(parseInt(a, 0));
    }
    no_ages.sort(function(a, b) {
      return a - b;
    });
    if (ages.length === 1) {
      audience.age = ages[0];
    } else if (ages.length > 1) {
      audience.age = 'for ' + no_ages[0] + '-' + no_ages[no_ages.length - 1] + ' år';
    }
  }

  let pegi = getRecordData(primary, 'audience', 'xsi:type', 'dkdcplus:pegi');
  audience.pegi = pegi;
  let medieraad = getRecordData(primary, 'audience', 'xsi:type', 'dkdcplus:medieraad');
  audience.medieraad = medieraad;

  general.audience = audience;

}

/**
 * Extracts track data about the work
 *
 * @param {Object} general the general information of the work
 * @param {Object} primary the primary data from the work being transform
 * @return Null
 */
function getTracks(general, primary) {

  let tracks = getRecordData(primary, 'hasPart', 'xsi:type', 'dkdcplus:track');
  if (tracks.length > 0) {
    general.tracks = tracks;
  }

}

/**
 * Extracts language data about the work
 *
 * @param {Object} general the general information of the work
 * @param {Object} primary the primary data from the work being transform
 * @return Null
 */
function getLanguages(general, primary) {

  if (primary.hasOwnProperty('language')) {
    let languages = [];
    primary.language.forEach(function (language) {
      if (!language.hasOwnProperty('attributes')) {
        languages.push(language.$value);
      }
    });
    general.languages = languages;
  }

}

/**
 * Extracts part-of data about the work
 *
 * @param {Object} general the general information of the work
 * @param {Object} primary the primary data from the work being transform
 * @return Null
 */
function getPartOf(general, primary) {

  if (primary.hasOwnProperty('isPartOf')) {
    let partOf = [];
    let issn = [];
    primary.isPartOf.forEach(function (isPartOf) {
      if (!isPartOf.hasOwnProperty('attributes')) {
        partOf.push(isPartOf.$value);
      }
      if (isPartOf.hasOwnProperty('attributes')) {
        if (isPartOf.attributes['xsi:type'] === 'dkdcplus:ISSN') {
          issn.push(isPartOf.$value);
        }
      }
    });
    general.partOf = partOf;
    general.issn = issn;
  }

}

/**
 * Extracts data about the work
 *
 * @param {Object} work the work being transformed.
 * @return {Object}
 */
function getWorkData(work) {
  let general = {};
  let primary = work.collection.object[0].record;

  general.title = getRecordData(primary, 'title', 'xsi:type', 'dkdcplus:full')[0];

  getSeries(general, primary);
  getCreators(general, primary);
  getDescription(general, primary);
  getSubjects(general, primary);
  getDk5(general, primary);
  getAudience(general, primary);
  getTracks(general, primary);
  getLanguages(general, primary);
  getPartOf(general, primary);

  return general;
}

/**
 * Extracts data about each material type in a work
 *
 * @param {Object} work the work being transformed.
 * @return {Object}
 */
function getManifestationData(work) {
  let specific = [];
  let types = [];
  let i = 0;
  work.collection.object.forEach(function (manifestation) {
    const accessType = work.formattedCollection.briefDisplay.manifestation[i].accessType;
    const type = manifestation.record.type[0].$value;
    const title = manifestation.record.title[0].$value;
    if (types.indexOf(type) === -1) {
      let minorwork = {};
      types.push(type);
      minorwork.type = type;
      minorwork.accessType = accessType;
      minorwork.title = title;
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

  specific.forEach(function (s) {
    if (s.accessType === 'physical') {
      let order_link = '/order?ids=' + s.identifiers + '&title=' + encodeURIComponent(s.title) + '&type=' + encodeURIComponent(s.type);
      s.order = order_link;
    }
  });

  return specific;
}

/**
 * Extracts type data about a manifestation
 *
 * @param {Object} pubDetails the specific publication data about the manifestation
 * @param {Object} record the record data
 * @return Null
 */
function getTypes(pubDetails, record) {

  if (record.hasOwnProperty('type')) {
    let types = [];
    record.type.forEach(function (type) {
      types.push(type.$value);
    });
    pubDetails.types = types;
  }

}

/**
 * Extracts date data about a manifestation
 *
 * @param {Object} pubDetails the specific publication data about the manifestation
 * @param {Object} record the record data
 * @return Null
 */
function getDates(pubDetails, record) {

  if (record.hasOwnProperty('date')) {
    let dates = [];
    record.date.forEach(function (date) {
      dates.push(date.$value);
    });
    pubDetails.dates = dates;
  }

}

/**
 * Extracts publisher data about a manifestation
 *
 * @param {Object} pubDetails the specific publication data about the manifestation
 * @param {Object} record the record data
 * @return Null
 */
function getPublishers(pubDetails, record) {

  if (record.hasOwnProperty('publisher')) {
    let publishers = [];
    record.publisher.forEach(function (publisher) {
      publishers.push(publisher.$value);
    });
    pubDetails.publishers = publishers;
  }

}

/**
 * Extracts edition data about a manifestation
 *
 * @param {Object} pubDetails the specific publication data about the manifestation
 * @param {Object} record the record data
 * @return Null
 */
function getEditions(pubDetails, record) {

  if (record.hasOwnProperty('version')) {
    let edition = [];
    record.version.forEach(function (version) {
      edition.push(version.$value);
    });
    pubDetails.editions = edition;
  }

}

/**
 * Extracts part-of data about a manifestation
 *
 * @param {Object} pubDetails the specific publication data about the manifestation
 * @param {Object} record the record data
 * @return Null
 */
function getPartOfData(pubDetails, record) {

  if (record.hasOwnProperty('isPartOf')) {
    let partOf = [];
    let issn = [];
    record.isPartOf.forEach(function (isPartOf) {
      if (!isPartOf.hasOwnProperty('attributes')) {
        partOf.push(isPartOf.$value);
      }
      if (isPartOf.hasOwnProperty('attributes')) {
        if (isPartOf.attributes['xsi:type'] === 'dkdcplus:ISSN') {
          issn.push(isPartOf.$value);
        }
      }
    });
    pubDetails.partOf = partOf;
    pubDetails.issn = issn;
  }
  if (record.hasOwnProperty('extent')) {
    let ext = [];
    record.extent.forEach(function (extent) {
      ext.push(extent.$value);
    });
    pubDetails.extents = ext;
  }

}

/**
 * Extracts identfier data about a manifestation
 *
 * @param {Object} pubDetails the specific publication data about the manifestation
 * @param {Object} record the record data
 * @return Null
 */
function getIdentifiers(pubDetails, record) {

  if (record.hasOwnProperty('identifier')) {
    let isbn = [];
    let uri = [];
    record.identifier.forEach(function (identifier) {
      if (identifier.hasOwnProperty('attributes')) {
        if (identifier.attributes['xsi:type'] === 'dkdcplus:ISBN') {
          isbn.push(identifier.$value);
        }
        if (identifier.attributes['xsi:type'] === 'dcterms:URI') {
          uri.push(identifier.$value);
        }
      }
    });
    pubDetails.isbns = isbn;
    pubDetails.links = uri;
  }
}

/**
 * Extracts data about the specific publications in a work
 *
 * @param {Object} work the work being transformed.
 * @return {Array}
 */
function getPublicationData(work) {

  let editions = [];

  work.collection.object.forEach(function (manifestation) {
    let pubDetails = {};
    const record = manifestation.record;

    pubDetails.identifier = manifestation.identifier;
    getTypes(pubDetails, record);
    getDates(pubDetails, record);
    getPublishers(pubDetails, record);
    getEditions(pubDetails, record);
    getPartOfData(pubDetails, record);
    getIdentifiers(pubDetails, record);

    editions.push(pubDetails);

  });

  return editions;

}

/**
 * Transforms a work request data and the resulting work object from Open Search
 *
 * @return {Object}
 */
const WorkTransform = {

  event() {
    return 'getOpenSearchWork';
  },

  getWorkResult(request) {
    return this.callServiceClient('opensearch', 'getWorkResult', request);
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
      newWork.publications = getPublicationData(work);
      data.result = newWork;

    });

    return data;

  }
};

export default WorkTransform;
