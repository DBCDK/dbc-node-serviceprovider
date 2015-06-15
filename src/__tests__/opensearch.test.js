'use strict';

import {expect, assert} from 'chai';
import * as prep from  '../transformers/opensearch/resultlist.js';

describe('Test transform of OpenSearch responses', () => {
	it('Check one hit', function() {
		
		let response = {"result":{"hitCount":"1","collectionCount":"1","more":"false","sortUsed":"rank_subject","searchResult":{"collection":{"resultPosition":"1","numberOfObjects":"1","object":{"identifier":"870970-basis:27036031","recordStatus":"active","creationDate":"2007-11-26","formatsAvailable":{"format":["dkabm","marcxchange"]}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","fedoraPid":"870970-basis:27036031","identifier":"870970-basis:27036031","title":"Harry Potter og Fønixordenen","titleFull":"Harry Potter og Fønixordenen","type":"Playstation 2","workType":"game"}}}},"facetResult":{},"statInfo":{"fedoraRecordsCached":"4","fedoraRecordsRead":"1","time":"0.205224","trackingId":"os:2015-06-15T11:47:46:535154:6359"}}};
		
		assert.equal(JSON.stringify(prep.transformResponse(response)), JSON.stringify({"result":[{"identifiers":["870970-basis:27036031"],"title":"Harry Potter og Fønixordenen","workType":"game"}]}), "One hit in search result");
		
	});
	it('Check more hits', function() {
		
		let response = {"result":{"hitCount":"2","collectionCount":"2","more":"false","sortUsed":"rank_subject","searchResult":[{"collection":{"resultPosition":"1","numberOfObjects":"1","object":{"identifier":"870970-basis:27036031","recordStatus":"active","creationDate":"2007-11-26","formatsAvailable":{"format":["dkabm","marcxchange"]}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","fedoraPid":"870970-basis:27036031","identifier":"870970-basis:27036031","title":"Harry Potter og Fønixordenen","titleFull":"Harry Potter og Fønixordenen","type":"Playstation 2","workType":"game"}}}},{"collection":{"resultPosition":"2","numberOfObjects":"1","object":{"identifier":"870970-basis:29317038","recordStatus":"active","creationDate":"2012-04-03","formatsAvailable":{"format":["dkabm","marcxchange"]}}},"formattedCollection":{"briefDisplay":{"manifestation":{"accessType":"physical","creator":"Joanne K. Rowling","fedoraPid":"870970-basis:29317038","identifier":"870970-basis:29317038","language":"Dansk","title":"Harry Potter og De Vises Sten","titleFull":"Harry Potter og De Vises Sten","type":"Bog","workType":"book"}}}}],"facetResult":{},"statInfo":{"fedoraRecordsCached":"3","fedoraRecordsRead":"7","time":"1.831044","trackingId":"os:2015-06-15T12:48:15:288498:31926"}}};
		
		assert.equal(JSON.stringify(prep.transformResponse(response)), JSON.stringify({"result":[{"identifiers":["870970-basis:29317038"],"title":"Harry Potter og De Vises Sten","workType":"book"},{"identifiers":["870970-basis:29317038"],"title":"Harry Potter og De Vises Sten","workType":"book"}]}), "More hits in search result");
		
	});
	it('Check more hits one work', function() {
		
		let response = {"result":{"hitCount":"2","collectionCount":"1","more":"false","sortUsed":"rank_subject","searchResult":{"collection":{"resultPosition":"1","numberOfObjects":"2","object":[{"identifier":"870970-basis:22252852","recordStatus":"active","creationDate":"2005-03-01","formatsAvailable":{"format":["dkabm","marcxchange"]}},{"identifier":"870970-basis:29317038","recordStatus":"active","creationDate":"2012-04-03","formatsAvailable":{"format":["dkabm","marcxchange"]}}]},"formattedCollection":{"briefDisplay":{"manifestation":[{"accessType":"physical","creator":"Joanne K. Rowling","fedoraPid":"870970-basis:22252852","identifier":"870970-basis:22252852","language":"Dansk","title":"Harry Potter og De Vises Sten","titleFull":"Harry Potter og De Vises Sten","type":"Bog","workType":"book"},{"accessType":"physical","creator":"Joanne K. Rowling","fedoraPid":"870970-basis:29317038","identifier":"870970-basis:29317038","language":"Dansk","title":"Harry Potter og De Vises Sten","titleFull":"Harry Potter og De Vises Sten","type":"Bog","workType":"book"}]}}},"facetResult":{},"statInfo":{"fedoraRecordsCached":"8","fedoraRecordsRead":"0","time":"0.307299","trackingId":"os:2015-06-15T12:50:59:869318:31926"}}};
		
		assert.equal(JSON.stringify(prep.transformResponse(response)), JSON.stringify({"result":[{"identifiers":["870970-basis:22252852","870970-basis:29317038"],"title":"Harry Potter og De Vises Sten","workType":"book"}]}), "More hits in one work collection");
		
	});
	it('Check no hits', function() {
		
		let response = {"result":{"hitCount":"0","collectionCount":"0","more":"false","sortUsed":"rank_main_title","facetResult":{},"statInfo":{"fedoraRecordsCached":"0","fedoraRecordsRead":"0","time":"0.181227","trackingId":"os:2015-06-15T12:53:41:207552:6791"}}};
		assert.equal(JSON.stringify(prep.transformResponse(response)), JSON.stringify({"result":[{"hits":"0","collections":"0","more":"false"}]}), "No records found");
		
	});
	it('Check authentication error', function() {
		
		let response = {"error":"authentication_error"};
		
		assert.equal(JSON.stringify(prep.transformResponse(response)), JSON.stringify({"result":[{"errorcode":1,"errormessage":"Authentication error","serviceerror":"authentication_error"}]}), "Authentication error");
		
	});

});