'use strict';

const http = require("http");

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply({ message: 'Welcome to the plot device.' });
        }
    });

    server.route({
        method: 'GET',
        path: '/x/{username}/{org}/{amt}',
        handler: function (request, reply) {

            reply({ username: request.params.username , org: request.params.org, amt: request.params.amt});
            http.get('http://localhost:8000/x/qq/qq/qq', res => {
                console.log('yo!');
            });
        }
    });


    next();
};


exports.register.attributes = {
    name: 'index'
};
