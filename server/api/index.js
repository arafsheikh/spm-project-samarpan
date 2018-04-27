'use strict';

const http = require("http");
const req = require('request');
const moment = require('moment');

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
        path: '/pay/{username}/{org}/{amt}',
        handler: function (request, reply) {
            var now = moment();
            var formatted = now.format('YYYY-MM-DD HH:mm:ss Z');
            console.log(formatted)

            // Set the headers
            var headers = {
                'User-Agent':       'Super Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            }

            // Configure the request
            var options = {
                url: 'http://192.168.1.102:3000/api/namespace1.AccountTransfer',
                method: 'POST',
                headers: headers,
                form: {'$class': 'namespace1.AccountTransfer', 'from': request.params.username, 'to': request.params.org, 'amount': request.params.amt, 'timestamp': formatted}
            }

            // Start the request
            req(options, function (error, response, body) {
                console.log(response.statusCode);
                if (!error && response.statusCode == 200) {
                    // Print out the response body
                    console.log(body);
                }
            });
            
            reply({ username: request.params.username , org: request.params.org, amt: request.params.amt, timestamp: new Date().getTime()});
        }
    });


    next();
};


exports.register.attributes = {
    name: 'index'
};
