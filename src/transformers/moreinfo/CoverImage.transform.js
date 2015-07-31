'use strict';

import * as prep from './response-preparation.js';
import Transform from 'jsonpath-object-transform';

function getImagesFromResponse(result) {
  var template = {
    images: ['$.identifierInformation..coverImage.*', {
      url: '$..$value',
      size: '$..imageSize',
      format: '$..imageFormat'
    }]
  };
  var transformed = Transform(result, template);
  return transformed;
}


const CoverImageTransform = {

  event() {
    return 'getCoverImage';
  },

  /**
   * Transforms the request from the app to MoreInfo request parameters
   *
   * @param {Array} the pid from Open Search
   * @return {Array} request parameters using More Info terminology
   */
  requestTransform(request, data) { // eslint-disable-line
    let identifiers = data.map((pid) => pid.split(':').pop());
    return this.callServiceClient('moreinfo', 'getMoreInfoResult', {identifiers});
  },

  /**
   * Transforms the respone from the MoreInfo webservice to a representation
   * that can be used by the application
   *
   * @param {Object} the response from MoreInfo
   * @return {Object} the transformed result
   */
  responseTransform(response, identifiers) {
    let result = prep.checkResponse(response) || getImagesFromResponse(response);
    return {
      identifiers,
      result
    };
  }
};

export default CoverImageTransform;
