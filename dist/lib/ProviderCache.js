'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = CacheManager;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _cacheManager = require('cache-manager');

var _cacheManager2 = _interopRequireDefault(_cacheManager);

var store = undefined;

/**
 * Handles the callback from cachePromiseWrapper
 *
 * @param {Object} params
 */
function cachePromiseCallback(params) {
  var cb = params.cb;
  var ttl = params.ttl;
  var key = params.key;
  var err = params.err;
  var result = params.result;
  var resolve = params.resolve;
  var reject = params.reject;

  if (err) {
    reject(err);
  } else if (result) {
    resolve(result);
  } else {
    resolve(cb().then(function (value) {
      store.set(key, value, ttl && { ttl: ttl });
      return value;
    }));
  }
}

/**
 * Retrieves a value from the cache store from key, If no cache exists, a callback method is called
 * The callback method has to return a promise.
 *
 * @param {String} key Cache key
 * @param {Function} cb Callback method. Required to return a Promise
 * @param {Number} ttl optional cache time
 * @returns {Promise}
 */
function cachePromiseWrapper(key, cb, ttl) {

  return new Promise(function (resolve, reject) {
    store.get(key, function (err, result) {
      cachePromiseCallback({ cb: cb, ttl: ttl, key: key, resolve: resolve, reject: reject, err: err, result: result });
    });
  });
}

/**
 * Simple Wrapper for the indiviual client method
 *
 * Encapsulates the settings used for the cachePromiseWrapper
 *
 * @param fn
 * @param ttl
 * @returns {Function}
 */
function methodCacheWrap(fn, ttl) {
  return function (args) {
    var key = JSON.stringify(args);
    return cachePromiseWrapper(key, function () {
      return fn(args);
    }, ttl);
  };
}

/**
 * Wraps the client methods with a promise cache layer
 *
 * @param {Object} methods the methods of a client
 * @param {Number} ttl optional cache time in seconds
 * @returns {Object} returns the methods wrapped in a cache layer
 */
function wrap(methods, ttl) {
  (0, _lodash.forEach)(methods, function (fn, key) {
    methods[key] = methodCacheWrap(fn, ttl);
  });
  return methods;
}

/**
 * Constructor for a CacheManager.
 *
 * Sets up a cache store using the applied configurations.
 *
 * usage:
 * const manager = CacheManager({
 *    store: 'memory',
 *    ttl: 3600 //minutes
 * });
 *
 * const wrappedMethods = manager.wrap(Client.METHODS);
 *
 * @todo Add support for redis and Memcache
 *
 * @param config
 * @returns {{wrap: wrap, store: *}}
 * @constructor
 */

function CacheManager(config) {
  store = _cacheManager2['default'].caching(config);

  return {
    wrap: wrap,
    store: store
  };
}

module.exports = exports['default'];