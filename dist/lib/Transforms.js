'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @file
 * Module for registering all transforms
 */

var _EventsJs = require('./Events.js');

var _EventsJs2 = _interopRequireDefault(_EventsJs);

var _transforms = [];

/**
 * Exported transform object
 *
 * @type {Object}
 * @api public
 */
var Transform = {};

/**
 * Registers all events on a transform
 *
 * if an event already exists. An error is thrown
 *
 * @param events
 * @param transform
 * @api private
 */
function registerEvents(events, transform) {
  if (events) {
    events.forEach(function (event) {
      _EventsJs2['default'].add('transform', event, transform);
    });
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
Transform.registerTransform = function registerTransform(transform) {
  if (!transform.events) {
    throw new Error('No events method not found on transform');
  }

  if (!transform.requestTransform) {
    throw new Error('No requestTransform method not found on transform');
  }

  if (!transform.responseTransform) {
    throw new Error('No responseTransform method not found on transform');
  }

  registerEvents(transform.events(), transform);

  transform.callClient = function (event, params) {
    return _EventsJs2['default'].get('client', event)(params);
  };
  _transforms.push(transform);

  return transform;
};

/**
 * Get transforms Array
 * @todo remove when dispatcher has been refactored
 *
 * @returns {Array}
 */
Transform.getTransforms = function getTransforms() {
  return _transforms;
};

exports['default'] = Transform;
module.exports = exports['default'];