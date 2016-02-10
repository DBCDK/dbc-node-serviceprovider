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
    var startTime = Date.now();
    transform.trigger(request, connection).forEach((responsePromise) => {
      responsePromise
        .then(response => {
          logger.log('info', `${event}Response time`, Date.now() - startTime);
          connection.emit(`${event}Response`, response);
        })
        .catch(error => {
          // Make sure that `error` is serialisable,
          // as we will send it to log, and across socket connection.
          try {
            JSON.stringify(error); // for side-effect: throws if unserialisable
          } catch (_) {
            error = 'unserialisable error';
          }

          logger.log('warning', 'ResponseError', {event, error, time: Date.now() - startTime});
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
  io.use((connection, next) => {
    transforms.forEach((transform) => registerEventOnConnection(transform, logger, connection));
    next();
  });
}
