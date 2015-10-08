'use strict';

/**
 * @file
 * Methods for triggering events on the provider
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = trigger;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _EventsJs = require('./Events.js');

var _EventsJs2 = _interopRequireDefault(_EventsJs);

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
 * @param {String} event
 * @param {Object || Array} query The query object/array
 * @param {Object} _connection
 */
function handleTriggerEvents(event, query, _connection) {
  var transform = _EventsJs2['default'].getEvent('transform', event);
  var connection = ensureConnectionObject(_connection);
  var request = transform.requestTransform(event, query, connection);
  // make sure requests are an array
  var requestArray = (0, _lodash.isArray)(request) && request || [request];

  // An array of promises is returned, one for each request in the request array
  // When each promise is resolved the transform response method is called.
  var result = requestArray.map(function (promise) {
    return promise.then(function (response) {
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

function trigger(event, params, connection) {
  return handleTriggerEvents(event, params, connection);
}

module.exports = exports['default'];