
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
