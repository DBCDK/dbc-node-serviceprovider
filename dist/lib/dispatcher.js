'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

/**
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 */
function Dispatcher() {

  /**
   * Contains all eventlisteners that should be instantiated on new connections
   * @type {Map}
   */
  var _listeners = new Map();

  /**
   * When the given promise is completed an event will be emitted.
   *
   * @param {Object} transform The transform object
   * @param event
   * @param {Socket} connection The socket connection on which the response the
   * event should be emitted.
   * @param {Promise} promise A promise returned from the client.
   * @param {string} The query string sent from the client and passed on to the
   * service.
   * @throws {Error} Error If a promise is rejected an error is thrown.
   */
  function emitPromise(transform, event, connection, promise, query) {
    promise.then(function (data) {
      if (transform.responseTransform) {
        data = transform.responseTransform(data, query);
      }
      connection.emit(event + 'Response', data);
    })['catch'](function (err) {
      var error = { error: err };
      error = transform.responseTransform(error, query);
      connection.emit(event + 'Response', error);
      throw new Error('A promise was rejected: ', err);
    });
  }

  /**
   * Handles the transform callback and emitting the response.
   *
   * @param {Object} transform The transform object
   * @param event
   * @param {Object || Array} query The query object/array
   * @param {Socket} connection The socket connection on which the response the
   * event should be emitted.
   */
  function handleListenerCallback(transform, event, query, connection) {
    var response = transform.requestTransform(event, query);
    if ((0, _lodash.isArray)(response)) {
      response.forEach(function (promise) {
        emitPromise(transform, event, connection, promise, query);
      });
    } else {
      emitPromise(transform, event, connection, response, query);
    }
  }

  /**
   * Callback method for new connections
   *
   * @param {Socket} connection a new socket connection
   */
  function makeConnection(connection) {
    _listeners.forEach(function (transform, event) {
      connection.on(event + 'Request', function (query) {
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
    } else {
      _listeners.set(event, transform);
    }
  }

  function registerTransformListeners(transforms) {
    transforms.forEach(function (transform) {
      var events = transform.events();
      events.forEach(function (event) {
        return addTransformListener(event, transform);
      });
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

exports['default'] = Dispatcher;
module.exports = exports['default'];