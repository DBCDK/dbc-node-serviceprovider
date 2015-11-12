'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

/**
 * @file
 * @type {{
 * event: (function()),
 * requestTransform: (function(string, string, Object): *),
 * responseTransform: (function({userId: string, requestStatus: string, raw: XML}): (response.requestStatus|{statusEnum, errorText}))
 * }}
 */
var CheckBorrower = {

  event: function event() {
    return 'checkBorrower';
  },

  /**
   * @param {string} event
   * @param {string} query
   * @param {Object} connection
   * @return {*}
   */
  requestTransform: function requestTransform(event, query) {
    // eslint-disable-line no-unused-vars

    var promises = [];

    var borchkPromise = this.callServiceClient('borchk', 'getBorrowerCheckResult', {
      userId: query.loanerID,
      userPincode: query.pincode,
      libraryCode: query.agencyID
    });
    promises.push(borchkPromise);

    var openAgencyPromise = this.callServiceClient('openagency', 'getAgencyBranches', {
      id: [query.agencyID]
    });
    promises.push(openAgencyPromise);

    return promises;
  },

  /**
   * @param {{userId: string, requestStatus: string, raw: XML}} response
   * @return {response.requestStatus|{statusEnum, errorText}}
   */
  responseTransform: function responseTransform(response) {

    var finalResponse = undefined;

    if (response.library) {
      (function () {
        // Transforming OpenAgency response
        var branchNames = {};
        (0, _lodash.forEach)(response.library.pickupAgency, function (lib) {
          var name = (0, _lodash.isArray)(lib.branchName) ? lib.branchName[0].$value : lib.branchName.$value;
          branchNames[lib.branchId] = name;
        });
        // save branchNames to session
        finalResponse = { branchNames: branchNames };
      })();
    } else {
      // Transforming Borchk response
      finalResponse = { requestStatus: response.requestStatus };
    }
    return finalResponse;
  }
};

exports['default'] = CheckBorrower;
module.exports = exports['default'];