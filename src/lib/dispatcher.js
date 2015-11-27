'use strict';

/**
 * @file
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 */

let Logger = null;

function now() {
  let hr = process.hrtime();
  return (hr[0] * 1e9 + hr[1]) / 1000000;
}

/**
 * Handle promises being resolved or rejected
 *
 * @param connection
 * @param responsePromise
 * @param event
 */
function handleResponse(connection, responsePromise, event) {
  const eventName = `${event}Response`;
  const start = now();
  responsePromise
    .then(response => {
      const end = now();
      connection.emit(eventName, response);
      Logger.log('info', 'Got a response to deliver by sockets', JSON.stringify({
        event: event,
        response: response,
        conection: (connection && connection.request && connection.request.session) ? connection.request.session : {},
        time_delta: end - start
      }));
    })
    .catch(error => {
      connection.emit(eventName, {error});
      Logger.log('error', 'An error occured while communicating with a service', JSON.stringify({
        event: event,
        error: error,
        conection: (connection && connection.request && connection.request.session) ? connection.request.session : {}
      }));
    });
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

    Logger.log('info', 'Got a request by sockets', {
      event: event,
      request: request,
      conection: (connection && connection.request && connection.request.session) ? connection.request.session : {}
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
  provider
    .getEventsOfType('transform')
    .forEach((value, event) => onEventOnConnection(connection, provider, event));
}

/**
 * Register events from the provider on new connections
 *
 * @param socket
 * @param provider
 * @param logger
 * @constructor
 */
export default function SocketDispatcher(provider, logger, socket) {
  Logger = logger;
  socket.on('connection', (connection) => registerEventsOnConnection(connection, provider));
}
