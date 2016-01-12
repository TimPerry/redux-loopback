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

  // xit('Should dispatch a success action when no error is reported', function(){
  //   app.models.User.login = function(data, callback) {
  //     console.log('boomsticks');
  //     callback(undefined, {some: 'data'});
  //   };
  //   expect(store.dispatch).to.have.been.called.with({ type: 'LOOPBACK_LOGIN_SUCCESS', payload: {some: 'data'}});
  // });

  // xit('Should dispatch a error action when a error is reported', function(){

  // });

});
