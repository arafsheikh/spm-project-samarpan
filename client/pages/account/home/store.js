'use strict';
const Redux = require('redux');
const User = require('./reducers/user');


module.exports = Redux.createStore(
    Redux.combineReducers({
        user: User
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
