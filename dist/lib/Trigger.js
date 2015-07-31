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

/**
 * Handles the request and response transform callback and returns a promise, which resolves to the final
 * response.
 *
 * @param {Object} transform The transform object
 * @param {String} event
 * @param {Object || Array} query The query object/array
 */

var _EventsJs2 = _interopRequireDefault(_EventsJs);

function handleTriggerEvents(event, query) {
  var transform = _EventsJs2['default'].getEvent('transform', event);
  var request = transform.requestTransform(event, query);
  // make sure requests are an array
  var requestArray = (0, _lodash.isArray)(request) && request || [request];

  // An array of promises is returned, one for each request in the request array
  // When each promise is resolved the transform response method is called.
  var result = requestArray.map(function (promise) {
    return promise.then(function (response) {
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
 * @param connection
 */

function trigger(event, params, connection) {
  return handleTriggerEvents(event, params, connection);
}

module.exports = exports['default'];