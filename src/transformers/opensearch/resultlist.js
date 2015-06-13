'use strict';

import * as prep from './response-preparation.js';

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

export function transformResponse(response) {

	let data = {};
	data.result = [];
	
	let result = prep.checkResponse(response);
	
	if (result.error) {
		return data.result.push(result);
	}
	
	let newWork = {};
	
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
		result.data.push(newWork);
	});
	
	return data;
  
}