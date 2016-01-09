# Redux loopback middleware

## Prerequisites
You will need to create a loopback client. The instructions can be found here: 
```
https://docs.strongloop.com/display/public/LB/LoopBack+in+the+client
```

## Install

```
npm install redux-loopback-middleware
```

## Setup

As per the instructions from loopback in the client (see above) you should be able to require your client app in like this:

```
import app from 'loopback-app';
```

You will also need to bring in this module:

```
import loopbackMiddleware from 'redux-loopback-middleware';
```

You then need a createStoreWithMiddleware function:
```
const createStoreWithMiddleware = applyMiddleware(
  loopbackMiddleware(app)
)(createStore);
```

The final result should look something like this:

```
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import loopbackMiddleware from 'redux-loopback-middleware';
import app from 'loopback-app';

const createStoreWithMiddleware = applyMiddleware(
  loopbackMiddleware(app)
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
```