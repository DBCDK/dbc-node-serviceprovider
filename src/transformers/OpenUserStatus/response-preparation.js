'use strict';

function hasValidUserStatusResponse(response) {
  return response['ous:getUserStatusResponse'].hasOwnProperty('ous:userStatus');
}

export function checkUserStatusResponse(response) {

  if (hasValidUserStatusResponse(response) === true) {
    return response;
  }

  response.error = response['ous:getUserStatusResponse']['ous:getUserStatusError'];
  return response;

}
