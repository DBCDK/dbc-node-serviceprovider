'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var NewsListTransform = {

  event: function event() {
    return 'getNewsList';
  },

  requestTransform: function requestTransform(event, query) {
    return this.callServiceClient('ddbcontent', 'getContentList', query);
  },

  responseTransform: function responseTransform(response) {
    if (!response.items) {
      return [];
    }
    var items = response.items.map(function (item) {
      var fields = item.fields;

      return {
        id: item.id,
        title: fields.title && fields.title.value || null,
        lead: fields.field_ding_news_lead && fields.field_ding_news_lead.value || null,
        body: fields.field_ding_news_body && fields.field_ding_news_body.value || null,
        image: fields.field_ding_news_list_image && fields.field_ding_news_list_image.value[0] || null
      };
    });
    return items;
  }
};

exports['default'] = NewsListTransform;
module.exports = exports['default'];