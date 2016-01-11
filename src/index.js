import * as createActions from './actions/create';
import * as loginActions from './actions/login';

export const actions = {
    create: createActions.create,
    login: loginActions.login
};

const actionHandlers = {
    'LOOPBACK_USER_LOGIN': function(app, store, action) {
        store.dispatch(loginPendingAction());
        const loginDetails = action.payload;
        const modelName = action.meta.modelName;
        return app.models[modelName].login(loginDetails, (err, res) => {
            if (!err) {
                store.dispatch(loginSuccessAction(accessToken));
            } else {
                store.dispatch(loginErrorAction(err));
            }
        });
    },
    'LOOPBACK_USER_REGISTER': function(app, store, action) {
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
