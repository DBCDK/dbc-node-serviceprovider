'use strict';

/**
 * @file
 * Module for registering all transforms
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Transform;

var _lodash = require('lodash');

var _UtilsJs = require('./Utils.js');

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

function Transform(transform, clients) {
  var logger = arguments.length <= 2 || arguments[2] === undefined ? console : arguments[2];

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
  transform.trigger = function trigger(params, context) {
    var requestStart = (0, _UtilsJs.now)();
    var event = transform.event();
    var request = transform.requestTransform(event, params, context);
    var requests = (0, _lodash.isArray)(request) && request || [request];
    return requests.map(function (requestPromise) {
      return requestPromise.then(function (response) {
        var transformedResponse = transform.responseTransform(response, params, context);
        var requestStop = (0, _UtilsJs.now)();
        logger.log('info', 'Transform has been triggered', {
          event: event,
          timing: requestStop - requestStart,
          request: params,
          /* Do not log `response` objects
           * as these sometimes include large data,
           * - especially with mobilsoeg-profile transforms -
           * which has a bad performance impact
           * when the logger tries to serialise it.
          //serviceReponse: response,
           */
          finalResponse: transformedResponse
        });
        return transformedResponse;
      });
    });
  };

  return transform;
}

module.exports = exports['default'];