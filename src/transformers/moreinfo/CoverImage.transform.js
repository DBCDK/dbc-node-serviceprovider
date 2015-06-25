'use strict';

import * as Provider from '../../Provider.js';
import * as prep from './response-preparation.js';
import Transform from 'jsonpath-object-transform';

function getImagesFromResponse(result) {
  var template = {
    images: ['$.identifierInformation..coverImage.*', {
      url: '$..$value',
      size: '$..imageSize',
      format: '$..imageFormat'
    }],
  };
  var transformed = Transform(result, template);
  return transformed;
}


export default Provider.registerTransform({

  _query: '',
  events() {
    return ['getCoverImage'];
  },

  getSearchResultList(request) {

  },

  /**
   * Transforms the request from the app to MoreInfo request parameters
   *
   * @param {Array} the pid from Open Search
   * @return {Array} request parameters using More Info terminology
   */

    requestTransform(request, data) {

    let identifiers = data.map((pid) => pid.split(":").pop());
    const MoreInfo = this.services.get('coverimage');
    return MoreInfo.getMoreInfoResult({identifiers}).map(promise => promise.then(response => {
        return {
          identifiers: data,
          result: getImagesFromResponse(response)
        }
    }));
  },

  /**
   * Transforms the respone from the MoreInfo webservice to a representation
   * that can be used by the application
   *
   * @param {Object} the response from MoreInfo
   * @return {Object} the transformed result
   */
    responseTransform(response) {
    //@todo fix hack created in requestTransform where
    return response;
    let data = {};
    data.result = [];

    let result = prep.checkResponse(response);

    if (result.errorcode != undefined) {
      data.result.push(result);
    } else {
      data.result = getImagesFromResponse(response);
    }
    return data;
  }
});
