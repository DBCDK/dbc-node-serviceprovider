'use strict';

import * as prep from './response-preparation.js';

/**
 * Transforms the request from the app to MoreInfo request parameters
 *
 * @param {Array} the pid from Open Search
 * @return {Array} request parameters using More Info terminology
 */

export function transformRequest(request) {

	let identifiers = [];
	
	request.forEach((value) => {
    value.forEach((pid) => {
    	identifiers.push(pid.pid.split(":").pop());
    });
  });
  
  return identifiers;
  
}

/**
 * Transforms the respone from the MoreInfo webservice to a representation 
 * that can be used by the application
 *
 * @param {Object} the response from MoreInfo
 * @return {Object} the transformed result
 */

export function transformResponse(response) {

	let data = {};
	data.result = [];
	
	response.identifierInformation.forEach((identifier) => {
		if (identifier.identifierKnown == true) {
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
	
	return data;
  
}