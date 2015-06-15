'use strict';

import * as prep from './response-preparation.js';

/**
 * Transforms the request from the application to Open Search request parameters
 *
 * @param {String} the query from the user
 * @param {String} the number of the first collection wanted in the search result
 * @param {String} the number of works to retrieve
 * @param {String} which sort to use
 * @return {Object} request parameters using Open Search terminology
 */

export function transformRequest(query, offset, worksPerPage, sort) {

	if (sort == "default") {
		sort = "rank_frequency";
	}
  
  return {
  	query: query,
  	start: offset,
  	stepValue: worksPerPage,
  	sort: sort
  }
  
}

/**
 * Transforms the response from Open Search webservice to a representation 
 * that can be used by the application
 *
 * @param {Object} the response from the webservice
 * @return {Object} the transformed result
 */

export function transformResponse(response) {

	let data = {};
	data.result = [];
	
	let result = prep.checkResponse(response);
	
	if (result.hasOwnProperty('errorcode') || result.collections == 0) {
		data.result.push(result);
		return data;
	}
	
	let newWork = {};
	
	if (result.collections == 1) {
		let searchResult = response.result.searchResult;
		response.result.searchResult = [searchResult];
	}
	
	response.result.searchResult.forEach((work) => {
		let no = work.collection.numberOfObjects;
		let identifiers = [];
		let title;
		let workType;
		if (no === "1") {
			identifiers.push(work.collection.object.identifier);
			title = work.formattedCollection.briefDisplay.manifestation.title;
		  workType = work.formattedCollection.briefDisplay.manifestation.workType;
		} else {
			work.collection.object.forEach((identifier) => {
				identifiers.push(identifier.identifier);
				title = work.formattedCollection.briefDisplay.manifestation[0].title;
		  	workType = work.formattedCollection.briefDisplay.manifestation[0].workType;
			});
		}
		newWork.identifiers = identifiers;
		newWork.title = title;
		newWork.workType = workType;
		data.result.push(newWork);
		
	});
	
	return data;
  
}