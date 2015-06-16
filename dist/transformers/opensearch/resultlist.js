"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.transformRequest = transformRequest;
exports.transformResponse = transformResponse;

function transformRequest(query, offset, worksPerPage, sort) {

	if (sort == "default") {
		sort = "rank_frequency";
	}

	return {
		query: query,
		start: offset,
		stepValue: worksPerPage,
		sort: sort
	};
}

function transformResponse(response) {

	var data = {};
	data.result = [];

	var newWork = {};

	response.result.searchResult.forEach(function (work) {
		var no = work.collection.numberOfObjects;
		var identifiers = [];
		var title = undefined;
		var workType = undefined;
		if (no === "1") {
			identifiers.push(work.collection.object.identifier);
			title = work.formattedCollection.briefDisplay.manifestation.title;
			workType = work.formattedCollection.briefDisplay.manifestation.workType;
		} else {
			work.collection.object.forEach(function (identifier) {
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