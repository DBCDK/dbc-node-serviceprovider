'use strict';

/**
 * @file
 * Cache wrapper for Provider Client Methods
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ClientCache;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _cacheManager = require('cache-manager');

var _cacheManager2 = _interopRequireDefault(_cacheManager);

/**
 * Converts a promise to a callback. Is needed to use cachemanager.wrap that expects a callback
 *
 * @param promise
 * @param callback
 */
function promiseAsCallback(promise, callback) {
  promise.then(function (result) {
    return callback(null, JSON.stringify(result));
  })['catch'](function (err) {
    return callback(err, null);
  });
}

/**
 * Constructor for a CacheManager.
 *
 * Sets up a cache store using the applied configurations.
 *
 * @example
 * const manager = CacheManager({
 *    store: 'memory',
 *    ttl: 3600 //minutes
 * });
 *
 * const wrappedMethods = manager.wrap(Client.METHODS);
 *
 * @param config
 * @returns {{wrap: wrap, store: *}}
 * @constructor
 */

function ClientCache(config) {
  var _this = this;

  var logger = arguments.length <= 1 || arguments[1] === undefined ? console : arguments[1];

  var manager = _cacheManager2['default'].caching(config);

  /**
   * Simple Wrapper for the indiviual client method
   *
   * Encapsulates the settings used for the cachePromiseWrapper
   *
   * @param fn function that is called
   * @param ttl time to live
   * @param params params for function call
   * @returns {Promise}
   * @api private
   */
  function wrapMethodInCache(fn, fnName, ttl, params) {
    var key = fnName + JSON.stringify(params);
    return new Promise(function (resolve, reject) {
      manager.wrap(key, function (cb) {
        promiseAsCallback(fn(params), cb);
      }, { ttl: ttl }, function (err, result) {
        if (err) {
          logger.error('Promise was rejected in cachePromiseCallback', { error: err, params: params });
          reject(err);
        } else {
          resolve(JSON.parse(result));
        }
      });
    });
  }

  /**
   * Wraps the client methods with a promise cache layer
   *
   * @param {Object} methods the methods of a client
   * @param {Number} ttl optional cache time in seconds
   * @returns {Object} returns the methods wrapped in a cache layer
   * @api public
   */
  return function (methods, ttl) {
    return (0, _lodash.mapValues)(methods, function (fn, fnName) {
      return wrapMethodInCache.bind(_this, fn, fnName, ttl);
    });
  };
}

module.exports = exports['default'];