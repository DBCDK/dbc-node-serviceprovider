'use strict';
/*eslint-disable */
import {expect, assert} from 'chai';

const transform = require('../transformers/OpenOrder/CheckOrderPolicy.transform');

describe('Test transform of OpenOrder response', () => {
  
	it('Response transform can order', function() {

		let response = {"checkOrderPolicyResponse":{"$":{"xmlns":"http://oss.dbc.dk/ns/openorder"},"lookUpUrl":["http://stormp.kk.dk/linkme.asp?26885612"],"orderPossible":["true"],"orderPossibleReason":["owned_accepted"],"orderCondition":[{"_":"Dansk betingelse","$":{"language":"dan"}},{"_":"English condition","$":{"language":"eng"}}]}, pids: [ '870970-basis:26885612' ]};

		assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({"result":{"canOrder":"true"},"info":{"pids":["870970-basis:26885612"]},"error":[]}), 'Can order');

	});
	
	it('Response transform cannot order', function() {

		let response = {"checkOrderPolicyResponse":{"$":{"xmlns":"http://oss.dbc.dk/ns/openorder"},"lookUpUrl":["http://biblioteksbaserne.dk/sites/WODDER/pub/search.html?doaction=search&data=scode_ccl%3Did%3D28183488"],"orderPossible":["false"],"orderPossibleReason":["owned_own_catalogue"]}, pids: [ '870970-basis:28183488' ]};

		assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({"result":{"canOrder":"false"},"info":{"pids":["870970-basis:28183488"]},"error":[]}), 'Cannot order');

	});
	
	it('Response transform error', function() {

		let response = {"checkOrderPolicyResponse":{"$":{"xmlns":"http://oss.dbc.dk/ns/openorder"},"checkOrderPolicyError":["service_unavailable"]}, pids: [ '870970-basis:28183488' ]};

		assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({"result":[],"info":{"pids":["870970-basis:28183488"]},"error":[["service_unavailable"]]}), 'Error');

	});

});
/* eslint-enable */
