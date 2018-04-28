'use strict';
const ApiActions = require('../../../actions/api');
const Constants = require('./constants');
const Store = require('./store');


class Actions {
    static sendTransaction(data) {
        console.log(data);
        ApiActions.get(
            `/api/pay/root/${data['vendor']}/${data['amt']}`,
            undefined,
            Store,
            Constants.SEND_MESSAGE,
            Constants.SEND_MESSAGE_RESPONSE
        );
    }

    static getUser() {
        ApiActions.get(
            '/api/users/my',
            undefined,
            Store,
            Constants.GET_USER,
            Constants.GET_USER_RESPONSE
        );
    }
}


module.exports = Actions;
