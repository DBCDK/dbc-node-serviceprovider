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
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Dispatcher;
function registerEventOnConnection(transform, logger, connection) {
  var event = transform.event();
  connection.on(event + 'Request', function (request) {
    var startTime = Date.now();
    transform.trigger(request, connection).forEach(function (responsePromise) {
      responsePromise.then(function (response) {
        logger.log('info', event + 'Response time', Date.now() - startTime);
        connection.emit(event + 'Response', response);
      })['catch'](function (error) {
        // Make sure that `error` is serialisable,
        // as we will send it to log, and across socket connection.
        // Notice: socketcluster may try to serialise prototype,
        // while `JSON.parse(JSON.stringify...` makes sure that
        // we have a plain js object, and also throws if it is cyclic etc.
        try {
          error = JSON.parse(JSON.stringify(error));
        } catch (_) {
          error = 'unserialisable error';
        }

        logger.log('warning', 'ResponseError', { event: event, error: error, time: Date.now() - startTime });
        connection.emit(event + 'Response', { error: error });
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
  // On socket.io it would make more sense to use `io.use(...)` instead of
  // `io.on('connection'...)`, but io.use is not supported on socketcluster yet.
  io.on('connection', function (connection) {
    transforms.forEach(function (transform) {
      return registerEventOnConnection(transform, logger, connection);
    });
  });
}

module.exports = exports['default'];