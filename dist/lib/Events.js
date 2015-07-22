'use strict';

/**
 * @file
 * Handles all provider events
 * @todo look into extending Node::EventEmitter
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
var events = {};

/**
 *  Add event to event map
 *
 * @param {String} type
 * @param {String} event
 * @param {*} value
 * @throws {Error}
 */
function addEvent(type, event, value) {
  events[type] = events[type] || new Map();
  var name = '' + event;
  if (events[type].has(name)) {
    throw new Error('Event \'' + event + '\' already registered');
  }
  events[type].set(name, value);
}

/**
 * Retrieve event
 *
 * @param {String} type
 * @param {String} event
 * @returns {null|*}
 */
function getEvent(type, event) {
  var name = '' + event;
  if (!events[type]) {
    throw new Error('No events of type ' + type + ' is registered');
  }
  if (!events[type].has(name)) {
    throw new Error(event + ' of type ' + type + ' is not a registered event');
  }
  return events[type].get(name);
}

/**
 * Get events of a certain type
 *
 * @param type
 * @returns {*}
 */
function getEventsOfType(type) {
  return events[type];
}

/**
 * unset all registered events
 */
function resetEvents() {
  events = {};
}

exports['default'] = {
  addEvent: addEvent, getEvent: getEvent, resetEvents: resetEvents, getEventsOfType: getEventsOfType
};
module.exports = exports['default'];