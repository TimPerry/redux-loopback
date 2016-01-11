export function attemptLoginAction(email, password) {
    return {
      type: 'LOOPBACK_LOGIN',
      payload: {
        email: email,
        password: password
      }
    };
}

export function loginPendingAction() {
  return {
    type: 'LOOPBACK_LOGIN_PENDING'
  };
}

export function loginErrorAction(err) {
  return {
    type: 'LOOPBACK_LOGIN_ERROR',
    payload: err,
    error: true
  }
}
