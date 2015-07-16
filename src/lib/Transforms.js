'use strict';

/**
 * @file
 * Module for registering all transforms
 */

import Events from './Events.js';

let _transforms = [];

/**
 * Exported transform object
 *
 * @type {Object}
 * @api public
 */
const Transform = {};

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
    events.forEach((event)=> {
      Events.add('transform', event, transform);
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

  transform.callClient = (event, params) => {
    return Events.get('client', event)(params);
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
Transform.getTransforms = function getTransforms () {
  return _transforms;
};

export default Transform;
