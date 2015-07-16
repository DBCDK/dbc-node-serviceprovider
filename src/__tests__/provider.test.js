'use strict';

/**
 * @file Testing the Dispatcher class in dispatcher.js
 */
import Provider from '../Provider.js';
import {expect, assert} from 'chai';

describe('Testing methods on the Provider', () => {
  it('assert methods are accessible', () => {
    assert.isNotNull(Provider);
    assert.isFunction(Provider);
    assert.isNotNull(Provider({}).registerTransform);
    assert.isFunction(Provider({}).registerTransform);
  });

  it('Test the constructor method', () => {
    expect(() => Provider()).to.throw('No configuration was provided');
    expect(() => Provider({})).to.not.throw(Error);
  });

  it('Test the registerTransform method', () => {
    let provider = Provider({});
    let events = function () {
    };
    let test = {
      events() {
      },
      requestTransform: true,
      responseTransform: true,
      someMethod() {
      }
    };
    expect(provider.registerTransform(test)).to.have.keys('someMethod', 'events', 'requestTransform', 'responseTransform', 'callClient');

    test = {services: []};
    expect(() => provider.registerTransform(test)).to.throw(Error);

    test = {};
    expect(() => provider.registerTransform(test)).to.throw(Error);

    test = {events};
    expect(() => provider.registerTransform(test)).to.throw(Error);

    test = {events, requestTransform: true};
    expect(() => provider.registerTransform(test)).to.throw(Error);

    test = {events, requestTransform: true, responseTransform: true};
    expect(() => provider.registerTransform(test)).to.not.throw(Error);
  });


  it('Test the registerClient method', () => {
    let client = {};
    let config = {};
    expect(() => Provider(config).registerClient(client)).to.throw(Error);
    config.services = {};
    expect(() => Provider(config).registerClient(client)).to.throw(Error);
    client.name = 'test';
    config.services.test = {};
    expect(() => Provider(config).registerClient(client)).to.throw(Error);
    client.init = () => {
    };
    expect(() => Provider(config).registerClient(client)).to.throw(Error);
    client.init = () => {
      return {};
    };
    expect(() => Provider(config).registerClient(client)).to.not.throw(Error);
    let methods = Provider(config).registerClient(client);
    expect(methods).to.be.object; // eslint-disable-line no-unused-expressions
  });

  describe('Test registerEvent', () => {
    it('throws error on duplicate eventnames', () => {
      let transform = {
        requestTransform: true, responseTransform: true,
        name: 'testTransform',
        events() {
          return ['testRegisterEvent'];
        }
      };

      Provider({}).registerTransform(transform);
      expect(() => Provider({}).registerTransform(transform)).to.throw(Error);
    });
  });

  describe('Test the trigger function', () => {
    // No event has been reqistered
    it('Throws an error on unsupported events', () => {
      expect(() => Provider({}).trigger('testEvent', {test: 'testEvent is triggered'})).to.throw(Error);
    });
    it('Triggers an event', (done) => {
      let provider = Provider({});
      provider.registerTransform({
        events() {
          return ['testEvent'];
        },
        requestTransform(event, request) {
          return Promise.resolve(request);
        },
        responseTransform(response) {
          return response.test;
        }
      });
      let trigger = provider.trigger('testEvent', {test: 'testEvent is triggered'});
      expect(trigger).to.have.length(1);
      trigger[0].then((result) => {
        expect(result).to.be.equal('testEvent is triggered');
        done();
      });
    });
  });
});
