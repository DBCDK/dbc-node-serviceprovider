'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkHoldingStatusResponse = checkHoldingStatusResponse;
function hasValidUserStatusResponse(response) {
  return response.hasOwnProperty('responder');
}

function checkHoldingStatusResponse(response) {

  if (hasValidUserStatusResponse(response) === true) {
    return response;
  }

  var pid = response.error.pid;

  response.error = response.error.errorMessage;
  response.pid = pid;
  return response;
}