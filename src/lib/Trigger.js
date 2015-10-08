'use strict';

/**
 * @file
 * Methods for triggering events on the provider
 */

import {isArray, isObject} from 'lodash';
import Events from './Events.js';

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
 * @param {String} event
 * @param {Object || Array} query The query object/array
 * @param {Object} _connection
 */
function handleTriggerEvents(event, query, _connection) {
  const transform = Events.getEvent('transform', event);
  const connection = ensureConnectionObject(_connection);
  const request = transform.requestTransform(event, query, connection);
  // make sure requests are an array
  const requestArray = isArray(request) && request || [request];

  // An array of promises is returned, one for each request in the request array
  // When each promise is resolved the transform response method is called.
  let result = requestArray.map((promise) => {
    return promise.then((response) => {
      return transform.responseTransform(response, query, connection);
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
 * @param connection
 */
export default function trigger(event, params, connection) {
  return handleTriggerEvents(event, params, connection);
}
