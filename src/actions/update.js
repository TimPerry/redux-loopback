export function loopbackUpdateAll(modeName, payload) {
    return {
        type: 'LOOPBACK_MODEL_UPDATE_ALL',
        payload: payload,
        meta: {
            modelName: modeName
        }
    }
}
