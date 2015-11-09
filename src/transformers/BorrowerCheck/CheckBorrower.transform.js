'use strict';

/**
 * @file
 * @type {{
 * event: (function()),
 * requestTransform: (function(string, string, Object): *),
 * responseTransform: (function({userId: string, requestStatus: string, raw: XML}): (response.requestStatus|{statusEnum, errorText}))
 * }}
 */
const CheckBorrower = {

  event() {
    return 'checkBorrower';
  },

  /**
   * @param {string} event
   * @param {string} query
   * @param {Object} connection
   * @return {*}
   */
  requestTransform(event, query, connection) { // eslint-disable-line no-unused-vars
    return this.callServiceClient('borchk', 'getBorrowerCheckResult', {
      userId: query.loanerID,
      userPincode: query.pincode,
      libraryCode: query.agencyID
    });
  },

  /**
   * @param {{userId: string, requestStatus: string, raw: XML}} response
   * @return {response.requestStatus|{statusEnum, errorText}}
   */
  responseTransform(response) {
    return {requestStatus: response.requestStatus};
  }
};

export default CheckBorrower;
