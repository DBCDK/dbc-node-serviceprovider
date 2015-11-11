'use strict';

const PersonalRecommendationsTransform = {
  event() {
    return 'getPersonalRecommendations';
  },

  requestTransform(event, params) {
    return new Promise((resolve) => {
      let ret = {generic: [], personal: []};
      let promises = [];
      let recs = this.callServiceClient('recommend', 'getRecommendations', {
        likes: [params.work],
        dislikes: []
      });
      promises.push(recs);

      if (params.likes.length > 0) {
        params.likes.unshift(params.work);

        let precs = this.callServiceClient('recommendranked', 'getPersonalRecommendations', {
          like: params.likes
        });
        promises.push(precs);

        precs.then((res) => {
          ret.personal = res.result;
        });
      }

      recs.then((res) => {
        ret.generic = res.result;
      });

      Promise.all(promises).then((values) => {
        resolve(ret);
      });
    });
  },

  responseTransform(data) {
    return {
      personal: this.extractWorkInformation(data.personal),
      generic: this.extractWorkInformation(data.generic)
    };
  },

  extractWorkInformation(result) {
    return result.map((element) => {
      return {
        identifiers: [element[0]],
        title: element[1].title,
        creator: element[1].creator,
        workType: 'book'
      };
    });
  }
};

export default PersonalRecommendationsTransform;
