'use strict';
/*eslint-disable */
import {expect, assert} from 'chai';

const transform = require('../transformers/OpenOrder/CheckOrderPolicy.transform');

describe('Test transform of OpenOrder response', () => {
  
	it('Response transform can order', function() {

		let response = {"checkOrderPolicyResponse":{"$":{"xmlns":"http://oss.dbc.dk/ns/openorder"},"lookUpUrl":["http://stormp.kk.dk/linkme.asp?26885612"],"orderPossible":["true"],"orderPossibleReason":["owned_accepted"],"orderCondition":[{"_":"Dansk betingelse","$":{"language":"dan"}},{"_":"English condition","$":{"language":"eng"}}]}};

		assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({"result":{"canOrder":"true"},"info":{},"error":[]}), 'Can order');

	});
	
	it('Response transform cannot order', function() {

		let response = {"checkOrderPolicyResponse":{"$":{"xmlns":"http://oss.dbc.dk/ns/openorder"},"lookUpUrl":["http://biblioteksbaserne.dk/sites/WODDER/pub/search.html?doaction=search&data=scode_ccl%3Did%3D28183488"],"orderPossible":["false"],"orderPossibleReason":["owned_own_catalogue"]}};

		assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({"result":{"canOrder":"false"},"info":{},"error":[]}), 'Cannot order');

	});
	
	it('Response transform error', function() {

		let response = {"checkOrderPolicyResponse":{"$":{"xmlns":"http://oss.dbc.dk/ns/openorder"},"checkOrderPolicyError":["service_unavailable"]}};

		assert.equal(JSON.stringify(transform.responseTransform(response)), JSON.stringify({"result":[],"info":{},"error":[["service_unavailable"]]}), 'Error');

	});

});
/* eslint-enable */
