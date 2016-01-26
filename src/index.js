import {create} from './actions/create';
import {login} from './actions/login';
import {find, findById} from './actions/find';
import {register, registerPending, registerSuccess, registerError} from './actions/register';
import loginHandler from './action-handlers/login';
import registerHandler from './action-handlers/register';
import {singleParamModelMethod, doubleParamModelMethod} from './model';

export const actions = {
    create: create,
    login: login,
    register: register,
    find: find,
    findById: findById
};

const actionHandlers = {
    'LOOPBACK_LOGIN': loginHandler,
    'LOOPBACK_REGISTER': registerHandler,
    'LOOPBACK_MODEL_FIND': singleParamModelMethod,
    'LOOPBACK_MODEL_FIND_BY_ID': doubleParamModelMethod
};

export default function(app, options={}) {
  const loopbackMiddleware = store => next => action => {
      if (actionHandlers[action.type]) {
          if (options.syncAppWithState) {
            options.syncAppWithState(app, store.getState());
          }
          actionHandlers[action.type](app, store, action);
      }
      return next(action);
  }
  return loopbackMiddleware;
}
