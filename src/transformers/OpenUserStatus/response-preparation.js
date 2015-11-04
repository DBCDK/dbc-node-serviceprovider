'use strict';

function hasValidUserStatusResponse(response) {
  return response['ous:getUserStatusResponse'].hasOwnProperty('ous:userStatus');
}

function hasValidCancelOrdersResponse(response) {
  return response['ous:cancelOrderResponse'].hasOwnProperty('ous:cancelOrderStatus');
}

export function checkUserStatusResponse(response) {

  if (hasValidUserStatusResponse(response) === true) {
    return response;
  }

  response.error = response['ous:getUserStatusResponse']['ous:getUserStatusError'][0];
  return response;

}

export function checkCancelOrderResponse(response) {

  if (hasValidCancelOrdersResponse(response) === true) {
    return response;
  }

  response.error = response['ous:cancelOrderResponse']['ous:cancelOrderError'][0];
  return response;

}
