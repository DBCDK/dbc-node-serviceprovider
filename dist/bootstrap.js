'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.autoRequire = autoRequire;

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
  var files = new Array();
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
          console.log(nodeStatsArray[0].error);
          console.log(' at: ' + _path2['default'].join(root, nodeStatsArray[0].name));
        }
        next();
      }
    }
  };
  _walk2['default'].walkSync(_path2['default'].join(__dirname, folder), walkOptions);
  return files;
}

function autoRequire(folder, namespace) {
  discoverFiles(folder, namespace).map(require);
}