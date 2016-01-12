import {create} from './actions/create';
import {login, loginPending, loginSuccess, loginError} from './actions/login';
import {register, registerPending, registerSuccess, registerError} from './actions/register';

export const actions = {
    create: create,
    login: login,
    register: register
};

const actionHandlers = {
    'LOOPBACK_LOGIN': function(app, store, action) {
        store.dispatch(loginPending());
        const loginDetails = action.payload;
        const modelName = action.meta.modelName;
        return app.models[modelName].login(loginDetails, (err, res) => {
            if (!err) {
                store.dispatch(loginSuccess(res));
            } else {
                store.dispatch(loginError(err));
            }
        });
    },
    'LOOPBACK_REGISTER': function(app, store, action) {
        store.dispatch(registerPending());
        const registerDetails = action.payload;
        const modelName = action.meta.modelName;
        return app.models[modelName].create(registerDetails, (err, res) => {
            if (!err) {
                store.dispatch(registerSuccess(res));
            } else {
                store.dispatch(registerError(err));
            }
        });
    }
};

export default function(app) {
  const loopbackMiddleware = store => next => action => {
      if (actionHandlers[action.type]) {
          actionHandlers[action.type](app, store, action);
      }
      return next(action);
  }
  return loopbackMiddleware;
}
