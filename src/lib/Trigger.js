'use strict';

import {isArray} from 'lodash';
import Events from './Events.js';

/**
 * Handles the request and response transform callback and returns a promise, which resolves to the final
 * response.
 *
 * @param {Object} transform The transform object
 * @param {String} event
 * @param {Object || Array} query The query object/array
 */
function handleTriggerEvents(event, query) {
  const transform = Events.getEvent('transform', event, query);
  const request = transform.requestTransform(event, query);
  // make sure requests are an array
  const requestArray = isArray(request) && request || [request];

  // An array of promises is returned, one for each request in the request array
  // When each promise is resolved the transform response method is called.
  let result = requestArray.map((promise) => {
    return promise.then((response) => {
      return transform.responseTransform(response, query);
    });
  });

  return result;
}


/**
 * Triggers an event with the given parameters. Returns an array of promises that resolves the request
 *
 * @param {String} event
 * @param {Object} params
 * @returns {Array}
 */
export default function trigger(event, params, connection) {
  return handleTriggerEvents(event, params, connection);
}
