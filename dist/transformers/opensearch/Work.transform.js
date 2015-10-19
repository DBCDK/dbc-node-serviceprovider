'use strict';
/**
 * @file
 * Transformation of request to and response from the Opensearch webservice,
 * for presentation of work data.
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var _xpath = require('xpath');

var _xpath2 = _interopRequireDefault(_xpath);

var _xmldom = require('xmldom');

var _xmldom2 = _interopRequireDefault(_xmldom);

/**
 * Transforms a work request data and the resulting work object from Open Search
 *
 * @return {Object}
 */
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

  getXPathSelector: function getXPathSelector(xmlString) {
    // Document
    var doc = new _xmldom2['default'].DOMParser().parseFromString(xmlString);

    // Namespaces in document
    var select = _xpath2['default'].useNamespaces({
      'SOAP-ENV': 'http://schemas.xmlsoap.org/soap/envelope/',
      ac: 'http://biblstandard.dk/ac/namespace/',
      dc: 'http://purl.org/dc/elements/1.1/',
      dcterms: 'http://purl.org/dc/terms/',
      dkabm: 'http://biblstandard.dk/abm/namespace/dkabm/',
      dkdcplus: 'http://biblstandard.dk/abm/namespace/dkdcplus/',
      oss: 'http://oss.dbc.dk/ns/osstypes',
      xsi: 'http://www.w3.org/2001/XMLSchema-instance',
      opensearch: 'http://oss.dbc.dk/ns/opensearch'
    });

    /**
     * @method This method queries the xmldocument
     * @param selector, selecter is the xpath select to be used
     * @param first, first describes if first value is wanted.
     * @param allStrings, returns an array of unique strings matching selector
     */
    return function (selector, first, allStrings) {
      var val = select(selector, doc);
      if (first) {
        return val[0] && val[0].nodeValue ? val[0].nodeValue : '';
      }

      if (allStrings) {
        return val.map(function (node) {
          return node.nodeValue;
        }).filter(function (value, index, self) {
          return self.indexOf(value) === index;
        });
      }

      return val;
    };
  },

  responseTransform: function responseTransform(response) {
    var data = {};
    data.info = {};
    data.error = [];
    data.work = {
      pid: '',
      title: '',
      fullTitle: '',
      alternativeTitle: '',
      creator: '',
      contributers: [],
      abstract: '',
      isbns: [],
      extent: '',
      actors: [],
      series: '',
      subjects: [],
      dk5s: [],
      audience: {
        age: [],
        pegi: '',
        medieraad: '',
        type: ''
      },
      tracks: [],
      languages: [],
      editions: []
    };

    var result = prep.checkResponse(response);

    if (result.hasOwnProperty('errorcode')) {
      data.error.push(result);
      return data;
    }

    data.info.hits = result.hits;
    data.info.collections = result.collections;

    if (result.collections === '0') {
      return data;
    }

    // Function which takes xpath
    var workDOM = this.getXPathSelector(response.raw);

    // Get general work information
    data.work.pid = workDOM('//opensearch:primaryObjectIdentifier/text()', true, false);
    data.work.title = workDOM('//dc:title/text()', true, false);
    data.work.fullTitle = workDOM('//dc:title[@xsi:type="dkdcplus:full"]/text()', true, false);
    data.work.alternativeTitle = workDOM('//dcterms:alternative/text()', true, false);
    data.work.creator = workDOM('//dc:creator[@xsi:type]/text()', true, false);
    data.work.contributers = workDOM('//dc:contributor[@xsi:type!="dkdcplus:act"]/text()', false, true);
    data.work.abstract = workDOM('//dcterms:abstract/text()', true, false);
    data.work.isbns = workDOM('//dc:identifier[@xsi:type="dkdcplus:ISBN"]/text()', false, true);
    data.work.extent = workDOM('//dcterms:extent/text()', true, false);
    data.work.actors = workDOM('//dc:contributor[@xsi:type="dkdcplus:act"]/text()', false, true);
    data.work.series = workDOM('//dc:description[@xsi:type="dkdcplus:series"]/text()', true, false);
    data.work.series = data.work.series.length > 0 ? data.work.series : workDOM('//dc:title[@xsi:type="dkdcplus:series"]/text()', true, false);
    data.work.subjects = workDOM('//dc:subject[@xsi:type="dkdcplus:DBCS"]/text()', false, true);
    data.work.dk5s = workDOM('//dc:subject[@xsi:type="dkdcplus:DK5"]/text()', false, true).map(function (dk5, index) {
      var newIndex = index + 1;
      return {
        text: workDOM('//dc:subject[@xsi:type="dkdcplus:DK5-Text"][' + newIndex + ']/text()', true, false),
        value: dk5
      };
    });
    data.work.audience.type = workDOM('//dcterms:audience/text()', true, false);
    data.work.audience.age = workDOM('//dc:subject[@xsi:type="dkdcplus:DBCN"]/text()', false, true);
    data.work.audience.medieraad = workDOM('//dcterms:audience[@xsi:type="dkdcplus:medieraad"]/text()', true, false);
    data.work.audience.pegi = workDOM('//dcterms:audience[@xsi:type="dkdcplus:pegi"]/text()', true, false);
    data.work.tracks = workDOM('//dcterms:hasPart[@xsi:type="dkdcplus:track"]/text()', false, true);
    data.work.languages = workDOM('//dc:language[not(@xsi:type)]/text()', false, true);

    // Iterate over manifestations, match them to a dkabm record and populate an object
    data.work.editions = workDOM('//opensearch:manifestation', false, false).map(function (manifestation, index) {
      var newIndex = index + 1;
      var edition = {
        accessType: '',
        creator: '',
        date: '',
        edition: '',
        extent: '',
        identifier: '',
        isbns: [],
        link: [],
        publisher: '',
        title: '',
        type: '',
        workType: ''
      };

      edition.accessType = workDOM('//opensearch:manifestation[' + newIndex + ']/opensearch:accessType/text()', true, false);
      edition.creator = workDOM('//opensearch:manifestation[' + newIndex + ']/opensearch:creator/text()', true, false);
      edition.date = workDOM('//opensearch:object[' + newIndex + ']/*/dc:date/text()', true, false);
      edition.edition = workDOM('//opensearch:object[' + newIndex + ']/*/dkdcplus:version/text()', true, false);
      edition.extent = workDOM('//opensearch:object[' + newIndex + ']/*/dcterms:extent/text()', true, false);
      edition.identifier = workDOM('//opensearch:manifestation[' + newIndex + ']/opensearch:identifier/text()', true, false);
      edition.isbns = workDOM('//opensearch:object[' + newIndex + ']/*/dc:identifier[@xsi:type="dkdcplus:ISBN"]/text()', false, true);
      edition.link = workDOM('//opensearch:object[' + newIndex + ']/*/dc:identifier[@xsi:type="dcterms:URI"]/text()', false, true);
      edition.publisher = workDOM('//opensearch:object[' + newIndex + ']/*/dc:publisher/text()', true, false);
      edition.title = workDOM('//opensearch:manifestation[' + newIndex + ']/opensearch:title/text()', true, false);
      edition.type = workDOM('//opensearch:manifestation[' + newIndex + ']/opensearch:type/text()', true, false);
      edition.workType = workDOM('//opensearch:manifestation[' + newIndex + ']/opensearch:workType/text()', true, false);

      return edition;
    });
    data.work.relations = workDOM('//opensearch:collection/opensearch:object/opensearch:relations/opensearch:relation', false, false).map(function (relation, index) {
      var newIndex = index + 1;
      var rel = {
        link: '',
        type: '',
        access: '',
        accessType: '',
        collection: ''
      };
      rel.link = workDOM('//opensearch:object/opensearch:relations/opensearch:relation[' + newIndex + ']/opensearch:relationUri/text()', true, false);
      rel.type = workDOM('//opensearch:object/opensearch:relations/opensearch:relation[' + newIndex + ']/opensearch:relationType/text()', true, false);
      rel.access = workDOM('//opensearch:object/opensearch:relations/opensearch:relation[' + newIndex + ']/opensearch:linkObject/opensearch:access/text()', true, false);
      rel.accessType = workDOM('//opensearch:object/opensearch:relations/opensearch:relation[' + newIndex + ']/opensearch:linkObject/opensearch:accessType/text()', true, false);
      rel.collection = workDOM('//opensearch:object/opensearch:relations/opensearch:relation[' + newIndex + ']/opensearch:linkObject/opensearch:linkCollectionIdentifier/text()', false, true);
      return rel;
    });

    return data;
  }
};

exports['default'] = WorkTransform;
module.exports = exports['default'];