'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var RecommendationsTransform = {
  event: function event() {
    return 'getRecommendations';
  },

  requestTransform: function requestTransform(event, params) {
    return this.callServiceClient('recommend', 'getRecommendations', params);
  },

  responseTransform: function responseTransform(data) {
    return this.extractWorkInformation(data.result);
  },

  extractWorkInformation: function extractWorkInformation(result) {
    return result.map(function (element) {
      return {
        identifiers: [element[0]],
        title: element[1].title,
        creator: element[1].creator,
        workType: 'book' // @todo Hardcoded for now, change to real worktype
      };
    });
  }
};

exports['default'] = RecommendationsTransform;
module.exports = exports['default'];