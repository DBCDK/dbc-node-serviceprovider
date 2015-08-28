'use strict';

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
  const eventName = `${event}Response`;
  responsePromise
    .then(response => connection.emit(eventName, response))
    .catch(error => connection.emit(eventName, {error}));
}

/**
 * Trigger event on provider, when an event is registered on a connection
 *
 * @param connection
 * @param provider
 * @param event
 */
function onEventOnConnection(connection, provider, event) {
  connection.on(`${event}Request`, (request) => {
    provider
      .trigger(event, request, connection)
      .forEach(responsePromise => handleResponse(connection, responsePromise, event));
  });
}

/**
 * Register events when a new connections is made.
 *
 * @param connection
 * @param provider
 */
function registerEventsOnConnection(connection, provider) {
  provider
    .getEventsOfType('transform')
    .forEach((value, event) => onEventOnConnection(connection, provider, event));
}

/**
 * Register events from the provider on new connections
 *
 * @param socket
 * @param provider
 * @constructor
 */
export default function SocketDispatcher(socket, provider) {
  socket.on('connection', (connection) => registerEventsOnConnection(connection, provider));
}
