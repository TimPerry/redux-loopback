import * as createActions from './actions/create';
import * as loginActions from './actions/login';

export const actions = {
    create: createActions.create,
    login: loginActions.login
};

const _isNumerical = function(obj) {
    obj = obj - 0;
    return obj === obj;
};

const camelize = function(string) {
    if (_isNumerical(string)) {
      return string;
    }
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
};

const modelSuccess = function(action, res) {
    return {
        type: action.type + '_SUCCESS',
        payload: res,
        meta: {
            originalPayload: action.payload
        }
    }
};

const modelPending = function(action) {
    return {
        type: action.type + '_PENDING',
        meta: {
            originalPayload: action.payload
        }
    }
};

const modelError = function(action, err) {
    return {
        type: action.type + '_ERROR',
        payload: err,
        error: true,
        meta: {
            originalPayload: action.payload
        }
    }
};

const singleParamModelMethod = function(app, store, action) {
    store.dispatch(modelPending(action));
    const method = camelize(action.type.substr(15));
    const modelName = action.meta.modelName;
    return app.models[modelName][method](action.payload, (err, res) => {
        if (!err) {
            store.dispatch(modelSuccess(action, res));
        } else {
            store.dispatch(modelError(action, err));
        }
    });
}

const modelActions = {
    'LOOPBACK_MODEL_CREATE': singleParamModelMethod
};

const userActions = {
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
      if (actions[action.type]) {
          actions[action.type](app, store, action);
      }
      return next(action);
  }
  return loopbackMiddleware;
}
