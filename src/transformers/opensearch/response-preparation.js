'use strict';

export function hasSearchResult(response) {

	if (response.result != undefined) {;
		return true;
	}
	return false;
	
}

export function getHitCount(response) {

	return response.result.hitCount;
  
}

export function getCollectionCount(response) {

	return response.result.collectionCount;
  
}

export function checkIfMore(response) {

	return response.result.more;
  
}

export function getResultInfo(response) {
	return {
		hits: getHitCount(response),
		collections: getCollectionCount(response),
		more: checkIfMore(response)
	}
}

export function checkRecord(record) {
	
	return checkRecordErrors(record.error);
	
}

export function checkResponse(response) {

	if (hasSearchResult(response) == true) {
		if (getHitCount(response) == 0) {
			return getResultInfo(response);
		}
	} else {
		return checkResultErrors(response.error);
	}	
	
}

function checkResultErrors(errorString) {

	let error = {};

	switch (errorString) {
		case 'authentication_error':
			error = {
				errorcode: 1,
				errormessage: 'Authentication error',
				serviceerror: errorString
			}
			break;
		case 'Error: No query found in request':
			error = {
				errorcode: 2,
				errormessage: 'Missing search query',
				serviceerror: errorString
			}
			break;
		default:
			let errormessage = parseErrorString(errorString);
			switch (errormessage) {
				case 'Error in search query':
					error = {
						errorcode: 3,
						errormessage: errormessage,
						serviceerror: errorString
					}
					break;
				case 'Cannot fetch profile':
					error = {
						errorcode: 4,
						errormessage: errormessage,
						serviceerror: errorString
					}
					break;
				case 'Unknown agency':
					error = {
						errorcode: 5,
						errormessage: errormessage,
						serviceerror: errorString
					}
					break;
				case 'Service problem':
					error = {
						errorcode: 6,
						errormessage: errormessage,
						serviceerror: errorString
					}
					break;
				default:
					error = {
						errorcode: 0,
						errormessage: 'Error',
						serviceerror: errorString
					}
					break;
			}
	}
	
	return error;
}

function parseErrorString(errorString) {
	
	if (errorString.match(/Internal problem/)) {
		return 'Service problem';
	}
	
	if (errorString.match(/Error: Unknown agency/)) {
		return 'Unknown agency';
	}
	
	if (errorString.match(/Error: Cannot fetch profile/)) {
		return 'Cannot fetch profile';
	}
	
	if (errorString.match(/Unsupported index|Query syntax error/)) {
		return 'Error in search query';
	} 

	return errorString;

}

function checkRecordErrors(errorString) {

	let error = {};
	
	let errormessage = parseRecordErrorString(errorString);
	
	switch (errormessage) {
		case "Record missing":
			error = {
				errorcode: 1,
				errormessage: errormessage,
				serviceerror: errorString
			}
			break;
		default:
			error = {
				errorcode: 0,
				errormessage: 'Error',
				serviceerror: errorString
			}
			break;		
	}
		
	return error;
}

function parseRecordErrorString(errorString) {
	
	if (errorString.match(/Error: deleted record|Error: unknown\/missing record|Error: Cannot fetch record/)) {
		return 'Record missing';
	}

	return errorString;

}