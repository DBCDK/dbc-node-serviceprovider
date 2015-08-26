'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkPolicyResponse = checkPolicyResponse;
exports.checkOrderResponse = checkOrderResponse;
function hasValidPolicyResponse(response) {
  return response.checkOrderPolicyResponse.hasOwnProperty('orderPossible');
}

function checkPolicyResponse(response) {

  if (hasValidPolicyResponse(response) === true) {
    return response;
  }

  response.error = response.checkOrderPolicyResponse.checkOrderPolicyError;
  return response;
}

function hasValidOrderResponse(response) {
  return response.hasOwnProperty('placeOrderResponse');
}

function checkOrderResponse(response) {

  if (hasValidOrderResponse(response) === true) {
    return response;
  }

  response.error = 'Fejl ved bestilling';
  return response;
}