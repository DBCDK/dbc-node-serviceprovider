/**
 * Contains all eventlisteners that should be instantiated on new connections
 * @type {Array}
 */
'use strict';

var _listeners = [];
var _connections = [];

/**
 * The Dispatcher is a wrapper for socket.io. It will handle all communication
 * between server and client
 *
 * @param {[Object]} server a node http server is needed to initialize socket.io
 */
function Dispatcher() {

  /**
   * Callback method for new connections
   * @param  {Socket} connection a new socket connection
   * @return {null}
   */
  function makeConnection(connection) {
    var user = connection.request.session && connection.request.session.passport && connection.request.session.passport.user || null;
    _listeners.map(function(listener) {
      connection.on(listener.type + 'Request', function(data) {
        listener.callback(data, user).then(function(data) {
          connection.emit(listener.type + 'Response', data);
        });
      });
    });
  }

  /**
   * Add new listener
   *
   * Listeners are added to an array of listeners that will be initiated on
   * new connections
   *
   * @param {String}   type     Type of event to listen for
   * @param {Function} callback Callback function on event
   */
  function addListener(type, callback) {
    _listeners.push({
      type: type,
      callback: callback
    });
  }

  function getUserConnections(user) {
    return _connections.filter(function(connection) {
      return connection.user === user;
    });
  }

  function emitToUser(user, type, data) {
    var connections = getUserConnections(user);
    connections.map(function(connection) {
      return connection.emit(type, data);
    });
  }

  /**
   * Initialize dispatcher with a socket.io server
   * @param  {IoSocketServer} io instance of socket.io
   * @return {null}
   */
  function init(io) {
    io.on('connection', makeConnection);
  }

  // Return factory, with a method for adding an event listener
  return {
    init: init,
    listen: addListener,
    emitToUser: emitToUser
  };
}

// Export Dispatcher module
module.exports = Dispatcher;
