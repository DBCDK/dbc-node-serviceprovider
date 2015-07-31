'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

function getRecordData(record, element, attribute, attValue) {
  var dataElement = [];

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
  var dataElement = [];
  if (record.hasOwnProperty(element)) {
    record[element].forEach(function (elem) {
      dataElement.push(elem.$value);
    });
  }

  return dataElement;
}

function getWorkData(work) {
  var general = {};
  var primary = work.collection.object[0].record;

  general.title = getRecordData(primary, 'title', 'xsi:type', 'dkdcplus:full')[0];

  var series = getRecordData(primary, 'title', 'xsi:type', 'dkdcplus:series');
  if (series.length > 0) {
    general.series = series;
  } else {
    series = getRecordData(primary, 'description', 'xsi:type', 'dkdcplus:series');
    if (series.length > 0) {
      general.series = series;
    }
  }

  if (primary.hasOwnProperty('creator')) {
    (function () {
      var creators = [];
      primary.creator.forEach(function (creator) {
        if (!creator.hasOwnProperty('attributes')) {
          creators.push(creator.$value);
        } else if (creator.attributes['xsi:type'] !== 'oss:sort') {
          creators.push(creator.$value);
        }
      });
      general.creators = creators;
    })();
  }

  var description = getRecordDataNoAttribute(primary, 'abstract');
  if (description.length > 0) {
    general.description = description;
  } else {
    description = getRecordDataNoAttribute(primary, 'description');
    if (description.length > 0) {
      general.description = description;
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
  var tracks = getRecordData(primary, 'hasPart', 'xsi:type', 'dkdcplus:track');
  if (tracks.length > 0) {
    general.tracks = tracks;
  }
  if (primary.hasOwnProperty('contributor')) {
    (function () {
      var actors = [];
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
          languages.push(language.$value);
        }
      });
      general.languages = languages;
    })();
  }
  if (primary.hasOwnProperty('isPartOf')) {
    (function () {
      var partOf = [];
      var issn = [];
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
    })();
  }

  return general;
}

function getManifestationData(work) {
  var specific = [];
  var types = [];
  var i = 0;
  work.collection.object.forEach(function (manifestation) {
    var accessType = work.formattedCollection.briefDisplay.manifestation[i].accessType;
    var type = manifestation.record.type[0].$value;
    if (types.indexOf(type) === -1) {
      var minorwork = {};
      types.push(type);
      minorwork.type = type;
      minorwork.accessType = accessType;
      var identifiers = [];
      identifiers.push(manifestation.identifier);
      minorwork.identifiers = identifiers;
      var dates = [];
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

function getPublicationData(work) {

  var editions = [];

  work.collection.object.forEach(function (manifestation) {
    var pubDetails = {};
    var record = manifestation.record;
    pubDetails.identifier = manifestation.identifier;
    if (record.hasOwnProperty('type')) {
      (function () {
        var types = [];
        record.type.forEach(function (type) {
          types.push(type.$value);
        });
        pubDetails.types = types;
      })();
    }
    if (record.hasOwnProperty('date')) {
      (function () {
        var dates = [];
        record.date.forEach(function (date) {
          dates.push(date.$value);
        });
        pubDetails.dates = dates;
      })();
    }
    if (record.hasOwnProperty('publisher')) {
      (function () {
        var publishers = [];
        record.publisher.forEach(function (publisher) {
          publishers.push(publisher.$value);
        });
        pubDetails.publishers = publishers;
      })();
    }
    if (record.hasOwnProperty('version')) {
      (function () {
        var edition = [];
        record.version.forEach(function (version) {
          edition.push(version.$value);
        });
        pubDetails.editions = edition;
      })();
    }
    if (record.hasOwnProperty('isPartOf')) {
      (function () {
        var partOf = [];
        var issn = [];
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
      })();
    }
    if (record.hasOwnProperty('extent')) {
      (function () {
        var ext = [];
        record.extent.forEach(function (extent) {
          ext.push(extent.$value);
        });
        pubDetails.extents = ext;
      })();
    }

    editions.push(pubDetails);
  });

  return editions;
}

var WorkTransform = {

  event: function event() {
    return 'getOpenSearchWork';
  },

  getWorkResult: function getWorkResult(request) {
    return this.callServiceClient('opensearch', 'getWorkResult', request);
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
      work = prep.restructureRecords(work);
      newWork.general = getWorkData(work);
      newWork.specific = getManifestationData(work);
      newWork.publications = getPublicationData(work);
      data.result = newWork;
    });

    return data;
  }
};

exports['default'] = WorkTransform;
module.exports = exports['default'];