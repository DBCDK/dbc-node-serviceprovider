'use strict';

/**
 * @file
 * Methods for triggering events on the provider
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = trigger;
exports.getLoggingTrigger = getLoggingTrigger;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _EventsJs = require('./Events.js');

var _EventsJs2 = _interopRequireDefault(_EventsJs);

function now() {
  var hr = process.hrtime();
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
  if (!(0, _lodash.isObject)(connection)) {
    connection = {};
  }

  if (!(0, _lodash.isObject)(connection.request)) {
    connection.request = {};
  }

  if (!(0, _lodash.isObject)(connection.request.session)) {
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
function handleTriggerEvents(event, query, _connection, logger) {
  logger = logger || { log: function log() {} }; // eslint-disable-line
  var startTime = now();

  var transform = _EventsJs2['default'].getEvent('transform', event);
  var connection = ensureConnectionObject(_connection);

  var requestTransformStartTime = now();
  var request = transform.requestTransform(event, query, connection);
  // make sure requests are an array
  var requestArray = (0, _lodash.isArray)(request) && request || [request];

  var requestTransformsFinishedTime = now();
  var transformDelta = requestTransformsFinishedTime - requestTransformStartTime;

  // An array of promises is returned, one for each request in the request array
  // When each promise is resolved the transform response method is called.
  var result = requestArray.map(function (promise) {
    return promise.then(function (response) {
      return transform.responseTransform(response, query, connection);
    });
  });

  var endTime = now();

  logger.log('info', '[TIMER] ' + event + ' transform started at: ' + startTime + ' ms');
  logger.log('info', '[TIMER] ' + event + ' requesttransform took ' + transformDelta + ' ms...');
  logger.log('info', '[TIMER] ' + event + ' transform ended at: ' + endTime + ' ms, and took ' + (endTime - startTime) + ' ms.');

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

function trigger(event, params, connection) {
  return handleTriggerEvents(event, params, connection);
}

/**
 * Gets a trigger function with a logger attached
 * @param logger
 * @returns {Function}
 */

function getLoggingTrigger(logger) {
  return function (event, params, connection) {
    return handleTriggerEvents(event, params, connection, logger);
  };
}