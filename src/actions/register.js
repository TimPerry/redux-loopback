export function registerAttempt(name, email, password) {
  return {
    type: 'LOOPBACK_USER_REGISTER',
    payload: {
      name: name,
      email: email,
      password: password
    }
  };
}

export function registerSuccess() {
  return {
    type: 'LOOPBACK_USER_REGISTER_SUCCESS'
  };
};

export function registerPending() {
  return {
    type: 'LOOPBACK_USER_REGISTER_PENDING'
  };
}

export function registerErrorAction(err) {
  return {
    type: 'LOOPBACK_REGISTER_ERROR',
    payload: err,
    error: true
  }
}
