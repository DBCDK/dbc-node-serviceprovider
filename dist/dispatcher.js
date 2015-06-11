'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

/**
 * Contains all eventlisteners that should be instantiated on new connections
 * @type {Array}
 */
var _listeners = [];
var _connections = [];

/**
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 */
function Dispatcher() {

  /**
   * When the given promise is completed an event will be emitted.
   *
   * @param {Object} listener The listener object
   * @param {Socket} connection The socket connection on which the response the
   * event should be emitted.
   * @param {Promise} promise A promise returned from the client.
   */
  function emitPromise(listener, connection, promise) {
    promise.then(function (data) {
      connection.emit(listener.type + 'Response', data);
    })['catch'](function (err) {
      console.log('error: ', err); //TODO better error handling
    });
  }

  /**
   * Handles the listener callback and emitting the response.
   *
   * @param {Object} listener The listener object
   * @param {Object || Array} query The query object/array
   * @param {Object || null} user The user object
   * @param {Socket} connection The socket connection on which the response the
   * event should be emitted.
   */
  function handleListenerCallback(listener, query, user, connection) {
    var response = listener.callback(query, user);
    if ((0, _lodash.isArray)(response)) {
      response.forEach(function (promise) {
        emitPromise(listener, connection, promise);
      });
    } else {
      emitPromise(listener, connection, response);
    }
  }

  /**
   * Callback method for new connections
   *
   * @param {Socket} connection a new socket connection
   */
  function makeConnection(connection) {
    var user = connection.request.session && connection.request.session.passport && connection.request.session.passport.user || null;
    _listeners.map(function (listener) {
      connection.on(listener.type + 'Request', function (query) {
        handleListenerCallback(listener, query, user, connection);
      });
    });
  }

  /**
   * Add new listener
   *
   * Listeners are added to an array of listeners that will be initiated on
   * new connections
   *
   * @param {String}   type     Type of event to listen for
   * @param {Function} callback Callback function on event
   */
  function addListener(type, callback) {
    _listeners.push({
      type: type,
      callback: callback
    });
  }

  function getUserConnections(user) {
    return _connections.filter(function (connection) {
      return connection.user === user;
    });
  }

  /**
   * Emits the given type of event with the given data to the given user.
   * ¨
   * @param {Object} user The user object.
   * @param {String} type A string representing the event that should be emitted
   * @param {Object || Array} data The data object returned by the client.
   */
  function emitToUser(user, type, data) {
    var connections = getUserConnections(user);
    connections.map(function (connection) {
      return connection.emit(type, data);
    });
  }

  /**
   * Initialize dispatcher with a socket.io server
   * @param  {IoSocketServer} io instance of socket.io
   * @return {null}
   */
  function init(io) {
    io.on('connection', makeConnection);
  }

  // Return factory, with a method for adding an event listener
  return {
    init: init,
    listen: addListener,
    emitToUser: emitToUser
  };
}

// Export Dispatcher module
exports['default'] = Dispatcher;
module.exports = exports['default'];