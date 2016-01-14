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
 * @param provider
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Dispatcher;
function registerEventOnConnection(transform, connection) {
  var event = transform.event();
  connection.on(event + 'Request', function (request) {
    transform.trigger(request, connection).forEach(function (responsePromise) {
      responsePromise.then(function (response) {
        return connection.emit(event + 'Response', response);
      })['catch'](function (error) {
        return connection.emit(event + 'Response', { error: error });
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

function Dispatcher(transforms, logger, io) {
  io.use(function (connection, next) {
    transforms.forEach(function (transform) {
      return registerEventOnConnection(transform, connection);
    });
    next();
  });
}

module.exports = exports['default'];