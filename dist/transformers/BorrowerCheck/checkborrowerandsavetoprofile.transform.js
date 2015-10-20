'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var CheckBorrowerAndSaveToProfileTransform = {

  event: function event() {
    return 'checkBorrowerAndSaveToProfile';
  },

  requestTransform: function requestTransform(event, query, connection) {
    var _this = this;

    // eslint-disable-line no-unused-vars
    return new Promise(function (resolve) {
      _this.callServiceClient('borchk', 'getBorrowerCheckResult', {
        userId: query.updatedLibrary.borrowerID,
        userPincode: query.updatedLibrary.borrowerPIN || '',
        libraryCode: query.updatedLibrary.libraryID
      }).then(function (response) {
        if (response.requestStatus === 'ok') {
          // Borrowercheck said ok to borrower, saving info to profile
          var libraryIndex = (0, _lodash.findIndex)(query.favoriteLibraries, 'agencyID', query.updatedLibrary.agencyID);
          if (libraryIndex >= 0) {
            query.favoriteLibraries[libraryIndex] = query.updatedLibrary;
          } else {
            query.favoriteLibraries.push(query.updatedLibrary);
          }

          var passport = connection.request.session.passport || { user: { id: '', uid: '' } };
          var loopbackProfile = {
            accessToken: passport.user.id,
            id: passport.user.uid,
            favoriteLibraries: query.favoriteLibraries
          };

          _this.callServiceClient('profile', 'updateProfile', loopbackProfile).then(function (resp) {
            resolve({
              borchk: response,
              profile: resp
            });
          });
        } else {
          resolve({
            borchk: response,
            profile: {
              statusCode: 500
            }
          });
        }
      });
    });
  },

  responseTransform: function responseTransform(response) {
    return {
      borrowerStatus: response.borchk.requestStatus,
      profileStatus: response.profile.statusCode === 200
    };
  }
};

exports['default'] = CheckBorrowerAndSaveToProfileTransform;
module.exports = exports['default'];