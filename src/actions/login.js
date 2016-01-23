export function login(email, password, modelName='User', successActions, errorActions) {
    return {
      type: 'LOOPBACK_LOGIN',
      payload: {
        email: email,
        password: password
      },
      meta: {
        modelName: modelName,
        successActions: successActions,
        errorActions: errorActions
      }
    };
}

export function loginPending() {
  return {
    type: 'LOOPBACK_LOGIN_PENDING'
  };
}

export function loginSuccess(payload) {
  return {
    type: 'LOOPBACK_LOGIN_SUCCESS',
    payload: payload
  }
}

export function loginError(err) {
  return {
    type: 'LOOPBACK_LOGIN_ERROR',
    payload: err,
    error: true
  }
}
