import chai from 'chai';
import spies from 'chai-spies';
import registerHandler from '../../src/action-handlers/register.js';

chai.use(spies);
const expect = chai.expect;

describe('Register action handler', function(){
  let store, app, payload;

  beforeEach(function(){
    app = {models: {User: {}}};
    store = {dispatch: chai.spy()};
    payload = {payload: {some: 'payload'}, meta: {modelName: 'User'}}
  });

  it('Should dispatch a pending action', function(){
    app.models.User.create = chai.spy();
    registerHandler(app, store, payload);
    expect(store.dispatch).to.have.been.called.with({type: 'LOOPBACK_REGISTER_PENDING'});
  });

  it('Should dispatch a success action when no error is reported', function(){
    app.models.User.create = function(data, callback) {
      callback(undefined, {some: 'data'});
    };
    registerHandler(app, store, payload);
    expect(store.dispatch).to.have.been.called.with({ type: 'LOOPBACK_REGISTER_SUCCESS', payload: {some: 'data'}});
  });

  it('Should dispatch a error action when a error is reported', function(){
    app.models.User.create = function(data, callback) {
      callback({some: 'error'}, {some: 'errordata'});
    };
    registerHandler(app, store, payload);
    expect(store.dispatch).to.have.been.called.with({ type: 'LOOPBACK_REGISTER_ERROR', payload: {some: 'error'}, error: true});
  });

});
