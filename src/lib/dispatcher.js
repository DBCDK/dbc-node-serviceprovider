'use strict';

/**
 * @file
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 */

/**
 * Register events from the provider on new connections
 *
 * @param socket
 * @param provider
 * @param logger
 * @constructor
 */
export default function Dispatcher(transforms, logger, io) {
  io.on('connection', function(connection) {
    transforms.forEach((transform) => {
      const event = transform.event();
      connection.on(`${event}Request`, (data) => {
        transform.trigger(data, connection).forEach((responsePromise) => {
          responsePromise
            .then((response) => {
              connection.emit(`${event}Response`, response);
            })
            .catch((error) => {
              connection.emit(`${event}Response`, error);
            });
        });
      });
    });
  });
}
