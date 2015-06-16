'use strict';

/**
 * @file Testing the Dispatcher class in dispatcher.js
 */
import * as Provider from '../Provider.js';
import {expect, assert} from 'chai';

describe('Testing methods on the Provider', () => {

  it('assert methods are accessible', () => {
    assert.isNotNull(Provider);

    assert.isNotNull(Provider.init);
    assert.isFunction(Provider.init);

    assert.isNotNull(Provider.registerTransform);
    assert.isFunction(Provider.registerTransform);
  });

  it('Test the registerTransform method', () => {
    let expected = {services: null};
    let test = {};
    expect(Provider.registerTransform(test)).to.eql(expected);

    test = {
      someMethod(){
      }
    };
    expect(Provider.registerTransform(test)).to.have.keys('services', 'someMethod');

    test = {services: []};
    expect(() => Provider.registerTransform(test)).to.throw(Error);
  });
});


