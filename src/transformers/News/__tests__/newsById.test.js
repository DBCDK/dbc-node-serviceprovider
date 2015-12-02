'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import Provider from '../../../Provider.js';
import Events from '../../../lib/Events.js';
import NewsTransform from '../getNewsById.transform.js';
import newsByIdResponse from './data/newsByIdReponse.js';

// until all systems run on node >=5.0.0, it is neccesary to test where request is installed
let request;
try {
  request = require('dbc-node-ddbcontent-client/node_modules/request');
} catch (e) {
  request = require('request');
}

describe('Test NewsById transform', () => {
  let provider;
  before('setup provider', () => {
    const config = {
      services: {
        ddbcontent: {
          endpoint: 'http://am.fs_rest.dev.inlead.dk/web',
          agency: '100000',
          key: 'b2573a3ea77a938fa86dc9fa05c99888f26992e9'
        }
      }
    };
    const client = {getNewsById: () => {
      return Promise.resolve(newsByIdResponse);
    }};

    provider = Provider();
    provider.registerServiceClient(client);
    provider.registerTransform(NewsTransform);
  });

  afterEach('restore stub', () => {
    request.get.restore();
  });

  after('reset Provider events', () => {
    Events.resetEvents();
  });

  it('Trigger getNewsById', (done) => {
    sinon
      .stub(request, 'get')
      .yields(null, {statusCode: 200}, JSON.stringify(newsByIdResponse));

    const getNewsList = provider.trigger('getNewsById', {
      node: 1
    });

    getNewsList[0].then(response => {
      const expected = {
        id: 'id1',
        nid: 1,
        title: 'title 1',
        lead: 'lead 1',
        body: '<p>body 1</p>',
        image: null
      };
      expect(response).to.deep.equal(expected);

      done();
    }).catch(err => done(err));
  });

  it('Trigger getNewsById no results', (done) => {
    sinon
      .stub(request, 'get')
      .yields(null, {statusCode: 200}, JSON.stringify({items: []}));

    const getNewsList = provider.trigger('getNewsById', {node: 123});

    getNewsList[0].then(response => {
      expect(response).to.deep.equal({nid: 123, error: 'unknown id'});
      done();
    }).catch(err => done(err));
  });
});
