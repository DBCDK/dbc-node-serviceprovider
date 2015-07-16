'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = trigger;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _EventsJs = require('./Events.js');

var _EventsJs2 = _interopRequireDefault(_EventsJs);

/**
 * Handles the request and response transform callback and returns a promise, which resolves to the final
 * response.
 *
 * @param {Object} transform The transform object
 * @param {String} event
 * @param {Object || Array} query The query object/array
 */

function handleTriggerEvents(event, query) {
  var transform = _EventsJs2['default'].get('transform', event, query);
  var request = transform.requestTransform(event, query);

  // make sure requests are an array
  var requestArray = (0, _lodash.isArray)(request) && request || [request];

  // An array of promises is returned, one for each request in the request array
  // When each promise is resolved the transform response method is called.
  var result = requestArray.map(function (promise) {
    return promise.then(function (response) {
      var responseValue = transform.responseTransform(response, event);
      return responseValue;
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

function trigger(event, params) {
  return handleTriggerEvents(event, params);
}

module.exports = exports['default'];