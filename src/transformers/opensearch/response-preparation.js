'use strict';

/**
 * Checks the response from the OpenSearch webservice, to see
 * if any errors are returned from the service
 *
 * @param {Object} the response from the webservice
 * @return {Object} search result information if everything was ok, 
 * otherwise error code and error messages
 */

export function checkResponse(response) {

	if (hasSearchResult(response) == true) {
		if (getHitCount(response) == 0) {
			return getResultInfo(response);
		}
	} else {
		return checkResultErrors(response.error);
	}	
	
}

/**
 * Checks if the response has a searchResult (1 or more hits)
 *
 * @param {Object} the response from the webservice
 * @return {Boolean}
*/

export function hasSearchResult(response) {

	if (response.result != undefined) {;
		return true;
	}
	return false;
	
}

/**
 * Retrives the hit count (number of manifestations) from the response
 *
 * @param {Object} the response from the webservice
 * @return {String}
*/

export function getHitCount(response) {

	return response.result.hitCount;
  
}

/**
 * Retrives the collection count (number of works (or manifestations)) 
 * from the response
 *
 * @param {Object} the response from the webservice
 * @return {String}
*/

export function getCollectionCount(response) {

	return response.result.collectionCount;
  
}

/**
 * Check if there har more collections in the search result to
 * be retrieved
 *
 * @param {Object} the response from the webservice
 * @return {String}
*/

export function checkIfMore(response) {

	return response.result.more;
  
}

/**
 * Combines the result information from the webservice
 *
 * @param {Object} the response from the webservice
 * @return {Object} with hit count, collection count
 * and whether there are more collections to be retrieved
*/

export function getResultInfo(response) {
	return {
		hits: getHitCount(response),
		collections: getCollectionCount(response),
		more: checkIfMore(response)
	}
}

/**
 * Checks a record from the OpenSearch webservice, to see
 * if there were any errors retrieving the record data
 *
 * @param {Object} the record from the webservice
 * @return {Object} record error information
 */

export function checkRecord(record) {
	
	return checkRecordErrors(record.error);
	
}

/**
 * Checks a result error message from the webservice
 *
 * @param {String} an error message from the webservice
 * @return {Object} result error information
 */

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

/**
 * Parses variable result error message string
 *
 * @param {String} an error message from the webservice
 * @return {String} the parsed error message
 */

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

/**
 * Checks a record error message from the webservice
 *
 * @param {String} an error message from the webservice
 * @return {Object} record error information
 */

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

/**
 * Parses variable record error message string
 *
 * @param {String} an error message from the webservice
 * @return {String} the parsed error message
 */

function parseRecordErrorString(errorString) {
	
	if (errorString.match(/Error: deleted record|Error: unknown\/missing record|Error: Cannot fetch record/)) {
		return 'Record missing';
	}

	return errorString;

}