'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkResponse = checkResponse;
function hasValidResponse(response) {
  return response.checkOrderPolicyResponse.hasOwnProperty('orderPossible');
}

function checkResponse(response) {

  if (hasValidResponse(response) === true) {
    return response;
  }

  response.error = response.checkOrderPolicyResponse.checkOrderPolicyError;
  return response;
}