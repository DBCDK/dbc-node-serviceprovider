'use strict';
/*eslint-disable */
import {expect, assert} from 'chai';

const transform = require('../transformers/opensearch/ResultList.transform');
const worktransform = require('../transformers/opensearch/Work.transform');

describe('Test transform of OpenSearch responses', () => {
  it('Check one hit', function () {

    let response = {
      'result': {
        'hitCount': '1',
        'collectionCount': '1',
        'more': 'false',
        'sortUsed': 'rank_subject',
        'searchResult': {
          'collection': {
            'resultPosition': '1',
            'numberOfObjects': '1',
            'object': {
              'identifier': '870970-basis:27036031',
              'recordStatus': 'active',
              'creationDate': '2007-11-26',
              'formatsAvailable': {'format': ['dkabm', 'marcxchange']}
            }
          },
          'formattedCollection': {
            'briefDisplay': {
              'manifestation': {
                'accessType': 'physical',
                'fedoraPid': '870970-basis:27036031',
                'identifier': '870970-basis:27036031',
                'title': 'Harry Potter og Fønixordenen',
                'titleFull': 'Harry Potter og Fønixordenen',
                'type': 'Playstation 2',
                'workType': 'game'
              }
            }
          }
        },
        'facetResult': {},
        'statInfo': {
          'fedoraRecordsCached': '4',
          'fedoraRecordsRead': '1',
          'time': '0.205224',
          'trackingId': 'os:2015-06-15T11:47:46:535154:6359'
        }
      }
    };

    assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({
      'result': [{
        'identifiers': ['870970-basis:27036031'],
        'title': 'Harry Potter og Fønixordenen',
        'workType': 'game'
      }], 'info': {'hits': '1', 'collections': '1', 'more': 'false'}, 'error': []
    }), 'One hit in search result');

  });
  it('Check more hits', function () {

    let response = {
      'result': {
        'hitCount': '2',
        'collectionCount': '2',
        'more': 'false',
        'sortUsed': 'rank_subject',
        'searchResult': [{
          'collection': {
            'resultPosition': '1',
            'numberOfObjects': '1',
            'object': {
              'identifier': '870970-basis:27036031',
              'recordStatus': 'active',
              'creationDate': '2007-11-26',
              'formatsAvailable': {'format': ['dkabm', 'marcxchange']}
            }
          },
          'formattedCollection': {
            'briefDisplay': {
              'manifestation': {
                'accessType': 'physical',
                'fedoraPid': '870970-basis:27036031',
                'identifier': '870970-basis:27036031',
                'title': 'Harry Potter og Fønixordenen',
                'titleFull': 'Harry Potter og Fønixordenen',
                'type': 'Playstation 2',
                'workType': 'game'
              }
            }
          }
        }, {
          'collection': {
            'resultPosition': '2',
            'numberOfObjects': '1',
            'object': {
              'identifier': '870970-basis:29317038',
              'recordStatus': 'active',
              'creationDate': '2012-04-03',
              'formatsAvailable': {'format': ['dkabm', 'marcxchange']}
            }
          },
          'formattedCollection': {
            'briefDisplay': {
              'manifestation': {
                'accessType': 'physical',
                'creator': 'Joanne K. Rowling',
                'fedoraPid': '870970-basis:29317038',
                'identifier': '870970-basis:29317038',
                'language': 'Dansk',
                'title': 'Harry Potter og De Vises Sten',
                'titleFull': 'Harry Potter og De Vises Sten',
                'type': 'Bog',
                'workType': 'book'
              }
            }
          }
        }],
        'facetResult': {},
        'statInfo': {
          'fedoraRecordsCached': '3',
          'fedoraRecordsRead': '7',
          'time': '1.831044',
          'trackingId': 'os:2015-06-15T12:48:15:288498:31926'
        }
      }
    };

    assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({
      "result": [{
        "identifiers": ["870970-basis:27036031"],
        "title": "Harry Potter og Fønixordenen",
        "workType": "game"
      }, {
        "identifiers": ["870970-basis:29317038"],
        "title": "Harry Potter og De Vises Sten",
        "creator": "Joanne K. Rowling",
        "workType": "book"
      }], "info": {"hits": "2", "collections": "2", "more": "false"}, "error": []
    }), 'More hits in search result');

  });
  it('Check more hits one work', function () {

    let response = {
      'result': {
        'hitCount': '2',
        'collectionCount': '1',
        'more': 'false',
        'sortUsed': 'rank_subject',
        'searchResult': {
          'collection': {
            'resultPosition': '1',
            'numberOfObjects': '2',
            'object': [{
              'identifier': '870970-basis:22252852',
              'recordStatus': 'active',
              'creationDate': '2005-03-01',
              'formatsAvailable': {'format': ['dkabm', 'marcxchange']}
            }, {
              'identifier': '870970-basis:29317038',
              'recordStatus': 'active',
              'creationDate': '2012-04-03',
              'formatsAvailable': {'format': ['dkabm', 'marcxchange']}
            }]
          },
          'formattedCollection': {
            'briefDisplay': {
              'manifestation': [{
                'accessType': 'physical',
                'creator': 'Joanne K. Rowling',
                'fedoraPid': '870970-basis:22252852',
                'identifier': '870970-basis:22252852',
                'language': 'Dansk',
                'title': 'Harry Potter og De Vises Sten',
                'titleFull': 'Harry Potter og De Vises Sten',
                'type': 'Bog',
                'workType': 'book'
              }, {
                'accessType': 'physical',
                'creator': 'Joanne K. Rowling',
                'fedoraPid': '870970-basis:29317038',
                'identifier': '870970-basis:29317038',
                'language': 'Dansk',
                'title': 'Harry Potter og De Vises Sten',
                'titleFull': 'Harry Potter og De Vises Sten',
                'type': 'Bog',
                'workType': 'book'
              }]
            }
          }
        },
        'facetResult': {},
        'statInfo': {
          'fedoraRecordsCached': '8',
          'fedoraRecordsRead': '0',
          'time': '0.307299',
          'trackingId': 'os:2015-06-15T12:50:59:869318:31926'
        }
      }
    };

    assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({
      "result": [{
        "identifiers": ["870970-basis:22252852", "870970-basis:29317038"],
        "title": "Harry Potter og De Vises Sten",
        "creator": "Joanne K. Rowling",
        "workType": "book"
      }], "info": {"hits": "2", "collections": "1", "more": "false"}, "error": []
    }), 'More hits in one work collection');

  });
  it('Check no hits', function () {

    let response = {
      'result': {
        'hitCount': '0',
        'collectionCount': '0',
        'more': 'false',
        'sortUsed': 'rank_main_title',
        'facetResult': {},
        'statInfo': {
          'fedoraRecordsCached': '0',
          'fedoraRecordsRead': '0',
          'time': '0.181227',
          'trackingId': 'os:2015-06-15T12:53:41:207552:6791'
        }
      }
    };
    assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({
      'result': [],
      'info': {'hits': '0', 'collections': '0', 'more': 'false'},
      'error': []
    }), 'No records found');

  });
  it('Check authentication error', function () {

    let response = {'error': 'authentication_error'};

    assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({
      'result': [],
      'info': {},
      'error': [{'errorcode': 1, 'errormessage': 'Authentication error', 'serviceerror': 'authentication_error'}]
    }), 'Authentication error');

  });

});

