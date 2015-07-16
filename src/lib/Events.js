'use strict';

/**
 * @file
 * Handles all provider events
 * @todo look into extending Node::EventEmitter
 */

const eventMap = new Map();
const Events = {};

/**
 *  Add event to event map
 *
 * @param {String} type
 * @param {String} event
 * @param {*} value
 * @throws {Error}
 */
Events.add = function (type, event, value) {
  const name = `${type}::${event}`;
  if (eventMap.has(name)) {
    throw new Error(`Event '${event}' already registered`);
  }
  eventMap.set(name, value);
};

/**
 * Retrieve event
 *
 * @param {String} type
 * @param {String} event
 * @returns {null|*}
 */
Events.get = function (type, event) {
  const name = `${type}::${event}`;
  if (!eventMap.has(name)) {
    throw new Error(`${event} of type ${type} is not a registered event`);
  }
  return eventMap.get(name);
};


export default Events;
