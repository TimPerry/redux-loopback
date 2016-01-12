import chai from 'chai';
import spies from 'chai-spies';
import loginHandler from '../../src/action-handlers/login.js';

chai.use(spies);
const expect = chai.expect;

describe('Login action handler', function(){
  let store, app, payload;

  beforeEach(function(){
    app = {models: {User: {}}};
    store = {dispatch: chai.spy()};
    payload = {payload: {some: 'payload'}, meta: {modelName: 'User'}}
  });

  it('Should dispatch a pending action', function(){
    app.models.User.login = chai.spy();
    loginHandler(app, store, payload);
    expect(store.dispatch).to.have.been.called.with({type: 'LOOPBACK_LOGIN_PENDING'});
  });

  it('Should dispatch a success action when no error is reported', function(){
    app.models.User.login = function(data, callback) {
      callback(undefined, {some: 'data'});
    };
    loginHandler(app, store, payload);
    expect(store.dispatch).to.have.been.called.with({ type: 'LOOPBACK_LOGIN_SUCCESS', payload: {some: 'data'}});
  });

  it('Should dispatch a error action when a error is reported', function(){
    app.models.User.login = function(data, callback) {
      callback({some: 'error'}, {some: 'errordata'});
    };
    loginHandler(app, store, payload);
    expect(store.dispatch).to.have.been.called.with({ type: 'LOOPBACK_LOGIN_ERROR', payload: {some: 'error'}, error: true});
  });

});
