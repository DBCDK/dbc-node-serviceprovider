'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = SocketDispatcher;
/**
 * @file
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 */

/**
 * Handle promises being resolved or rejected
 *
 * @param connection
 * @param responsePromise
 * @param event
 */
function handleResponse(connection, responsePromise, event) {
  var eventName = event + 'Response';
  responsePromise.then(function (response) {
    return connection.emit(eventName, response);
  })['catch'](function (error) {
    return connection.emit(eventName, { error: error });
  });
}

/**
 * Trigger event on provider, when an event is registered on a connection
 *
 * @param connection
 * @param event
 */
function onEventOnConnection(connection, provider, event) {
  connection.on(event + 'Request', function (request) {
    provider.trigger(event, request).forEach(function (responsePromise) {
      return handleResponse(connection, responsePromise, event);
    });
  });
}

/**
 * Register events when a new connections is made.
 *
 * @param connection
 * @param provider
 */
function registerEventsOnConnection(connection, provider) {
  provider.getEventsOfType('transform').forEach(function (value, event) {
    return onEventOnConnection(connection, provider, event);
  });
}

/**
 * Register events from the provider on new connections
 *
 * @param socket
 * @param provider
 * @constructor
 */

function SocketDispatcher(socket, provider) {
  socket.on('connection', function (connection) {
    return registerEventsOnConnection(connection, provider);
  });
}

module.exports = exports['default'];