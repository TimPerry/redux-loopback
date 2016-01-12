export function register(name, email, password, modelName='User') {
  return {
    type: 'LOOPBACK_REGISTER',
    payload: {
      name: name,
      email: email,
      password: password
    },
    meta: {
      modelName: modelName
    }
  };
}

export function registerSuccess() {
  return {
    type: 'LOOPBACK_REGISTER_SUCCESS'
  };
};

export function registerPending() {
  return {
    type: 'LOOPBACK_REGISTER_PENDING'
  };
}

export function registerError(err) {
  return {
    type: 'LOOPBACK_REGISTER_ERROR',
    payload: err,
    error: true
  }
}
