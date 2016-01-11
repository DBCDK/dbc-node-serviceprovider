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
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Dispatcher;

function Dispatcher(transforms, logger, io) {
  io.on('connection', function (connection) {
    transforms.forEach(function (transform) {
      var event = transform.event();
      connection.on(event + 'Request', function (data) {
        transform.trigger(data, connection).forEach(function (responsePromise) {
          responsePromise.then(function (response) {
            connection.emit(event + 'Response', response);
          })['catch'](function (error) {
            connection.emit(event + 'Response', error);
          });
        });
      });
    });
  });
}

module.exports = exports['default'];