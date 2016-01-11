export function create(modeName, payload) {
    return {
        type: 'LOOPBACK_MODEL_CREATE',
        payload: payload,
        meta: {
            modelName: modeName
        }
    }
}

export function createSuccess(modeName, payload) {
    return {
        type: 'LOOPBACK_MODEL_CREATE_SUCCESS',
        payload: payload,
        meta: {
            modelName: modeName
        }
    }
}

export function createError(modeName, payload) {
    return {
        type: 'LOOPBACK_MODEL_CREATE_ERROR',
        payload: payload,
        error: true,
        meta: {
            modelName: modeName
        }
    }
}
