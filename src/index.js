import {create} from './actions/create';
import {login} from './actions/login';
import {register, registerPending, registerSuccess, registerError} from './actions/register';
import loginHandler from './action-handlers/login';
import registerHandler from './action-handlers/login';

export const actions = {
    create: create,
    login: login,
    register: register
};

const actionHandlers = {
    'LOOPBACK_LOGIN': loginHandler,
    'LOOPBACK_REGISTER': registerHandler
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
