'use strict';

export function transformRequest(pid) {
  
  return {
  	pid: pid
  }
  
}

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