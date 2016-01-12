import {create} from './actions/create';
import {login, loginPending, loginSuccess, loginError} from './actions/login';

export const actions = {
    create: create,
    login: login
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
        store.dispatch(registerPendingAction());
        const registerDetails = action.payload;
        return app.models.User.create(registerDetails, (err, res) => {
            if (!err) {
                store.dispatch(registerSuccessAction(res));
            } else {
                store.dispatch(registerErrorAction(err));
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
