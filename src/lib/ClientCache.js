'use strict';

/**
 * @file
 * Cache wrapper for Provider Client Methods
 */

import {forEach} from 'lodash';
import cacheManager from 'cache-manager';

/**
 * Central cache store object
 */
let store;

/**
 * Handles the callback from cachePromiseWrapper
 *
 * @param {Object} params
 * @api private
 */
function cachePromiseCallback(params) {
  const {cb, ttl, key, err, result, resolve, reject} = params;

  if (err) {
    reject(err);
  } else if (result) {
    // Cached version exists
    resolve(JSON.parse(result));
  } else {
    // No cache exists
    resolve(cb().then((value) => {
      store.set(key, JSON.stringify(value), ttl && {ttl});
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
 * @api private
 */
function cachePromiseWrapper(key, cb, ttl) {
  return new Promise((resolve, reject) => {
    store.get(key, (err, result) => {
      cachePromiseCallback({cb, ttl, key, resolve, reject, err, result});
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
 * @api private
 */
function methodCacheWrap(fn, ttl) {
  return (args) => {
    const key = JSON.stringify(args);
    return cachePromiseWrapper(key, () => fn(args), ttl);
  };
}

/**
 * Wraps the client methods with a promise cache layer
 *
 * @param {Object} methods the methods of a client
 * @param {Number} ttl optional cache time in seconds
 * @returns {Object} returns the methods wrapped in a cache layer
 * @api public
 */
function wrap(methods, ttl) {
  forEach(methods, (fn, key) => {
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
export default function CacheManager(config) {
  store = cacheManager.caching(config);
  return {wrap};
}
