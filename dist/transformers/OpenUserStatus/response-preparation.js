'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkUserStatusResponse = checkUserStatusResponse;
exports.checkCancelOrderResponse = checkCancelOrderResponse;
function hasValidUserStatusResponse(response) {
  return response['ous:getUserStatusResponse'].hasOwnProperty('ous:userStatus');
}

function hasValidCancelOrdersResponse(response) {
  return response['ous:cancelOrderResponse'].hasOwnProperty('ous:cancelOrderStatus');
}

function checkUserStatusResponse(response) {

  if (hasValidUserStatusResponse(response) === true) {
    return response;
  }

  response.error = response['ous:getUserStatusResponse']['ous:getUserStatusError'][0];
  return response;
}

function checkCancelOrderResponse(response) {

  if (hasValidCancelOrdersResponse(response) === true) {
    return response;
  }

  response.error = response['ous:cancelOrderResponse']['ous:cancelOrderError'][0];
  return response;
}