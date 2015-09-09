'use strict';

/**
 * @file
 * Common methods for transforming openagency.
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getDataFromPickupAgency;

var _lodash = require('lodash');

function determineOpeningHours(openingHours) {
  var hours = '';
  if ((0, _lodash.isArray)(openingHours)) {
    hours = openingHours[0].$value;
  } else if (openingHours) {
    hours = openingHours.$value;
  }

  return hours;
}

function determineBranchName(branchName) {
  if ((0, _lodash.isArray)(branchName)) {
    return branchName[0].$value;
  }

  return branchName.$value;
}

function getDataFromPickupAgency(pickupAgency) {
  return {
    agencyName: pickupAgency.agencyName,
    agencyId: pickupAgency.agencyId,
    branchId: pickupAgency.branchId,
    branchNameDan: determineBranchName(pickupAgency.branchName),
    branchPhone: pickupAgency.branchPhone,
    branchEmail: pickupAgency.branchEmail,
    postalAddress: pickupAgency.postalAddress,
    postalCode: pickupAgency.postalCode,
    city: pickupAgency.city,
    openingHoursDan: determineOpeningHours(pickupAgency.openingHours),
    branchWebsiteUrl: pickupAgency.branchWebsiteUrl
  };
}

module.exports = exports['default'];