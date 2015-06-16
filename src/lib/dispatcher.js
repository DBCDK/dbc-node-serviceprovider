'use strict';

import {isArray} from 'lodash';

/**
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 */
function Dispatcher() {

  /**
   * Contains all eventlisteners that should be instantiated on new connections
   * @type {Map}
   */
  let _listeners = new Map();
  let _connections = [];

  /**
   * When the given promise is completed an event will be emitted.
   *
   * @param {Object} transform The transform object
   * @param event
   * @param {Socket} connection The socket connection on which the response the
   * event should be emitted.
   * @param {Promise} promise A promise returned from the client.
   */
  function emitPromise(transform, event, connection, promise) {
    promise.then((data) => {
      if (transform.responseTransform) {
        data = transform.responseTransform(data);
      }
      connection.emit(event + 'Response', data);
    }).catch((err) => {
      console.log('error: ', err); //TODO better error handling
    });
  }

  /**
   * Handles the transform callback and emitting the response.
   *
   * @param {Object} transform The transform object
   * @param event
   * @param {Object || Array} query The query object/array
   * @param {Object || null} user The user object
   * @param {Socket} connection The socket connection on which the response the
   * event should be emitted.
   */
  function handleListenerCallback(transform, event, query, connection) {
    const response = transform.requestTransform(event, query);
    if (isArray(response)) {
      response.forEach((promise) => {
        emitPromise(transform, event, connection, promise);
      });
    }
    else {
      emitPromise(transform, event, connection, response);
    }
  }

  /**
   * Callback method for new connections
   *
   * @param {Socket} connection a new socket connection
   */
  function makeConnection(connection) {
    _listeners.forEach((transform, event) => {
      connection.on(event + 'Request', (query) => {
        handleListenerCallback(transform, event, query, connection);
      });
    });
  }

  /**
   * Add new listener
   *
   * Listeners are added to an array of listeners that will be initiated on
   * new connections
   *
   * @param event
   * @param transform
   */
  function addTransformListener(event, transform) {
    if (_listeners.has(event)) {
      throw new Error('Event already exsists: ' + event);
    }
    else {
      _listeners.set(event, transform);
    }
  }

  function getUserConnections(user) {
    return _connections.filter((connection) => {
      return connection.user === user;
    });
  }

  function registerTransformListeners(transforms) {
    transforms.forEach((transform) => {
      const events = transform.events();
      events.forEach((event) => addTransformListener(event, transform));
    });
  }

  /**
   * Initialize dispatcher with a socket.io server
   *
   * @param  {Socket} io instance of socket.io
   * @param {Object[]} transforms Array of transform objects
   * @return {null}
   */
  function init(io, transforms) {
    registerTransformListeners(transforms);
    io.on('connection', makeConnection);
  }

  return {
    init: init
  };
}

export default Dispatcher;
