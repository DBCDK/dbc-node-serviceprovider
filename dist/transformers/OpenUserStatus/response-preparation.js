'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkUserStatusResponse = checkUserStatusResponse;
function hasValidUserStatusResponse(response) {
  return response['ous:getUserStatusResponse'].hasOwnProperty('ous:userStatus');
}

function checkUserStatusResponse(response) {

  if (hasValidUserStatusResponse(response) === true) {
    return response;
  }

  response.error = response['ous:getUserStatusResponse']['ous:getUserStatusError'];
  return response;
}