import {registerPending, registerSuccess, registerError} from '../actions/register';

export default function registerHandler(app, store, action) {
    store.dispatch(registerPending());
    const registerDetails = action.payload;
    const modelName = action.meta.modelName;
    return app.models[modelName].create(registerDetails, (err, res) => {
        if (!err) {
            store.dispatch(registerSuccess(res));
        } else {
            store.dispatch(registerError(err));
        }
    });
}
