'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @file
 * Module for registering all transforms
 */

var _lodash = require('lodash');

var _EventsJs = require('./Events.js');

var _EventsJs2 = _interopRequireDefault(_EventsJs);

/**
 * Base Transform Methods that are inherited
 *
 * @type {{callClient: Function}}
 */
var BaseTransform = {
  callClient: function callClient(client, method, params) {
    var event = client + '::' + method;
    return _EventsJs2['default'].getEvent('client', event)(params);
  }
};

/**
 * Registers all events on a transform
 *
 * if an event already exists. An error is thrown
 *
 * @param events
 * @param transform
 * @api private
 */
function registerEvents(event, transform) {
  if (event) {
    _EventsJs2['default'].addEvent('transform', event, transform);
  }
}

/**
 * Factory method for the transforms defined in /transformers
 *
 * @param {Object} transform
 * @return {Object}
 * @throws {Error}
 * @api public
 */
function registerTransform(transform) {
  if (!transform.event) {
    throw new Error('No event method not found on transform');
  }

  if (!transform.requestTransform) {
    throw new Error('No requestTransform method not found on transform');
  }

  if (!transform.responseTransform) {
    throw new Error('No responseTransform method not found on transform');
  }

  registerEvents(transform.event(), transform);

  (0, _lodash.extend)(transform, BaseTransform);

  return transform;
}

exports['default'] = { registerTransform: registerTransform };
module.exports = exports['default'];