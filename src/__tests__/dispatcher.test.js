'use strict';

/**
 * @file Testing the Dispatcher class in dispatcher.js
 */
import Dispatcher from '../lib/dispatcher.js';
import sinon from 'sinon';
import {expect} from 'chai';

describe('Testing the methods in the Dispatcher object', () => {

  /**
   * Connection Mock
   * @type {{}}
   */
  const connectionMock = {
    on(event, cb) {
      cb({event});
    },
    emit: sinon.stub()
  };

  /**
   * Socket Mock
   * @type {{}}
   */
  const socketMock = {
    on(event, cb) {
      cb(connectionMock);
    }
  };

  /**
   * Provider Mock
   * @type {{}}
   */
  const providerMock = {};
  providerMock.trigger = sinon.stub().returns([Promise.resolve('reponse value')]);
  providerMock.getEventsOfType = sinon.stub().returns(new Map([['testEvent', {}]]));

  it('tests something', (done) => {
    Dispatcher(socketMock, providerMock);
    expect(providerMock.trigger.calledWith('testEvent')).to.be.equal(true);
    expect(providerMock.getEventsOfType.calledWith('transform')).to.be.equal(true);
    expect(connectionMock.emit.called).to.be.equal(false);
    setTimeout(() => {
      expect(connectionMock.emit.calledWith('testEventResponse', 'reponse value')).to.be.equal(true);
      done();
    }, 0);

  });
});


