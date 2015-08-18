'use strict';

function hasValidResponse(response) {
  return response.checkOrderPolicyResponse.hasOwnProperty('orderPossible');
}

export function checkResponse(response) {

  if (hasValidResponse(response) === true) {
    return response;
  }

  response.error = response.checkOrderPolicyResponse.checkOrderPolicyError;
  return response;

}
