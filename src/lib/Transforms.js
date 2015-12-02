'use strict';

/**
 * @file
 * Module for registering all transforms
 */

import {isArray} from 'lodash';

/**
 * Validate the transform object.
 *
 * @param {Object} transform
 * @return {Object}
 * @throws {Error}
 * @api public
 */
function validateTransform(transform) {
  if (!transform.event) {
    throw new Error('No event method not found on transform');
  }

  if (!transform.requestTransform) {
    throw new Error('No requestTransform method not found on transform');
  }

  if (!transform.responseTransform) {
    throw new Error('No responseTransform method not found on transform');
  }
  return transform;
}

/**
 *
 * @param transform
 * @param clients
 * @param logger
 * @returns {trigger}
 */
export default function Transform(transform, clients, logger) {
  validateTransform(transform);
  transform.clients = clients;
  transform.logger = logger;

  /**
   *
   * @deprecated
   * Call the clients directly through the clients object. this.clients.clientName.method(params);
   *
   * @param client
   * @param method
   * @param params
   * @returns {*}
   */
  transform.callServiceClient = function callServiceClient(client, method, params) {
    return clients[client][method](params);
  };

  /**
   * Trigger request on a transform
   *
   * @param params
   * @param context
   * @param callback
   */
  transform.trigger = function trigger(params, context, callback) {
    const request = transform.requestTransform(transform.event(), params, context);
    const requests = isArray(request) && request || [request];
    console.log(transform.event(), 'trigger');
    requests.forEach((request) => {
      request
        .then((response) => callback(transform.responseTransform(response, context)))
        .catch((error) => console.log(error));
    });
  }

  return transform;
}
