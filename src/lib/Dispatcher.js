'use strict';

/**
 * @file
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 */

/**
 * Register events when a new connections is made.
 *
 * @param connection
 * @param logger
 * @param provider
 */
function registerEventOnConnection(transform, logger, connection) {
  const event = transform.event();
  connection.on(`${event}Request`, (request) => {
    logger.log('debug', `${event}Request`, request);
    var startTime = Date.now();
    transform.trigger(request, connection).forEach((responsePromise) => {
      responsePromise
        .then(response => {
          logger.log('debug', `${event}Response`, response);
          logger.log('info', `${event}Response time`, Date.now() - startTime);
          connection.emit(`${event}Response`, response);
        })
        .catch(error => {
          logger.log('warning', `Error in ${event}Response`, error);
          connection.emit(`${event}Response`, {error});
        });
    });
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
  // On socket.io it would make more sense to use `io.use(...)` instead of
  // `io.on('connection'...)`, but io.use is not supported on socketcluster yet.
  io.on('connection', (connection) => {
    transforms.forEach((transform) => registerEventOnConnection(transform, logger, connection));
  });
}
