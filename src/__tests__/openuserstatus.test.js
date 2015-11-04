'use strict';
/*eslint-disable */
import {expect, assert} from 'chai';

import {isEqual} from 'lodash';

const userStatusTransform = require('../transformers/OpenUserStatus/GetUserStatus.transform');
const cancelOrderTransform = require('../transformers/OpenUserStatus/CancelOrder.transform');

describe('Test transform of OpenUserStatus response', () => {

	it('Response transform 3 ordered items', function() {

		let response = {"ous:getUserStatusResponse":{"$":{"xmlns:ous":"http://oss.dbc.dk/ns/openuserstatus","xmlns":"http://oss.dbc.dk/ns/openuserstatus"},"ous:userId":["1111"],"ous:userStatus":[{"ous:loanedItems":[{"ous:loansCount":["0"]}],"ous:orderedItems":[{"ous:order":[{"ous:author":["Holm, Gretelise, f. 1946"],"ous:title":["Møgkællinger"],"ous:orderDate":["2015-10-27T00:00:00+01:00"],"ous:orderId":["1654246"],"ous:orderStatus":["Available for pickup"],"ous:orderType":["Hold"],"ous:holdQueuePosition":["1"],"ous:pickUpExpiryDate":["2015-11-03T00:00:00+01:00"],"ous:pickUpId":["1270"],"ous:pickUpAgency":["DK-737600"]},{"ous:author":["Ellemose, Søren"],"ous:title":["Tidsmaskinen"],"ous:orderDate":["2015-10-29T00:00:00+01:00"],"ous:orderId":["1655526"],"ous:orderStatus":["Available for pickup"],"ous:orderType":["Hold"],"ous:holdQueuePosition":["1"],"ous:pickUpExpiryDate":["2015-11-06T00:00:00+01:00"],"ous:pickUpId":["1708"],"ous:pickUpAgency":["DK-737600"]},{"ous:author":["Bidstrup, Lise"],"ous:title":["Overlevernes by"],"ous:orderDate":["2015-10-29T00:00:00+01:00"],"ous:orderId":["1655527"],"ous:orderStatus":["Available for pickup"],"ous:orderType":["Hold"],"ous:holdQueuePosition":["1"],"ous:pickUpExpiryDate":["2015-11-06T00:00:00+01:00"],"ous:pickUpId":["1707"],"ous:pickUpAgency":["DK-737600"]}],"ous:ordersCount":["3"]}],"ous:fiscalAccount":[{"ous:totalAmount":["0"],"ous:totalAmountCurrency":["DKK"]}]}]}};

    let newResponse = userStatusTransform.responseTransform(response);

		assert.equal(newResponse.result.orderedItems.count, 3, 'Ordered items');

	});

	it('Response transform 0 loaned items', function() {

		let response = {"ous:getUserStatusResponse":{"$":{"xmlns:ous":"http://oss.dbc.dk/ns/openuserstatus","xmlns":"http://oss.dbc.dk/ns/openuserstatus"},"ous:userId":["1111"],"ous:userStatus":[{"ous:loanedItems":[{"ous:loansCount":["0"]}],"ous:orderedItems":[{"ous:order":[{"ous:author":["Holm, Gretelise, f. 1946"],"ous:title":["Møgkællinger"],"ous:orderDate":["2015-10-27T00:00:00+01:00"],"ous:orderId":["1654246"],"ous:orderStatus":["Available for pickup"],"ous:orderType":["Hold"],"ous:holdQueuePosition":["1"],"ous:pickUpExpiryDate":["2015-11-03T00:00:00+01:00"],"ous:pickUpId":["1270"],"ous:pickUpAgency":["DK-737600"]},{"ous:author":["Ellemose, Søren"],"ous:title":["Tidsmaskinen"],"ous:orderDate":["2015-10-29T00:00:00+01:00"],"ous:orderId":["1655526"],"ous:orderStatus":["Available for pickup"],"ous:orderType":["Hold"],"ous:holdQueuePosition":["1"],"ous:pickUpExpiryDate":["2015-11-06T00:00:00+01:00"],"ous:pickUpId":["1708"],"ous:pickUpAgency":["DK-737600"]},{"ous:author":["Bidstrup, Lise"],"ous:title":["Overlevernes by"],"ous:orderDate":["2015-10-29T00:00:00+01:00"],"ous:orderId":["1655527"],"ous:orderStatus":["Available for pickup"],"ous:orderType":["Hold"],"ous:holdQueuePosition":["1"],"ous:pickUpExpiryDate":["2015-11-06T00:00:00+01:00"],"ous:pickUpId":["1707"],"ous:pickUpAgency":["DK-737600"]}],"ous:ordersCount":["3"]}],"ous:fiscalAccount":[{"ous:totalAmount":["0"],"ous:totalAmountCurrency":["DKK"]}]}]}};

    let newResponse = userStatusTransform.responseTransform(response);

		assert.equal(newResponse.result.loanedItems.count, 0, '0 loaned items');

	});

	it('Response transform 2 loaned items', function() {

		let response = {"ous:getUserStatusResponse":{"$":{"xmlns:ous":"http://oss.dbc.dk/ns/openuserstatus","xmlns":"http://oss.dbc.dk/ns/openuserstatus"},"ous:userId":["1231231231"],"ous:userStatus":[{"ous:loanedItems":[{"ous:loan":[{"ous:author":["Hesel, Lene Ewald"],"ous:title":["Pokker ta' den rådne kat"],"ous:dateDue":["2015-11-24T00:00:00+01:00"],"ous:loanId":["5008917428"],"ous:reminderLevel":["1"]},{"ous:author":["Davis, Jim"],"ous:title":["Garfield på bølgen blå"],"ous:dateDue":["2015-11-24T00:00:00+01:00"],"ous:loanId":["3487223157"],"ous:reminderLevel":["1"]}],"ous:loansCount":["2"]}],"ous:orderedItems":[{"ous:ordersCount":["0"]}],"ous:fiscalAccount":[{"ous:totalAmount":["0"],"ous:totalAmountCurrency":["DKK"]}]}]}};

		assert.equal(JSON.stringify(userStatusTransform.responseTransform(response)), JSON.stringify({"result":{"orderedItems":{"count":0},"loanedItems":{"count":2,"loans":[{"author":"Hesel, Lene Ewald","title":"Pokker ta\' den rådne kat","dueDate":"2015-11-24T00:00:00+01:00","loanId":"5008917428"},{"author":"Davis, Jim","title":"Garfield på bølgen blå","dueDate":"2015-11-24T00:00:00+01:00","loanId":"3487223157"}]}},"info":{"userId":"1231231231"},"error":[]}), '2 loaned items');

	});

	it('Response transform user authentication error', function() {

		let response = {"ous:getUserStatusResponse":{"$":{"xmlns:ous":"http://oss.dbc.dk/ns/openuserstatus","xmlns":"http://oss.dbc.dk/ns/openuserstatus"},"ous:getUserStatusError":["User authentication failed"]}};

		assert.equal(JSON.stringify(userStatusTransform.responseTransform(response)), JSON.stringify({"result":{},"info":{},"error":["User authentication failed"]}), 'Authentication Error');

	});

	it('Response transform cancel order with error in request', function() {

		let response = {"ous:cancelOrderResponse":{"$":{"xmlns:ous":"http://oss.dbc.dk/ns/openuserstatus","xmlns":"http://oss.dbc.dk/ns/openuserstatus"},"ous:cancelOrderError":["Element rule violated"]}};

		assert.equal(JSON.stringify(cancelOrderTransform.responseTransform(response)), JSON.stringify({"result":{},"info":{},"error":["Element rule violated"]}), 'Error in request');

	});

	it('Response transform cancel order success', function() {

		let response = {"ous:cancelOrderResponse":{"$":{"xmlns:ous":"http://oss.dbc.dk/ns/openuserstatus","xmlns":"http://oss.dbc.dk/ns/openuserstatus"},"ous:cancelOrderStatus":[{"ous:orderId":["23516292"],"ous:orderCancelled":[""]}]}};

		assert.equal(JSON.stringify(cancelOrderTransform.responseTransform(response)), JSON.stringify({"result":{"orderCancelled":true},"info":{"orderId":["23516292"]},"error":[]}), 'Error in request');

	});

	it('Response transform cancel order, order not found', function() {

		let response = {"ous:cancelOrderResponse":{"$":{"xmlns:ous":"http://oss.dbc.dk/ns/openuserstatus","xmlns":"http://oss.dbc.dk/ns/openuserstatus"},"ous:cancelOrderStatus":[{"ous:orderId":["23516292"],"ous:cancelOrderError":["Unknown order"]}]}};

		assert.equal(JSON.stringify(cancelOrderTransform.responseTransform(response)), JSON.stringify({"result":{"orderCancelled":false},"info":{"orderId":["23516292"]},"error":[]}), 'Error in request');

	});


});
/* eslint-enable */
