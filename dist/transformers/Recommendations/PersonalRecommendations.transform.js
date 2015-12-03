'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var PersonalRecommendationsTransform = {
  event: function event() {
    return 'getPersonalRecommendations';
  },

  requestTransform: function requestTransform(event, params, connection) {
    var _this = this;

    var filters = connection.libdata.config.provider.services.recommend.filters || ['rec.collectionIdentifier:' + (connection.libdata.libraryId || '716500') + '-katalog'];

    return new Promise(function (resolve) {
      var ret = { generic: [], personal: [] };
      var promises = [];
      var recs = _this.callServiceClient('recommend', 'getRecommendations', {
        likes: [params.work],
        dislikes: [],
        filters: filters
      });
      promises.push(recs);

      if (params.likes.length > 0) {
        params.likes.unshift(params.work);

        var precs = _this.callServiceClient('recommendranked', 'getPersonalRecommendations', {
          like: params.likes,
          filters: filters
        });
        promises.push(precs);

        precs.then(function (res) {
          ret.personal = res.result;
        });
      }

      recs.then(function (res) {
        ret.generic = res.result;
      });

      Promise.all(promises).then(function () {
        resolve(ret);
      });
    });
  },

  responseTransform: function responseTransform(data) {
    return {
      personal: this.extractWorkInformation(data.personal),
      generic: this.extractWorkInformation(data.generic)
    };
  },

  extractWorkInformation: function extractWorkInformation(result) {
    return result.map(function (element) {
      return {
        identifiers: [element[0]],
        title: element[1].title,
        creator: element[1].creator,
        workType: 'book'
      };
    });
  }
};

exports['default'] = PersonalRecommendationsTransform;
module.exports = exports['default'];