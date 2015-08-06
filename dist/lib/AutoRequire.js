'use strict';

/**
 * @file
 * Module for requiring all modules in a folder with a specified namespace
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = autoRequire;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _walk = require('walk');

var _walk2 = _interopRequireDefault(_walk);

/**
 * Traverses the filetree under ./transformers and looks for files named
 * transform.js. All files found with that name are considered a transform and
 * added to the pool of transforms that later will be passed to the
 * disspatchers.
 */
function discoverFiles(folder, namespace) {
  var files = [];
  var walkOptions = {
    listeners: {
      file: function file(root, fileStats, next) {
        if (fileStats.name.indexOf(namespace) >= 0) {
          files.push(_path2['default'].join(root, fileStats.name));
        }
        next();
      },
      errors: function errors(root, nodeStatsArray, next) {
        if (nodeStatsArray[0].error) {
          console.error(nodeStatsArray[0].error); // eslint-disable-line
          console.error(' at: ' + _path2['default'].join(root, nodeStatsArray[0].name)); // eslint-disable-line
        }
        next();
      }
    }
  };
  _walk2['default'].walkSync(folder, walkOptions);
  return files;
}

/**
 * Returns required modules in a folder specific namespace
 *
 * @param {String} folder Folder to search
 * @param {String} namespace filename pattern e.g 'transform.js'. Not a regex
 * @returns {Array}
 */

function autoRequire(folder, namespace) {
  return discoverFiles(folder, namespace).map(require);
}

module.exports = exports['default'];