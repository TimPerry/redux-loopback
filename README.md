# WORK IN PROGESS!
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

## Usage 

Once you are all setup you can dispatch actions. These actions will call various loopback methods and then dispatch other actions that you should act upon.

### Dispatching actions

```
import {actions: {create, find, findById, findOne, updateAll, destroyAll, destroyById}} from 'redux-loopback';

create('Landlord', {'name': 'Tim Perry'});

find('Landlord', {'name': 'Tim Perry'});
findById('Landlord', 14);
findOne('Landlord', {'name': 'Tim Perry'});

updateAll('Landlord', {'name': 'Tim Perry'}, {'some': 'update'});

destroyAll('Landlord', {'name': 'Tim Perry'});
destroyById('Landlord', 12);
```

### Handling actions

All of the actions you dispatch will dispatch a pending action. Then once the data is recieved you will get one of two actions being fired:
- success with the payload of the response
- failure with the payload of the response (the actions will also be identified as an error)

e.g. for login you would need to handle these three actions:

#### LOOPBACK_LOGIN_PENDING
```
{
	type: 'LOOPBACK_LOGIN_PENDING',
	payload: // will contain the payload you send when you dispatched the login action
}
```

#### LOOPBACK_LOGIN_SUCCESS
```
{
	type: 'LOOPBACK_LOGIN_SUCCESS',
	payload: // the response from the server
}
```

#### LOOPBACK_LOGIN_ERROR
```
{
	type: 'LOOPBACK_LOGIN_ERROR',
	payload: // the error from the server,
	error: true
}
```