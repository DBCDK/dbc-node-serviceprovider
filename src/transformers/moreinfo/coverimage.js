'use strict';

import * as Provider from '../../Provider.js';
import * as prep from './response-preparation.js';

export default Provider.registerTransform({

  _query: '',
  events() {
    return ['getCoverImage'];
  },
  
  getSearchResultList(request) {
    const MoreInfo = this.services.get('coverimage');
    return MoreInfo.getMoreInfoResult({
      identifiers: identifiers
    });
  },

  /**
   * Transforms the request from the app to MoreInfo request parameters
   *
   * @param {Array} the pid from Open Search
   * @return {Array} request parameters using More Info terminology
   */

  requestTransform(request) {

    let identifiers = [];
  
    request.forEach((value) => {
      value.forEach((pid) => {
        identifiers.push(pid.pid.split(":").pop());
      });
    });
  
    return identifiers;
  
  },

  /**
   * Transforms the respone from the MoreInfo webservice to a representation 
   * that can be used by the application
   *
   * @param {Object} the response from MoreInfo
   * @return {Object} the transformed result
   */

  responseTransform(response) {

    let data = {};
    data.result = [];
  
    let result = prep.checkResponse(response);
  
    if (result.errorcode != undefined) {
      data.result.push(result);
    } else {
      response.identifierInformation.forEach((identifier) => {
        if (identifier.identifierKnown == true) {
          let url;
          identifier.coverImage.forEach((size) => {
            if (size.attributes.imageSize == "detail_500") {
              url = size.$value;
            }
          });
          if (url !== "") {
            data.result.push(url);
            return data;
          }
        }
      });
    }
  
    return data;
  
  }
});