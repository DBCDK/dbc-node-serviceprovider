'use strict';

/**
 * @file
 * Contains mocks for the tests testing the OpenSearch transforms
 */

/* eslint-disable */

/**
 * Based on a search for the following string: 'Cornelius krimi'
 * @type {{result: {hitCount: string, collectionCount: string, more: string, sortUsed: string, searchResult: *[], facetResult: {facet: {facetName: string, facetTerm: {frequence: string, term: string}}}, statInfo: {fedoraRecordsCached: string, fedoraRecordsRead: string, time: string, trackingId: string}}}}
 */
export const OneFacetOnly = {"result": {"hitCount": "15", "collectionCount": "5", "more": "false", "sortUsed": "popularity_descending", "searchResult": [{"collection": {"resultPosition": "1", "numberOfObjects": "3", "object": [{"identifier": "870970-basis:28729421", "primaryObjectIdentifier": "870970-basis:28729421", "recordStatus": "active", "creationDate": "2011-04-04", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:28729421"}}, {"identifier": "870970-basis:28769636", "primaryObjectIdentifier": "870970-basis:28769636", "recordStatus": "active", "creationDate": "2011-11-21", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:28769636"}}, {"identifier": "870970-basis:28769644", "primaryObjectIdentifier": "870970-basis:28769644", "recordStatus": "active", "creationDate": "2011-11-21", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:28769644"}}]}, "formattedCollection": {"briefDisplay": {"manifestation": [{"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:28729421", "identifier": "870970-basis:28729421", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Bog (bind 5)", "workType": "book"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:28769636", "identifier": "870970-basis:28769636", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd) (bind 5)", "workType": "audiobook"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:28769644", "identifier": "870970-basis:28769644", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd-mp3) (bind 5)", "workType": "audiobook"}]}}}, {"collection": {"resultPosition": "2", "numberOfObjects": "3", "object": [{"identifier": "870970-basis:28007396", "primaryObjectIdentifier": "870970-basis:28007396", "recordStatus": "active", "creationDate": "2009-11-11", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:28007396"}}, {"identifier": "870970-basis:28245602", "primaryObjectIdentifier": "870970-basis:28245602", "recordStatus": "active", "creationDate": "2010-11-08", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:28245602"}}, {"identifier": "870970-basis:28245610", "primaryObjectIdentifier": "870970-basis:28245610", "recordStatus": "active", "creationDate": "2010-11-08", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:28245610"}}]}, "formattedCollection": {"briefDisplay": {"manifestation": [{"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:28007396", "identifier": "870970-basis:28007396", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Bog (bind 3)", "workType": "book"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:28245602", "identifier": "870970-basis:28245602", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd) (bind 3)", "workType": "audiobook"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:28245610", "identifier": "870970-basis:28245610", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd-mp3) (bind 3)", "workType": "audiobook"}]}}}, {"collection": {"resultPosition": "3", "numberOfObjects": "3", "object": [{"identifier": "870970-basis:28394306", "primaryObjectIdentifier": "870970-basis:28394306", "recordStatus": "active", "creationDate": "2010-08-23", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:28394306"}}, {"identifier": "870970-basis:28246595", "primaryObjectIdentifier": "870970-basis:28246595", "recordStatus": "active", "creationDate": "2011-05-30", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:28246595"}}, {"identifier": "870970-basis:28246609", "primaryObjectIdentifier": "870970-basis:28246609", "recordStatus": "active", "creationDate": "2011-05-30", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:28246609"}}]}, "formattedCollection": {"briefDisplay": {"manifestation": [{"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:28394306", "identifier": "870970-basis:28394306", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Bog (bind 4)", "workType": "book"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:28246595", "identifier": "870970-basis:28246595", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd) (bind 4)", "workType": "audiobook"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:28246609", "identifier": "870970-basis:28246609", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd-mp3) (bind 4)", "workType": "audiobook"}]}}}, {"collection": {"resultPosition": "4", "numberOfObjects": "3", "object": [{"identifier": "870970-basis:27664024", "primaryObjectIdentifier": "870970-basis:27664024", "recordStatus": "active", "creationDate": "2009-03-12", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:27664024"}}, {"identifier": "870970-basis:27121543", "primaryObjectIdentifier": "870970-basis:27121543", "recordStatus": "active", "creationDate": "2009-09-16", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:27121543"}}, {"identifier": "870970-basis:27121551", "primaryObjectIdentifier": "870970-basis:27121551", "recordStatus": "active", "creationDate": "2009-09-16", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:27121551"}}]}, "formattedCollection": {"briefDisplay": {"manifestation": [{"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:27664024", "identifier": "870970-basis:27664024", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Bog (bind 2)", "workType": "book"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:27121543", "identifier": "870970-basis:27121543", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd) (bind 2)", "workType": "audiobook"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:27121551", "identifier": "870970-basis:27121551", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd-mp3) (bind 2)", "workType": "audiobook"}]}}}, {"collection": {"resultPosition": "5", "numberOfObjects": "3", "object": [{"identifier": "870970-basis:27663982", "primaryObjectIdentifier": "870970-basis:27663982", "recordStatus": "active", "creationDate": "2009-03-12", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:27663982"}}, {"identifier": "870970-basis:27121527", "primaryObjectIdentifier": "870970-basis:27121527", "recordStatus": "active", "creationDate": "2009-09-16", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:27121527"}}, {"identifier": "870970-basis:27121535", "primaryObjectIdentifier": "870970-basis:27121535", "recordStatus": "active", "creationDate": "2009-09-16", "formatsAvailable": {"format": ["dkabm", "marcxchange"]}, "objectsAvailable": {"identifier": "870970-basis:27121535"}}]}, "formattedCollection": {"briefDisplay": {"manifestation": [{"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:27663982", "identifier": "870970-basis:27663982", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Bog (bind 1)", "workType": "book"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:27121527", "identifier": "870970-basis:27121527", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd) (bind 1)", "workType": "audiobook"}, {"accessType": "physical", "creator": "Jan Solheim", "fedoraPid": "870970-basis:27121535", "identifier": "870970-basis:27121535", "language": "Dansk", "title": "Cornelius Krut", "titleFull": "Cornelius Krut", "type": "Lydbog (cd-mp3) (bind 1)", "workType": "audiobook"}]}}}], "facetResult": {"facet": {"facetName": "term.workType", "facetTerm": {"frequence": "15", "term": "literature"}}}, "statInfo": {"fedoraRecordsCached": "0", "fedoraRecordsRead": "85", "time": "4.202984", "trackingId": "2015-09-15T13:04:45:830676:4632"}}};

/**
 * Based on a search for the following string: 'peter pedal'
 * @type {{result: {hitCount: string, collectionCount: string, more: string, sortUsed: string, searchResult: *[], facetResult: {facet: {facetName: string, facetTerm: *[]}}, statInfo: {fedoraRecordsCached: string, fedoraRecordsRead: string, time: string, trackingId: string}}}}
 */
export const MultipleFacets = {"result":{"hitCount":"155","collectionCount":"12","more":"true","sortUsed":"popularity_descending","searchResult":[{"collection":{"resultPosition":"1","numberOfObjects":"2","object":[{"identifier":"870970-basis:05074975","primaryObjectIdentifier":"870970-basis:05074975","recordStatus":"active","creationDate":"2005-03-01","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:05074975"}},{"identifier":"870970-basis:27889654","primaryObjectIdentifier":"870970-basis:27889654","recordStatus":"active","creationDate":"2009-08-26","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:27889654"}}]},"formattedCollection":{"briefDisplay":{"manifestation":[{"accessType":"physical","creator":"H. A. Rey","fedoraPid":"870970-basis:05074975","identifier":"870970-basis:05074975","language":"Dansk","title":"Peter Pedal","titleFull":"Peter Pedal","type":"Billedbog","workType":"book"},{"accessType":"physical","creator":"H. A. Rey","fedoraPid":"870970-basis:27889654","identifier":"870970-basis:27889654","language":"Dansk","title":"Peter Pedal","titleFull":"Peter Pedal","type":"Billedbog","workType":"book"}]}}},{"collection":{"resultPosition":"2","numberOfObjects":"1","object":{"identifier":"870970-basis:51158326","primaryObjectIdentifier":"870970-basis:51158326","recordStatus":"active","creationDate":"2014-06-18","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:51158326"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","creator":"Anna Grossnickle Hines","fedoraPid":"870970-basis:51158326","identifier":"870970-basis:51158326","language":"Dansk","title":"Peter Pedals første skoledag","titleFull":"Peter Pedals første skoledag","type":"Billedbog","workType":"book"}}}},{"collection":{"resultPosition":"3","numberOfObjects":"1","object":{"identifier":"870970-basis:21504904","primaryObjectIdentifier":"870970-basis:21504904","recordStatus":"active","creationDate":"2005-03-01","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:21504904"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","creator":"H. A. Rey","fedoraPid":"870970-basis:21504904","identifier":"870970-basis:21504904","language":"Dansk","title":"Peter Pedal sætter drage op","titleFull":"Peter Pedal sætter drage op","type":"Billedbog","workType":"book"}}}},{"collection":{"resultPosition":"4","numberOfObjects":"1","object":{"identifier":"870970-basis:29579326","primaryObjectIdentifier":"870970-basis:29579326","recordStatus":"active","creationDate":"2012-09-27","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:29579326"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","creator":"H. A. Rey","fedoraPid":"870970-basis:29579326","identifier":"870970-basis:29579326","language":"Dansk","title":"Min store Peter Pedal findebog","titleFull":"Min store Peter Pedal findebog","type":"Billedbog","workType":"book"}}}},{"collection":{"resultPosition":"5","numberOfObjects":"1","object":{"identifier":"870970-basis:05131499","primaryObjectIdentifier":"870970-basis:05131499","recordStatus":"active","creationDate":"2005-03-01","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:05131499"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","creator":"H. A. Rey","fedoraPid":"870970-basis:05131499","identifier":"870970-basis:05131499","language":"Dansk","title":"Peter Pedal hænger i","titleFull":"Peter Pedal hænger i","type":"Billedbog","workType":"book"}}}},{"collection":{"resultPosition":"6","numberOfObjects":"1","object":{"identifier":"870970-basis:05000319","primaryObjectIdentifier":"870970-basis:05000319","recordStatus":"active","creationDate":"2005-03-01","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:05000319"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","creator":"H. A. Rey","fedoraPid":"870970-basis:05000319","identifier":"870970-basis:05000319","language":"Dansk","title":"Peter Pedal på hospital","titleFull":"Peter Pedal på hospital","type":"Billedbog","workType":"book"}}}},{"collection":{"resultPosition":"7","numberOfObjects":"1","object":{"identifier":"870970-basis:51158288","primaryObjectIdentifier":"870970-basis:51158288","recordStatus":"active","creationDate":"2014-06-18","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:51158288"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","creator":"Martha Weston","fedoraPid":"870970-basis:51158288","identifier":"870970-basis:51158288","language":"Dansk","title":"Peter Pedal og fødselsdagsfesten","titleFull":"Peter Pedal og fødselsdagsfesten","type":"Billedbog","workType":"book"}}}},{"collection":{"resultPosition":"8","numberOfObjects":"1","object":{"identifier":"870970-basis:27889689","primaryObjectIdentifier":"870970-basis:27889689","recordStatus":"active","creationDate":"2009-08-26","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:27889689"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","creator":"H. A. Rey","fedoraPid":"870970-basis:27889689","identifier":"870970-basis:27889689","language":"Dansk","title":"Peter Pedal på himmelfart","titleFull":"Peter Pedal på himmelfart","type":"Billedbog","workType":"book"}}}},{"collection":{"resultPosition":"9","numberOfObjects":"1","object":{"identifier":"870970-basis:28434472","primaryObjectIdentifier":"870970-basis:28434472","recordStatus":"active","creationDate":"2010-09-17","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:28434472"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","creator":"H. A. Rey","fedoraPid":"870970-basis:28434472","identifier":"870970-basis:28434472","language":"Dansk","title":"Peter Pedal i de sjove labyrinter","titleFull":"Peter Pedal i de sjove labyrinter","type":"Billedbog","workType":"book"}}}},{"collection":{"resultPosition":"10","numberOfObjects":"1","object":{"identifier":"870970-basis:27824331","primaryObjectIdentifier":"870970-basis:27824331","recordStatus":"active","creationDate":"2009-07-10","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:27824331"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","fedoraPid":"870970-basis:27824331","identifier":"870970-basis:27824331","title":"Peter Pedal på nye eventyr","titleFull":"Peter Pedal på nye eventyr","type":"Dvd","workType":"movie"}}}},{"collection":{"resultPosition":"11","numberOfObjects":"2","object":[{"identifier":"870970-basis:28609736","primaryObjectIdentifier":"870970-basis:28609736","recordStatus":"active","creationDate":"2011-01-19","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:28609736"}},{"identifier":"870970-basis:29432309","primaryObjectIdentifier":"870970-basis:29432309","recordStatus":"active","creationDate":"2012-06-19","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:29432309"}}]},"formattedCollection":{"briefDisplay":{"manifestation":[{"accessType":"physical","fedoraPid":"870970-basis:28609736","identifier":"870970-basis:28609736","language":"Dansk","title":"Jeg vil høre historier","titleFull":"Jeg vil høre historier : en samling historier om årets gang","type":"Billedbog","workType":"book"},{"accessType":"physical","fedoraPid":"870970-basis:29432309","identifier":"870970-basis:29432309","language":"Dansk","title":"Jeg vil høre historier","titleFull":"Jeg vil høre historier : en samling historier om årets gang","type":"Billedbog","workType":"book"}]}}},{"collection":{"resultPosition":"12","numberOfObjects":"1","object":{"identifier":"870970-basis:51158237","primaryObjectIdentifier":"870970-basis:51158237","recordStatus":"active","creationDate":"2014-06-18","formatsAvailable":{"format":["dkabm","marcxchange"]},"objectsAvailable":{"identifier":"870970-basis:51158237"}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","fedoraPid":"870970-basis:51158237","identifier":"870970-basis:51158237","language":"Dansk","title":"Peter Pedal og hundehvalpene","titleFull":"Peter Pedal og hundehvalpene","type":"Billedbog","workType":"book"}}}}],"facetResult":{"facet":{"facetName":"term.workType","facetTerm":[{"frequence":"91","term":"music"},{"frequence":"39","term":"literature"},{"frequence":"24","term":"movie"},{"frequence":"4","term":"game"},{"frequence":"2","term":"none"}]}},"statInfo":{"fedoraRecordsCached":"0","fedoraRecordsRead":"94","time":"3.401093","trackingId":"2015-09-15T13:18:43:317919:12918"}}}
  ;

/* eslint-enable */