describe('Test transform of OpenSearch Work responses', () => {
  it('Eight manifestations in a work', function () {

    let response = {
      'result': {
        'hitCount': '1',
        'collectionCount': '1',
        'more': 'false',
        'sortUsed': 'date_descending',
        'searchResult': {
          "collection": {
            "resultPosition": "1",
            "numberOfObjects": "8",
            "object": [{
              "record": {
                "identifier": ["22629344|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "87-00-39836-5"
                }, {"attributes": {"xsi:type": "dkdcplus:ISBN"}, "$value": "9788700398368"}],
                "source": ["Bibliotekskatalog", "Harry Potter and the philosopher's stone"],
                "title": ["Harry Potter og De Vises Sten", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Harry Potter og De Vises Sten"
                }],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Joanne K. Rowling"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Rowling, Joanne K."}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 12 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 13 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 14 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 15 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 16 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "magi"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "troldmænd"}],
                "abstract": "Fantasy. Den 11-årige forældreløse dreng Harry Potter bliver adopteret af sin onkel og tante som ikke bryder sig om ham. Han har trolddomsblod i årerne og bliver optaget på en skole for trolddomskyndige. Her får han nye venner og fjender",
                "description": {
                  "attributes": {"xsi:type": "dkdcplus:series"},
                  "$value": "Samhørende: Harry Potter og De Vises Sten ; Harry Potter og Hemmelighedernes Kammer ; Harry Potter og fangen fra Azkaban ; Harry Potter og Flammernes Pokal ; Harry Potter og Fønixordenen ; Harry Potter og halvblodsprinsen ; Harry Potter og dødsregalierne"
                },
                "audience": "børnematerialer",
                "version": "2. udgave",
                "publisher": "Gyldendal",
                "date": "1999",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Bog"},
                "extent": "303 sider",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:22629344",
              "recordStatus": "active",
              "creationDate": "2005-03-02",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["22252852|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "87-00-34654-3"
                }],
                "source": ["Bibliotekskatalog", "Harry Potter and the philosopher's stone"],
                "title": ["Harry Potter og De Vises Sten", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Harry Potter og De Vises Sten"
                }],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Joanne K. Rowling"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Rowling, Joanne K."}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 11 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 12 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 13 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "magi"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "troldmænd"}],
                "abstract": "Fantasy. Den 11-årige forældreløse dreng Harry Potter bliver adopteret af sin onkel og tante som ikke bryder sig om ham. Han har trolddomsblod i årerne og bliver optaget på en skole for trolddomskyndige. Her får han nye venner og fjender",
                "description": {
                  "attributes": {"xsi:type": "dkdcplus:series"},
                  "$value": "Samhørende: Harry Potter og De Vises Sten ; Harry Potter og Hemmelighedernes Kammer ; Harry Potter og fangen fra Azkaban ; Harry Potter og Flammernes Pokal ; Harry Potter og Fønixordenen ; Harry Potter og halvblodsprinsen ; Harry Potter og dødsregalierne"
                },
                "audience": "børnematerialer",
                "publisher": "Gyldendal",
                "date": "1998",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Bog"},
                "extent": "303 sider",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:22252852",
              "recordStatus": "active",
              "creationDate": "2005-03-01",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["29317038|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "9788702113990"
                }],
                "source": ["Bibliotekskatalog", "Harry Potter and the philosopher's stone"],
                "title": ["Harry Potter og De Vises Sten", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Harry Potter og De Vises Sten"
                }],
                "alternative": "Harry Potter og De Vises Sten",
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Joanne K. Rowling"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Rowling, Joanne K."}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 11 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 12 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 13 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 14 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 15 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 16 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "magi"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "troldmænd"}],
                "abstract": "Fantasy. Den 11-årige forældreløse dreng Harry Potter bliver adopteret af sin onkel og tante som ikke bryder sig om ham. Han har trolddomsblod i årerne og bliver optaget på en skole for trolddomskyndige. Her får han nye venner og fjender",
                "description": {
                  "attributes": {"xsi:type": "dkdcplus:series"},
                  "$value": "Samhørende: Harry Potter og De Vises Sten ; Harry Potter og Hemmelighedernes Kammer ; Harry Potter og fangen fra Azkaban ; Harry Potter og Flammernes Pokal ; Harry Potter og Fønixordenen ; Harry Potter og halvblodsprinsen ; Harry Potter og dødsregalierne"
                },
                "audience": "børnematerialer",
                "version": "5. udgave",
                "publisher": "Gyldendal",
                "contributor": {"attributes": {"xsi:type": "dkdcplus:trl"}, "$value": "Hanna Lützen"},
                "date": "2012",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Bog"},
                "extent": "303 sider",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:29317038",
              "recordStatus": "active",
              "creationDate": "2012-04-03",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["25194853|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "87-02-02769-0"
                }],
                "source": ["Bibliotekskatalog", "Harry Potter and the philosopher's stone"],
                "title": ["Harry Potter og De Vises Sten", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Harry Potter og De Vises Sten"
                }],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Joanne K. Rowling"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Rowling, Joanne K."}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 11 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 12 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 13 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "magi"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "troldmænd"}],
                "abstract": "Fantasy. Den 11-årige forældreløse dreng Harry Potter bliver adopteret af sin onkel og tante som ikke bryder sig om ham. Han har trolddomsblod i årerne og bliver optaget på en skole for trolddomskyndige. Her får han nye venner og fjender",
                "description": {
                  "attributes": {"xsi:type": "dkdcplus:series"},
                  "$value": "Samhørende: Harry Potter og De Vises Sten ; Harry Potter og Hemmelighedernes Kammer ; Harry Potter og fangen fra Azkaban ; Harry Potter og Flammernes Pokal ; Harry Potter og Fønixordenen ; Harry Potter og halvblodsprinsen ; Harry Potter og dødsregalierne"
                },
                "audience": "børnematerialer",
                "version": "3. udgave",
                "publisher": "Gyldendal",
                "date": "2004",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Bog"},
                "extent": "303 sider",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:25194853",
              "recordStatus": "active",
              "creationDate": "2005-03-02",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["24168638|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "87-02-01276-6"
                }],
                "source": ["Bibliotekskatalog", "Harry Potter and the philosopher's stone"],
                "title": ["Harry Potter og De Vises Sten", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Harry Potter og De Vises Sten (Ved Jesper Christensen)"
                }],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Joanne K. Rowling"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Rowling, Joanne K."}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "eventyrlige fortællinger"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 10 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 11 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 9 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "magi"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "troldmænd"}],
                "abstract": "Den 11-årige forældreløse dreng Harry Potter bliver adopteret af sin onkel og tante som ikke bryder sig om ham. Han har trolddomsblod i årerne og bliver optaget på en skole for trolddomskyndige. Her får han nye venner og fjender",
                "description": {
                  "attributes": {"xsi:type": "dkdcplus:series"},
                  "$value": "Samhørende: Harry Potter og De Vises Sten ; Harry Potter og Hemmelighedernes Kammer ; Harry Potter og fangen fra Azkaban ; Harry Potter og Flammernes Pokal ; Harry Potter og Fønixordenen ; Harry Potter og halvblodsprinsen ; Harry Potter og dødsregalierne"
                },
                "audience": "børnematerialer",
                "publisher": "Gyldendal",
                "contributor": ["Jesper Christensen (f. 1948)", {
                  "attributes": {"xsi:type": "dkdcplus:dkind"},
                  "$value": "Jesper Christensen"
                }],
                "date": "2002",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Lydbog (cd)"},
                "format": "8 cd'er",
                "extent": "9 t., 40 min.",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:24168638",
              "recordStatus": "active",
              "creationDate": "2005-03-01",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["23195151|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "87-605-7377-5"
                }],
                "source": ["Bibliotekskatalog", "Harry Potter and the philosopher's stone"],
                "title": ["Harry Potter og De Vises Sten", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Harry Potter og De Vises Sten (Ved Henrik Emmer)"
                }],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Joanne K. Rowling"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Rowling, Joanne K."}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "eventyrlige fortællinger"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 10 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 11 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 9 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "magi"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "troldmænd"}],
                "abstract": "Den 11-årige forældreløse dreng Harry Potter bliver adopteret af sin onkel og tante som ikke bryder sig om ham. Han har trolddomsblod i årerne og bliver optaget på en skole for trolddomskyndige. Her får han nye venner og fjender",
                "description": {
                  "attributes": {"xsi:type": "dkdcplus:series"},
                  "$value": "Samhørende: Harry Potter og De Vises Sten ; Harry Potter og Hemmelighedernes Kammer ; Harry Potter og fangen fra Azkaban"
                },
                "audience": "børnematerialer",
                "publisher": "Gyldendal Lydbøger",
                "contributor": {"attributes": {"xsi:type": "dkdcplus:dkind"}, "$value": "Henrik Emmer"},
                "date": "2000",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Lydbog (cd)"},
                "format": "9 cd'er i 1 mappe",
                "extent": "10 t., 25 min.",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:23195151",
              "recordStatus": "active",
              "creationDate": "2005-03-01",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["27638708|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "9788702075380"
                }],
                "source": ["Bibliotekskatalog", "Harry Potter and the philosopher's stone"],
                "title": ["Harry Potter og De Vises Sten", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Harry Potter og De Vises Sten (Ved Jesper Christensen, mp3)"
                }],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Joanne K. Rowling"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Rowling, Joanne K."}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "eventyrlige fortællinger"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 10 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 11 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 9 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "magi"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "troldmænd"}],
                "abstract": "Den 11-årige forældreløse dreng Harry Potter bliver adopteret af sin onkel og tante som ikke bryder sig om ham. Han har trolddomsblod i årerne og bliver optaget på en skole for trolddomskyndige. Her får han nye venner og fjender",
                "description": {
                  "attributes": {"xsi:type": "dkdcplus:series"},
                  "$value": "Samhørende: Harry Potter og De Vises Sten ; Harry Potter og Hemmelighedernes Kammer ; Harry Potter og fangen fra Azkaban ; Harry Potter og Flammernes Pokal ; Harry Potter og Fønixordenen ; Harry Potter og halvblodsprinsen ; Harry Potter og dødsregalierne"
                },
                "audience": "børnematerialer",
                "publisher": "Gyldendal Lyd",
                "contributor": ["Jesper Christensen (f. 1948)", {
                  "attributes": {"xsi:type": "dkdcplus:dkind"},
                  "$value": "Jesper Christensen"
                }],
                "date": "2009",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Lydbog (cd-mp3)"},
                "format": "1 cd i 1 mappe, mp3",
                "extent": "9 t., 40 min.",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:27638708",
              "recordStatus": "active",
              "creationDate": "2009-02-24",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["22513354|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "87-605-8571-4"
                }],
                "source": ["Bibliotekskatalog", "Harry Potter and the philosopher's stone"],
                "title": ["Harry Potter og De Vises Sten", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Harry Potter og De Vises Sten"
                }],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Joanne K. Rowling"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Rowling, Joanne K."}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "eventyrlige fortællinger"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 10 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 11 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 9 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "magi"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "troldmænd"}],
                "abstract": "Den 11-årige forældreløse dreng Harry Potter bliver adopteret af sin onkel og tante som ikke bryder sig om ham. Han har trolddomsblod i årerne og bliver optaget på en skole for trolddomskyndige. Her får han nye venner og fjender",
                "description": {
                  "attributes": {"xsi:type": "dkdcplus:series"},
                  "$value": "Samhørende: Harry Potter og De Vises Sten ; Harry Potter og Hemmelighedernes Kammer ; Harry Potter og fangen fra Azkaban"
                },
                "audience": "børnematerialer",
                "publisher": "Gyldendal Lydbøger",
                "contributor": {"attributes": {"xsi:type": "dkdcplus:dkind"}, "$value": "Henrik Emmer"},
                "date": "1999",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Lydbog (bånd)"},
                "format": "8  kassettebånd i 1 mappe",
                "extent": "10 t., 27 min.",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:22513354",
              "recordStatus": "active",
              "creationDate": "2005-03-01",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }]
          },
          "formattedCollection": {
            "briefDisplay": {
              "manifestation": [{
                "accessType": "physical",
                "creator": "Joanne K. Rowling",
                "fedoraPid": "870970-basis:22629344",
                "identifier": "870970-basis:22629344",
                "language": "Dansk",
                "title": "Harry Potter og De Vises Sten",
                "titleFull": "Harry Potter og De Vises Sten",
                "type": "Bog",
                "workType": "book"
              }, {
                "accessType": "physical",
                "creator": "Joanne K. Rowling",
                "fedoraPid": "870970-basis:22252852",
                "identifier": "870970-basis:22252852",
                "language": "Dansk",
                "title": "Harry Potter og De Vises Sten",
                "titleFull": "Harry Potter og De Vises Sten",
                "type": "Bog",
                "workType": "book"
              }, {
                "accessType": "physical",
                "creator": "Joanne K. Rowling",
                "fedoraPid": "870970-basis:29317038",
                "identifier": "870970-basis:29317038",
                "language": "Dansk",
                "title": "Harry Potter og De Vises Sten",
                "titleFull": "Harry Potter og De Vises Sten",
                "type": "Bog",
                "workType": "book"
              }, {
                "accessType": "physical",
                "creator": "Joanne K. Rowling",
                "fedoraPid": "870970-basis:25194853",
                "identifier": "870970-basis:25194853",
                "language": "Dansk",
                "title": "Harry Potter og De Vises Sten",
                "titleFull": "Harry Potter og De Vises Sten",
                "type": "Bog",
                "workType": "book"
              }, {
                "accessType": "physical",
                "creator": "Jesper Christensen (f. 1948)",
                "fedoraPid": "870970-basis:24168638",
                "identifier": "870970-basis:24168638",
                "language": "Dansk",
                "title": "Harry Potter og De Vises Sten",
                "titleFull": "Harry Potter og De Vises Sten",
                "type": "Lydbog (cd)",
                "workType": "audiobook"
              }, {
                "accessType": "physical",
                "creator": "Joanne K. Rowling",
                "fedoraPid": "870970-basis:23195151",
                "identifier": "870970-basis:23195151",
                "language": "Dansk",
                "title": "Harry Potter og De Vises Sten",
                "titleFull": "Harry Potter og De Vises Sten",
                "type": "Lydbog (cd)",
                "workType": "audiobook"
              }, {
                "accessType": "physical",
                "creator": "Jesper Christensen (f. 1948)",
                "fedoraPid": "870970-basis:27638708",
                "identifier": "870970-basis:27638708",
                "language": "Dansk",
                "title": "Harry Potter og De Vises Sten",
                "titleFull": "Harry Potter og De Vises Sten",
                "type": "Lydbog (cd-mp3)",
                "workType": "audiobook"
              }, {
                "accessType": "physical",
                "creator": "Joanne K. Rowling",
                "fedoraPid": "870970-basis:22513354",
                "identifier": "870970-basis:22513354",
                "language": "Dansk",
                "title": "Harry Potter og De Vises Sten",
                "titleFull": "Harry Potter og De Vises Sten",
                "type": "Lydbog (bånd)",
                "workType": "audiobook"
              }]
            }
          }
        }
      }
    };

    assert.equal(JSON.stringify(worktransform.responseTransform(response)), JSON.stringify({
      "result": {
        "general": {
          "title": "Harry Potter og De Vises Sten",
          "series": {
            "value": ["Samhørende: Harry Potter og De Vises Sten ; Harry Potter og Hemmelighedernes Kammer ; Harry Potter og fangen fra Azkaban ; Harry Potter og Flammernes Pokal ; Harry Potter og Fønixordenen ; Harry Potter og halvblodsprinsen ; Harry Potter og dødsregalierne"],
            "search_link": "/search?phrase.titleSeries=Harry%20Potter%20og%20De%20Vises%20Sten"
          },
          "creators": [{"value": "Joanne K. Rowling", "search_link": "/search?phrase.creator=Joanne%20K.%20Rowling"}],
          "description": ["Fantasy. Den 11-årige forældreløse dreng Harry Potter bliver adopteret af sin onkel og tante som ikke bryder sig om ham. Han har trolddomsblod i årerne og bliver optaget på en skole for trolddomskyndige. Her får han nye venner og fjender"],
          "subjects": [{"value": "fantasy", "search_link": "/search?phrase.subject=fantasy"}, {
            "value": "magi",
            "search_link": "/search?phrase.subject=magi"
          }, {"value": "troldmænd", "search_link": "/search?phrase.subject=troldm%C3%A6nd"}],
          "dk5s": [{"value": ["sk"], "search_link": "/search?dkcclterm.dk=sk", "text": ["Skønlitteratur"]}],
          "languages": ["Dansk"]
        },
        "specific": [{
          "type": "Bog",
          "accessType": "physical",
          "identifiers": ["870970-basis:22629344", "870970-basis:22252852", "870970-basis:29317038", "870970-basis:25194853"],
          "dates": ["1999", "1998", "2012", "2004"]
        }, {
          "type": "Lydbog (cd)",
          "accessType": "physical",
          "identifiers": ["870970-basis:24168638", "870970-basis:23195151"],
          "dates": ["2002", "2000"]
        }, {
          "type": "Lydbog (cd-mp3)",
          "accessType": "physical",
          "identifiers": ["870970-basis:27638708"],
          "dates": ["2009"]
        }, {
          "type": "Lydbog (bånd)",
          "accessType": "physical",
          "identifiers": ["870970-basis:22513354"],
          "dates": ["1999"]
        }],
        "publications": [{
          "identifier": "870970-basis:22629344",
          "types": ["Bog"],
          "dates": ["1999"],
          "publishers": ["Gyldendal"],
          "editions": ["2. udgave"],
          "extents": ["303 sider"],
          "isbns": ["87-00-39836-5", "9788700398368"],
          "links": []
        }, {
          "identifier": "870970-basis:22252852",
          "types": ["Bog"],
          "dates": ["1998"],
          "publishers": ["Gyldendal"],
          "extents": ["303 sider"],
          "isbns": ["87-00-34654-3"],
          "links": []
        }, {
          "identifier": "870970-basis:29317038",
          "types": ["Bog"],
          "dates": ["2012"],
          "publishers": ["Gyldendal"],
          "editions": ["5. udgave"],
          "extents": ["303 sider"],
          "isbns": ["9788702113990"],
          "links": []
        }, {
          "identifier": "870970-basis:25194853",
          "types": ["Bog"],
          "dates": ["2004"],
          "publishers": ["Gyldendal"],
          "editions": ["3. udgave"],
          "extents": ["303 sider"],
          "isbns": ["87-02-02769-0"],
          "links": []
        }, {
          "identifier": "870970-basis:24168638",
          "types": ["Lydbog (cd)"],
          "dates": ["2002"],
          "publishers": ["Gyldendal"],
          "extents": ["9 t., 40 min."],
          "isbns": ["87-02-01276-6"],
          "links": []
        }, {
          "identifier": "870970-basis:23195151",
          "types": ["Lydbog (cd)"],
          "dates": ["2000"],
          "publishers": ["Gyldendal Lydbøger"],
          "extents": ["10 t., 25 min."],
          "isbns": ["87-605-7377-5"],
          "links": []
        }, {
          "identifier": "870970-basis:27638708",
          "types": ["Lydbog (cd-mp3)"],
          "dates": ["2009"],
          "publishers": ["Gyldendal Lyd"],
          "extents": ["9 t., 40 min."],
          "isbns": ["9788702075380"],
          "links": []
        }, {
          "identifier": "870970-basis:22513354",
          "types": ["Lydbog (bånd)"],
          "dates": ["1999"],
          "publishers": ["Gyldendal Lydbøger"],
          "extents": ["10 t., 27 min."],
          "isbns": ["87-605-8571-4"],
          "links": []
        }]
      }, "info": {"hits": "1", "collections": "1"}, "error": []
    }), '8 manifestations in work');

  });

  it('Get tracks', function () {

    let response = {
      "result": {
        "hitCount": "1",
        "collectionCount": "1",
        "more": "false",
        "searchResult": {
          "collection": {
            "resultPosition": "1",
            "numberOfObjects": "1",
            "object": {
              "record": {
                "identifier": ["29572801|870970", "Peaceville CDVILEF 406 X"],
                "source": "Bibliotekskatalog",
                "title": ["A map of all our failures", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "A map of all our failures"
                }],
                "creator": ["My Dying Bride", {"attributes": {"xsi:type": "oss:sort"}, "$value": "My Dying Bride"}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "78.794:5"
                }, "My Dying Bride", {
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Rock (Beat). Moderne folkemusik (Folk)"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "dokumentarfilm"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCM"},
                  "$value": "doom metal"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "goth"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCM"},
                  "$value": "gothic rock"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCM"},
                  "$value": "heavy metal"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "metal"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "musikdokumentar"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCO"},
                  "$value": "musikdokumentarer"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCM"},
                  "$value": "rock"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "rock"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCM"}, "$value": "vokal"}],
                "shelf": {"attributes": {"xsi:type": "oss:musicshelf"}, "$value": "Rock"},
                "description": ["Indspillet i Manchester, England april-juli 2012 (cd) og januar 2010-juli 2012 (dvd)", "Tekster på omslag", "Af indholdet (dvd): dokumentarfilm"],
                "audience": "voksenmaterialer",
                "publisher": "Peaceville Records",
                "contributor": ["Lena Abé", "Andrew Craighan", "Hamish Glencross", "Shane MacGowan", "Aaron Stainthorpe", "Shaun Taylor-Steels"],
                "date": "2012",
                "type": [{
                  "attributes": {"xsi:type": "dkdcplus:BibDK-Type"},
                  "$value": "Cd (musik)"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:BibDK-Type"},
                  "$value": "Dvd"
                }, {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Sammensat materiale"}],
                "format": "1 cd, 1 dvd-video",
                "extent": "ca. 70 min.",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "eng"}, "Engelsk"],
                "hasPart": [{
                  "attributes": {"xsi:type": "dkdcplus:track"},
                  "$value": "Kneel til doomsday"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:track"},
                  "$value": "The poorest waltz"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:track"},
                  "$value": "A tapestry scorned"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:track"},
                  "$value": "Like a perpetual funeral"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:track"},
                  "$value": "A map of all our failures"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:track"},
                  "$value": "Hail Odysseus"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:track"},
                  "$value": "Within the presence of absence"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:track"},
                  "$value": "Abandoned as Christ"
                }, {"attributes": {"xsi:type": "dkdcplus:track"}, "$value": "My faults are your reward"}],
                "spatial": {"attributes": {"xsi:type": "dkdcplus:DBCM"}, "$value": "England"},
                "temporal": {"attributes": {"xsi:type": "dkdcplus:DBCM"}, "$value": "2010-2019"}
              },
              "identifier": "870970-basis:29572801",
              "recordStatus": "active",
              "creationDate": "2012-09-24",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }
          },
          "formattedCollection": {
            "briefDisplay": {
              "manifestation": {
                "accessType": "physical",
                "creator": "My Dying Bride",
                "fedoraPid": "870970-basis:29572801",
                "identifier": "870970-basis:29572801",
                "title": "A map of all our failures",
                "titleFull": "A map of all our failures",
                "type": "Cd (musik)",
                "workType": "music"
              }
            }
          }
        },
        "facetResult": {},
        "statInfo": {
          "fedoraRecordsCached": "1",
          "fedoraRecordsRead": "4",
          "time": "0.210153",
          "trackingId": "os:2015-07-13T12:39:56:524870:21628"
        }
      }
    };

    assert.equal(JSON.stringify(worktransform.responseTransform(response)), JSON.stringify({
      "result": {
        "general": {
          "title": "A map of all our failures",
          "creators": [{"value": "My Dying Bride", "search_link": "/search?phrase.creator=My%20Dying%20Bride"}],
          "description": ["Indspillet i Manchester, England april-juli 2012 (cd) og januar 2010-juli 2012 (dvd)", "Tekster på omslag", "Af indholdet (dvd): dokumentarfilm"],
          "subjects": [{
            "value": "doom metal",
            "search_link": "/search?phrase.subject=doom%20metal"
          }, {"value": "gothic rock", "search_link": "/search?phrase.subject=gothic%20rock"}, {
            "value": "heavy metal",
            "search_link": "/search?phrase.subject=heavy%20metal"
          }, {"value": "musikdokumentarer", "search_link": "/search?phrase.subject=musikdokumentarer"}, {
            "value": "rock",
            "search_link": "/search?phrase.subject=rock"
          }, {"value": "vokal", "search_link": "/search?phrase.subject=vokal"}, {
            "value": "England",
            "search_link": "/search?phrase.subject=England"
          }, {"value": "2010-2019", "search_link": "/search?phrase.subject=2010-2019"}],
          "dk5s": [{
            "value": ["78.794:5"],
            "search_link": "/search?dkcclterm.dk=78.794%3A5",
            "text": ["Rock (Beat). Moderne folkemusik (Folk)"]
          }],
          "tracks": ["Kneel til doomsday", "The poorest waltz", "A tapestry scorned", "Like a perpetual funeral", "A map of all our failures", "Hail Odysseus", "Within the presence of absence", "Abandoned as Christ", "My faults are your reward"],
          "languages": ["Engelsk"]
        },
        "specific": [{
          "type": "Cd (musik)",
          "accessType": "physical",
          "identifiers": ["870970-basis:29572801"],
          "dates": ["2012"]
        }],
        "publications": [{
          "identifier": "870970-basis:29572801",
          "types": ["Cd (musik)", "Dvd", "Sammensat materiale"],
          "dates": ["2012"],
          "publishers": ["Peaceville Records"],
          "extents": ["ca. 70 min."],
          "isbns": [],
          "links": []
        }]
      }, "info": {"hits": "1", "collections": "1"}, "error": []
    }), 'Music has tracks');

  });

  it('Movie', function () {

    let response = {
      "result": {
        "hitCount": "1",
        "collectionCount": "1",
        "more": "false",
        "searchResult": {
          "collection": {
            "resultPosition": "1",
            "numberOfObjects": "2",
            "object": [{
              "record": {
                "identifier": "26593123|870970",
                "source": "Bibliotekskatalog",
                "title": ["Sandtrolden", {"attributes": {"xsi:type": "dkdcplus:full"}, "$value": "Sandtrolden"}],
                "alternative": ["Five children and It", "5 children and It"],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:drt"},
                  "$value": "John Stephenson (instruktør)"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Stephenson, John"}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "77.74"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Børnefilm"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "børn"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "børnefilm"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "trolde"}],
                "abstract": "Fem børn møder Sandtrolden, som er en selvoptaget og lettere krakilsk herre, men kan dog som enhver trold opfylde ønsker. Men børnenes ønsker bringer dem hver gang i store vanskeligheder, for Sandtrolden er også en udspekuleret filur",
                "description": ["Danske stemmer Niels Olsen, Lars Mikkelsen, Anette Støvelbæk, Puk Scharbau, Thomas Mørk ... et al.", "Originalfilmen: Storbritannien : UK Film Council ; S.l. : Davis Films, 2004", "Af indholdet: Trailere"],
                "audience": [{
                  "attributes": {"xsi:type": "dkdcplus:medieraad"},
                  "$value": "Mærkning: Tilladt for alle men frarådes børn under 7 år"
                }, {"attributes": {"xsi:type": "dkdcplus:age"}, "$value": "Fra 9 år"}, "børnematerialer"],
                "publisher": "Scanbox",
                "contributor": ["Michael Brewster", "David Solomons", "John Stephenson (instruktør)", "E. Nesbit", {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Freddie Highmore"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Jonathan Bailey"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Jessica Claridge"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Poppy Rogers"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Alec & Zak Muggleton"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Alexander Pownall"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Eddie Izzard"
                }, {"attributes": {"xsi:type": "dkdcplus:act"}, "$value": "Kenneth Branagh"}],
                "date": "2006",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Dvd"},
                "format": "1 dvd-video",
                "extent": "85 min.",
                "language": [{
                  "attributes": {"xsi:type": "dcterms:ISO639-2"},
                  "$value": "mul"
                }, "Flere sprog", {
                  "attributes": {"xsi:type": "dcterms:ISO639-2"},
                  "$value": "eng"
                }, "Engelsk", {
                  "attributes": {"xsi:type": "dkdcplus:subtitles"},
                  "$value": "Dansk"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:subtitles"},
                  "$value": "Finsk"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:subtitles"},
                  "$value": "Norsk"
                }, {"attributes": {"xsi:type": "dkdcplus:subtitles"}, "$value": "Svensk"}]
              },
              "identifier": "870970-basis:26593123",
              "recordStatus": "active",
              "creationDate": "2007-01-08",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["27860540|870970", {
                  "attributes": {"xsi:type": "dcterms:URI"},
                  "$value": "http://www.filmstriben.dk/fjernleje/film/details.aspx?id=2659312300"
                }],
                "source": ["Filmstriben", "Five children and It"],
                "title": ["Sandtrolden", {"attributes": {"xsi:type": "dkdcplus:full"}, "$value": "Sandtrolden"}],
                "alternative": "5 children and It",
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:drt"},
                  "$value": "John Stephenson (instruktør)"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Stephenson, John"}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "77.74"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Børnefilm"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "børn"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "børnefilm"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "trolde"}],
                "abstract": "Fem børn møder Sandtrolden, som er en selvoptaget og lettere krakilsk herre, men kan dog som enhver trold opfylde ønsker. Men børnenes ønsker bringer dem hver gang i store vanskeligheder, for Sandtrolden er også en udspekuleret filur",
                "description": ["Danske stemmer Niels Olsen, Lars Mikkelsen, Anette Støvelbæk, Puk Scharbau, Thomas Mørk ... et al.", "Originalfilmen: Storbritannien : UK Film Council ; S.l. : Davis Films, 2004"],
                "audience": [{
                  "attributes": {"xsi:type": "dkdcplus:medieraad"},
                  "$value": "Mærkning: Tilladt for alle men frarådes børn under 7 år"
                }, {"attributes": {"xsi:type": "dkdcplus:age"}, "$value": "Fra 9 år"}, "børnematerialer"],
                "publisher": "Scanbox",
                "contributor": ["Michael Brewster", "David Solomons", "John Stephenson (instruktør)", "E. Nesbit", {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Freddie Highmore"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Jonathan Bailey"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Jessica Claridge"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Poppy Rogers"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Alec & Zak Muggleton"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Alexander Pownall"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:act"},
                  "$value": "Eddie Izzard"
                }, {"attributes": {"xsi:type": "dkdcplus:act"}, "$value": "Kenneth Branagh"}],
                "date": "2009",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Film (net)"},
                "extent": "85 min.",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:27860540",
              "recordStatus": "active",
              "creationDate": "2009-08-10",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }]
          },
          "formattedCollection": {
            "briefDisplay": {
              "manifestation": [{
                "accessType": "physical",
                "fedoraPid": "870970-basis:26593123",
                "identifier": "870970-basis:26593123",
                "title": "Sandtrolden",
                "titleFull": "Sandtrolden",
                "type": "Dvd",
                "workType": "movie"
              }, {
                "accessType": "online",
                "fedoraPid": "870970-basis:27860540",
                "identifier": "870970-basis:27860540",
                "title": "Sandtrolden",
                "titleFull": "Sandtrolden",
                "type": "Film (net)",
                "workType": "movie"
              }]
            }
          }
        },
        "facetResult": {},
        "statInfo": {
          "fedoraRecordsCached": "6",
          "fedoraRecordsRead": "2",
          "time": "0.250029",
          "trackingId": "os:2015-07-14T13:37:03:259046:943"
        }
      }
    };

    assert.equal(JSON.stringify(worktransform.responseTransform(response)), JSON.stringify({
      "result": {
        "general": {
          "title": "Sandtrolden",
          "creators": [{
            "value": "John Stephenson (instruktør)",
            "search_link": "/search?phrase.creator=John%20Stephenson%20(instrukt%C3%B8r)"
          }],
          "actors": [{
            "value": "Freddie Highmore",
            "search_link": "/search?phrase.creator=Freddie%20Highmore"
          }, {
            "value": "Jonathan Bailey",
            "search_link": "/search?phrase.creator=Jonathan%20Bailey"
          }, {
            "value": "Jessica Claridge",
            "search_link": "/search?phrase.creator=Jessica%20Claridge"
          }, {
            "value": "Poppy Rogers",
            "search_link": "/search?phrase.creator=Poppy%20Rogers"
          }, {
            "value": "Alec & Zak Muggleton",
            "search_link": "/search?phrase.creator=Alec%20%26%20Zak%20Muggleton"
          }, {
            "value": "Alexander Pownall",
            "search_link": "/search?phrase.creator=Alexander%20Pownall"
          }, {"value": "Eddie Izzard", "search_link": "/search?phrase.creator=Eddie%20Izzard"}, {
            "value": "Kenneth Branagh",
            "search_link": "/search?phrase.creator=Kenneth%20Branagh"
          }],
          "description": ["Fem børn møder Sandtrolden, som er en selvoptaget og lettere krakilsk herre, men kan dog som enhver trold opfylde ønsker. Men børnenes ønsker bringer dem hver gang i store vanskeligheder, for Sandtrolden er også en udspekuleret filur"],
          "subjects": [{"value": "børn", "search_link": "/search?phrase.subject=b%C3%B8rn"}, {
            "value": "trolde",
            "search_link": "/search?phrase.subject=trolde"
          }],
          "dk5s": [{"value": ["77.74"], "search_link": "/search?dkcclterm.dk=77.74", "text": ["Børnefilm"]}],
          "languages": ["Flere sprog", "Engelsk"]
        },
        "specific": [{
          "type": "Dvd",
          "accessType": "physical",
          "identifiers": ["870970-basis:26593123"],
          "dates": ["2006"]
        }, {"type": "Film (net)", "accessType": "online", "identifiers": ["870970-basis:27860540"], "dates": ["2009"]}],
        "publications": [{
          "identifier": "870970-basis:26593123",
          "types": ["Dvd"],
          "dates": ["2006"],
          "publishers": ["Scanbox"],
          "extents": ["85 min."],
          "isbns": [],
          "links": []
        }, {
          "identifier": "870970-basis:27860540",
          "types": ["Film (net)"],
          "dates": ["2009"],
          "publishers": ["Scanbox"],
          "extents": ["85 min."],
          "isbns": [],
          "links": ["http://www.filmstriben.dk/fjernleje/film/details.aspx?id=2659312300"]
        }]
      }, "info": {"hits": "1", "collections": "1"}, "error": []
    }), 'Movie');

  });

  it('Newspaper article', function () {

    let response = {
      "result": {
        "hitCount": "1",
        "collectionCount": "1",
        "more": "false",
        "searchResult": {
          "collection": {
            "resultPosition": "1",
            "numberOfObjects": "1",
            "object": {
              "record": {
                "identifier": "36429801|870971",
                "source": "Avisartikler",
                "title": ["Superhelte springer ud", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Superhelte springer ud"
                }],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:ivr"},
                  "$value": "Anne Nørkjær Bang"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Bang, Anne Nørkjær"}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "81.38"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Amerikansk litteraturhistorie"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCF"},
                  "$value": "Better than he does himself"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCF"},
                  "$value": "Catwoman"
                }, "DC Comics", {
                  "attributes": {"xsi:type": "dkdcplus:DBCF"},
                  "$value": "amerikansk litteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCF"},
                  "$value": "biseksualitet"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCF"}, "$value": "tegneserier"}],
                "abstract": "Efter 75 år er den verdensberømte Catwoman-karakter nu officielt sprunget ud som biseksuel i tegneseriehæftet Catwoman # 39. DC Comics har allerede indvarslet større mangfoldighed på tegneseriefronten i 2015, og det giver god mening, forklarer Carsten Fogh Nielsen, der forsker på feltet. Læserne efterspørger nemlig karakterer, der spejler deres egen virkelighed",
                "description": "I anledning af Catwoman #39: \"Better Than He Does Himself\"",
                "audience": "voksenmaterialer",
                "date": "2015",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Avisartikel"},
                "format": "illustreret",
                "extent": "Sektion 1, s. 18-19",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"],
                "isPartOf": ["Berlingske tidende, 2015-03-17", {
                  "attributes": {"xsi:type": "dkdcplus:ISSN"},
                  "$value": "0106-4223"
                }]
              },
              "identifier": "870971-avis:36429801",
              "recordStatus": "active",
              "creationDate": "2015-03-17",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }
          },
          "formattedCollection": {
            "briefDisplay": {
              "manifestation": {
                "accessType": "physical",
                "creator": "Anne Nørkjær Bang",
                "fedoraPid": "870971-avis:36429801",
                "identifier": "870971-avis:36429801",
                "language": "Dansk",
                "partOf": "Berlingske tidende, 2015-03-17",
                "title": "Superhelte springer ud",
                "titleFull": "Superhelte springer ud",
                "type": "Avisartikel",
                "workType": "article"
              }
            }
          }
        },
        "facetResult": {},
        "statInfo": {
          "fedoraRecordsCached": "1",
          "fedoraRecordsRead": "4",
          "time": "0.283038",
          "trackingId": "os:2015-07-28T10:06:22:281011:7849"
        }
      }
    };

    assert.equal(JSON.stringify(worktransform.responseTransform(response)), JSON.stringify({
      "result": {
        "general": {
          "title": "Superhelte springer ud",
          "creators": [{
            "value": "Anne Nørkjær Bang",
            "search_link": "/search?phrase.creator=Anne%20N%C3%B8rkj%C3%A6r%20Bang"
          }],
          "description": ["Efter 75 år er den verdensberømte Catwoman-karakter nu officielt sprunget ud som biseksuel i tegneseriehæftet Catwoman # 39. DC Comics har allerede indvarslet større mangfoldighed på tegneseriefronten i 2015, og det giver god mening, forklarer Carsten Fogh Nielsen, der forsker på feltet. Læserne efterspørger nemlig karakterer, der spejler deres egen virkelighed"],
          "subjects": [{
            "value": "Better than he does himself",
            "search_link": "/search?phrase.subject=Better%20than%20he%20does%20himself"
          }, {"value": "Catwoman", "search_link": "/search?phrase.subject=Catwoman"}, {
            "value": "amerikansk litteratur",
            "search_link": "/search?phrase.subject=amerikansk%20litteratur"
          }, {"value": "biseksualitet", "search_link": "/search?phrase.subject=biseksualitet"}, {
            "value": "tegneserier",
            "search_link": "/search?phrase.subject=tegneserier"
          }],
          "dk5s": [{
            "value": ["81.38"],
            "search_link": "/search?dkcclterm.dk=81.38",
            "text": ["Amerikansk litteraturhistorie"]
          }],
          "languages": ["Dansk"],
          "partOf": ["Berlingske tidende, 2015-03-17"],
          "issn": ["0106-4223"]
        },
        "specific": [{
          "type": "Avisartikel",
          "accessType": "physical",
          "identifiers": ["870971-avis:36429801"],
          "dates": ["2015"]
        }],
        "publications": [{
          "identifier": "870971-avis:36429801",
          "types": ["Avisartikel"],
          "dates": ["2015"],
          "partOf": ["Berlingske tidende, 2015-03-17"],
          "issn": ["0106-4223"],
          "extents": ["Sektion 1, s. 18-19"],
          "isbns": [],
          "links": []
        }]
      }, "info": {"hits": "1", "collections": "1"}, "error": []
    }), 'Newspaper');

  });

  it('Series', function () {

    let response = {
      "result": {
        "hitCount": "1",
        "collectionCount": "1",
        "more": "false",
        "searchResult": {
          "collection": {
            "resultPosition": "1",
            "numberOfObjects": "5",
            "object": [{
              "record": {
                "identifier": ["27986404|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "9788711435830"
                }],
                "source": ["Bibliotekskatalog", "Breaking dawn"],
                "title": ["Daggry", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Daggry"
                }, {"attributes": {"xsi:type": "dkdcplus:series"}, "$value": "Tusmørke-serien ; 4. del"}],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Stephenie Meyer"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Meyer, Stephenie"}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "dark fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "dark fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 13 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 14 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 15 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "kærlighed"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "unge"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "vampyrer"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "varulve"}],
                "abstract": "Den 18-årige Bella er nu blevet gift med sin elskede vampyrkæreste, Edward. På bryllupsrejsen bliver Bella gravid - men der er noget galt",
                "audience": "børnematerialer",
                "version": "1. udgave",
                "publisher": "Carlsen",
                "contributor": [{
                  "attributes": {"xsi:type": "dkdcplus:trl"},
                  "$value": "Tina Sakura Bestle"
                }, {"attributes": {"xsi:type": "dkdcplus:edt"}, "$value": "Vibeke Nielsen"}],
                "date": "2009",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Bog"},
                "extent": "850 sider",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:27986404",
              "recordStatus": "active",
              "creationDate": "2009-10-28",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["29253153|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "9788711391471"
                }],
                "source": ["Bibliotekskatalog", "Breaking dawn"],
                "title": ["Daggry", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Daggry"
                }, {"attributes": {"xsi:type": "dkdcplus:series"}, "$value": "Tusmørke-serien ; 4. bind"}],
                "alternative": "Breaking dawn",
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Stephenie Meyer"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Meyer, Stephenie"}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "dark fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "dark fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 13 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 14 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 15 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "kærlighed"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "unge"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "vampyrer"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "varulve"}],
                "abstract": "Den 18-årige Bella er nu blevet gift med sin elskede vampyrkæreste, Edward. På bryllupsrejsen bliver Bella gravid - men der er noget galt",
                "audience": "børnematerialer",
                "version": "4. udgave",
                "publisher": "Carlsen",
                "contributor": {"attributes": {"xsi:type": "dkdcplus:trl"}, "$value": "Tina Sakura Bestle"},
                "date": "2012",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Bog"},
                "extent": "850 sider",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:29253153",
              "recordStatus": "active",
              "creationDate": "2012-03-05",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["28554346|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "9788711415344"
                }],
                "source": ["Bibliotekskatalog", "Breaking dawn"],
                "title": ["Daggry", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Daggry"
                }, {"attributes": {"xsi:type": "dkdcplus:series"}, "$value": "Tusmørke-serien ; 4. del"}],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Stephenie Meyer"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Meyer, Stephenie"}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "dark fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "dark fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 13 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 14 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 15 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "kærlighed"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "unge"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "vampyrer"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "varulve"}],
                "abstract": "Den 18-årige Bella er nu blevet gift med sin elskede vampyrkæreste, Edward. På bryllupsrejsen bliver Bella gravid - men der er noget galt",
                "audience": "børnematerialer",
                "version": "2. udgave",
                "publisher": "Carlsen",
                "contributor": {"attributes": {"xsi:type": "dkdcplus:trl"}, "$value": "Tina Sakura Bestle"},
                "date": "2010",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Bog"},
                "extent": "850 sider",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:28554346",
              "recordStatus": "active",
              "creationDate": "2010-12-07",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["29039569|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "9788711404980"
                }],
                "source": ["Bibliotekskatalog", "Breaking dawn"],
                "title": ["Daggry", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Daggry"
                }, {"attributes": {"xsi:type": "dkdcplus:series"}, "$value": "Tusmørke-serien ; 4. del"}],
                "alternative": "Breaking dawn",
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Stephenie Meyer"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Meyer, Stephenie"}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "dark fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:genre"},
                  "$value": "dark fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 13 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 14 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 15 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "kærlighed"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "unge"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "vampyrer"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "varulve"}],
                "abstract": "Den 18-årige Bella er nu blevet gift med sin elskede vampyrkæreste, Edward. På bryllupsrejsen bliver Bella gravid - men der er noget galt",
                "audience": "børnematerialer",
                "version": "3. udgave",
                "publisher": "Carlsen",
                "contributor": {"attributes": {"xsi:type": "dkdcplus:trl"}, "$value": "Tina Sakura Bestle"},
                "date": "2011",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Bog"},
                "extent": "850 sider",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:29039569",
              "recordStatus": "active",
              "creationDate": "2011-10-28",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }, {
              "record": {
                "identifier": ["28179030|870970", {
                  "attributes": {"xsi:type": "dkdcplus:ISBN"},
                  "$value": "9788711420751"
                }],
                "source": ["Bibliotekskatalog", "Breaking dawn"],
                "title": ["Daggry", {
                  "attributes": {"xsi:type": "dkdcplus:full"},
                  "$value": "Daggry (mp3)"
                }, {"attributes": {"xsi:type": "dkdcplus:series"}, "$value": "Tusmørke-serien ; 4. bind"}],
                "creator": [{
                  "attributes": {"xsi:type": "dkdcplus:aut"},
                  "$value": "Stephenie Meyer"
                }, {"attributes": {"xsi:type": "oss:sort"}, "$value": "Meyer, Stephenie"}],
                "subject": [{
                  "attributes": {"xsi:type": "dkdcplus:DK5-Text"},
                  "$value": "Skønlitteratur"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "dark fantasy"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 13 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 14 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCN"},
                  "$value": "for 15 år"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "kærlighed"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DK5"},
                  "$value": "sk"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "unge"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:DBCS"},
                  "$value": "vampyrer"
                }, {"attributes": {"xsi:type": "dkdcplus:DBCS"}, "$value": "varulve"}],
                "abstract": "Den 18-årige Bella er nu blevet gift med sin elskede vampyrkæreste, Edward. På bryllupsrejsen bliver Bella gravid - men der er noget galt",
                "description": "Redaktøren fremgår ikke af materialet",
                "audience": "børnematerialer",
                "publisher": "Carlsen",
                "contributor": [{
                  "attributes": {"xsi:type": "dkdcplus:dkind"},
                  "$value": "Karin Rørbech"
                }, {
                  "attributes": {"xsi:type": "dkdcplus:trl"},
                  "$value": "Tina Sakura Bestle"
                }, {"attributes": {"xsi:type": "dkdcplus:edt"}, "$value": "Vibeke Nielsen"}],
                "date": "2009",
                "type": {"attributes": {"xsi:type": "dkdcplus:BibDK-Type"}, "$value": "Lydbog (cd-mp3)"},
                "format": "2 cd'er i 1 mappe, mp3",
                "extent": "20 t., 35 min.",
                "language": [{"attributes": {"xsi:type": "dcterms:ISO639-2"}, "$value": "dan"}, "Dansk"]
              },
              "identifier": "870970-basis:28179030",
              "recordStatus": "active",
              "creationDate": "2010-03-09",
              "formatsAvailable": {"format": ["dkabm", "marcxchange"]}
            }]
          },
          "formattedCollection": {
            "briefDisplay": {
              "manifestation": [{
                "accessType": "physical",
                "creator": "Stephenie Meyer",
                "fedoraPid": "870970-basis:27986404",
                "identifier": "870970-basis:27986404",
                "language": "Dansk",
                "title": "Daggry",
                "titleFull": "Daggry",
                "type": "Bog",
                "workType": "book"
              }, {
                "accessType": "physical",
                "creator": "Stephenie Meyer",
                "fedoraPid": "870970-basis:29253153",
                "identifier": "870970-basis:29253153",
                "language": "Dansk",
                "title": "Daggry",
                "titleFull": "Daggry",
                "type": "Bog",
                "workType": "book"
              }, {
                "accessType": "physical",
                "creator": "Stephenie Meyer",
                "fedoraPid": "870970-basis:28554346",
                "identifier": "870970-basis:28554346",
                "language": "Dansk",
                "title": "Daggry",
                "titleFull": "Daggry",
                "type": "Bog",
                "workType": "book"
              }, {
                "accessType": "physical",
                "creator": "Stephenie Meyer",
                "fedoraPid": "870970-basis:29039569",
                "identifier": "870970-basis:29039569",
                "language": "Dansk",
                "title": "Daggry",
                "titleFull": "Daggry",
                "type": "Bog",
                "workType": "book"
              }, {
                "accessType": "physical",
                "creator": "Stephenie Meyer",
                "fedoraPid": "870970-basis:28179030",
                "identifier": "870970-basis:28179030",
                "language": "Dansk",
                "title": "Daggry",
                "titleFull": "Daggry",
                "type": "Lydbog (cd-mp3)",
                "workType": "audiobook"
              }]
            }
          }
        },
        "facetResult": {},
        "statInfo": {
          "fedoraRecordsCached": "2",
          "fedoraRecordsRead": "15",
          "time": "0.561205",
          "trackingId": "os:2015-08-03T11:23:29:849663:3058"
        }
      }
    };

    assert.equal(JSON.stringify(worktransform.responseTransform(response)), JSON.stringify({
      "result": {
        "general": {
          "title": "Daggry",
          "series": {
            "value": ["Tusmørke-serien ; 4. del"],
            "search_link": "/search?phrase.titleSeries=Tusm%C3%B8rke-serien"
          },
          "creators": [{"value": "Stephenie Meyer", "search_link": "/search?phrase.creator=Stephenie%20Meyer"}],
          "description": ["Den 18-årige Bella er nu blevet gift med sin elskede vampyrkæreste, Edward. På bryllupsrejsen bliver Bella gravid - men der er noget galt"],
          "subjects": [{
            "value": "dark fantasy",
            "search_link": "/search?phrase.subject=dark%20fantasy"
          }, {"value": "kærlighed", "search_link": "/search?phrase.subject=k%C3%A6rlighed"}, {
            "value": "unge",
            "search_link": "/search?phrase.subject=unge"
          }, {"value": "vampyrer", "search_link": "/search?phrase.subject=vampyrer"}, {
            "value": "varulve",
            "search_link": "/search?phrase.subject=varulve"
          }],
          "dk5s": [{"value": ["sk"], "search_link": "/search?dkcclterm.dk=sk", "text": ["Skønlitteratur"]}],
          "languages": ["Dansk"]
        },
        "specific": [{
          "type": "Bog",
          "accessType": "physical",
          "identifiers": ["870970-basis:27986404", "870970-basis:29253153", "870970-basis:28554346", "870970-basis:29039569"],
          "dates": ["2009", "2012", "2010", "2011"]
        }, {
          "type": "Lydbog (cd-mp3)",
          "accessType": "physical",
          "identifiers": ["870970-basis:28179030"],
          "dates": ["2009"]
        }],
        "publications": [{
          "identifier": "870970-basis:27986404",
          "types": ["Bog"],
          "dates": ["2009"],
          "publishers": ["Carlsen"],
          "editions": ["1. udgave"],
          "extents": ["850 sider"],
          "isbns": ["9788711435830"],
          "links": []
        }, {
          "identifier": "870970-basis:29253153",
          "types": ["Bog"],
          "dates": ["2012"],
          "publishers": ["Carlsen"],
          "editions": ["4. udgave"],
          "extents": ["850 sider"],
          "isbns": ["9788711391471"],
          "links": []
        }, {
          "identifier": "870970-basis:28554346",
          "types": ["Bog"],
          "dates": ["2010"],
          "publishers": ["Carlsen"],
          "editions": ["2. udgave"],
          "extents": ["850 sider"],
          "isbns": ["9788711415344"],
          "links": []
        }, {
          "identifier": "870970-basis:29039569",
          "types": ["Bog"],
          "dates": ["2011"],
          "publishers": ["Carlsen"],
          "editions": ["3. udgave"],
          "extents": ["850 sider"],
          "isbns": ["9788711404980"],
          "links": []
        }, {
          "identifier": "870970-basis:28179030",
          "types": ["Lydbog (cd-mp3)"],
          "dates": ["2009"],
          "publishers": ["Carlsen"],
          "extents": ["20 t., 35 min."],
          "isbns": ["9788711420751"],
          "links": []
        }]
      }, "info": {"hits": "1", "collections": "1"}, "error": []
    }), 'Series');

  });

});
/* eslint-enable */
