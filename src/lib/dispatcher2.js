'use strict';

/**
 * @file
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 */
import {isObject} from 'lodash';
let Logger = null;

function now() {
  let hr = process.hrtime();
  return (hr[0] * 1e9 + hr[1]) / 1000000;
}

/**
 * Ensures the connection object has the requested structure.
 * If for example redis is unavailable session will be undefined
 *
 * @param {Object} connection
 * @return {*}
 */
function ensureConnectionObject(connection) {
  if (!isObject(connection)) {
    connection = {};
  }

  if (!isObject(connection.request)) {
    connection.request = {};
  }

  if (!isObject(connection.request.session)) {
    connection.request.session = {};
  }
  return connection;
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
    console.log(event);
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
function registerEventOnConnection(transform, connection) {
  const event = transform.event();
  connection.on(`${event}Request`, (request) => {
    transform.trigger(request, connection, (response) => connection.emit(`${event}Response`, response));
  });

}
/**
 * Register events from the provider on new connections
 *
 * @param socket
 * @param provider
 * @param logger
 * @constructor
 */
export default function Dispatcher(transforms, logger, io) {
  io.use((connection, next) => {
    connection.hest = 'true';
    next();
  });

  io.use((connection, next) => {
    transforms.forEach((transform) => registerEventOnConnection(transform, connection));
    next();
  });
}
