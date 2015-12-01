'use strict';

/**
 * @file
 * Methods for triggering events on the provider
 */

import {isArray, isObject} from 'lodash';

function now() {
  let hr = process.hrtime();
  return (hr[0] * 1e9 + hr[1]) / 1000000;
}

/**
 * Ensures the connection object has the requested structure.
 * If for example redis is unavailable session will be undefined
 *
 * @param {Object} connection
 * @return {*}
 */
function ensureConnectionObject(connection) {
  if (!isObject(connection)) {
    connection = {};
  }

  if (!isObject(connection.request)) {
    connection.request = {};
  }

  if (!isObject(connection.request.session)) {
    connection.request.session = {};
  }

  return connection;
}

/**
 * Handles the request and response transform callback and returns a promise, which resolves to the final
 * response.
 *
 * @param event
 * @param query
 * @param _connection
 * @param logger
 * @returns {Array}
 */
export default function trigger(transform, query, _connection, logger) {
  logger = logger || {log(){}}; // eslint-disable-line
  const startTime = now();

  const connection = ensureConnectionObject(_connection);

  const requestTransformStartTime = now();
  const request = transform.requestTransform(event, query, connection);
  // make sure requests are an array
  const requestArray = isArray(request) && request || [request];

  const requestTransformsFinishedTime = now();
  const transformDelta = requestTransformsFinishedTime - requestTransformStartTime;

  // An array of promises is returned, one for each request in the request array
  // When each promise is resolved the transform response method is called.
  let result = requestArray.map((promise) => {
    return promise.then((response) => {
      return transform.responseTransform(response, query, connection);
    }).catch(console.log.bind(console));
  });

  const endTime = now();

  logger.log('info', `[TIMER] ${event} transform started at: ${startTime} ms`);
  logger.log('info', `[TIMER] ${event} requesttransform took ${transformDelta} ms...`);
  logger.log('info', `[TIMER] ${event} transform ended at: ${endTime} ms, and took ${(endTime - startTime)} ms.`);

  return result;
}
