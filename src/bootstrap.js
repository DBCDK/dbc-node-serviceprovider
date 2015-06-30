'use strict';

import path from 'path';
import walker from 'walk';

/**
 * Traverses the filetree under ./transformers and looks for files named
 * transform.js. All files found with that name are considered a transform and
 * added to the pool of transforms that later will be passed to the
 * disspatchers.
 */
function discoverFiles(folder, namespace) {
  let files = new Array();
  const walkOptions = {
    listeners: {
      file: (root, fileStats, next) => {
        if (fileStats.name.indexOf(namespace) >= 0) {
          files.push(path.join(root, fileStats.name));
        }
        next();
      },
      errors: (root, nodeStatsArray, next) => {
        if (nodeStatsArray[0].error) {
          console.log(nodeStatsArray[0].error);
          console.log(' at: ' + path.join(root, nodeStatsArray[0].name));
        }
        next();
      }
    }
  };
  walker.walkSync(path.join(__dirname, folder), walkOptions);
  return files;
}


export function autoRequire (folder, namespace) {
  discoverFiles(folder, namespace).map(require);
}