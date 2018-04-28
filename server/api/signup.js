'use strict';
const Async = require('async');
const Boom = require('boom');
const Config = require('../../config');
const Joi = require('joi');
const req = require('request');

const internals = {};


internals.applyRoutes = function (server, next) {

    const Account = server.plugins['hapi-mongo-models'].Account;
    const Session = server.plugins['hapi-mongo-models'].Session;
    const User = server.plugins['hapi-mongo-models'].User;


    server.route({
        method: 'POST',
        path: '/signup',
        config: {
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            validate: {
                payload: {
                    name: Joi.string().required(),
                    email: Joi.string().email().lowercase().required(),
                    username: Joi.string().token().lowercase().required(),
                    password: Joi.string().required()
                }
            },
            pre: [{
                assign: 'usernameCheck',
                method: function (request, reply) {

                    const conditions = {
                        username: request.payload.username
                    };

                    User.findOne(conditions, (err, user) => {

                        if (err) {
                            return reply(err);
                        }

                        if (user) {
                            return reply(Boom.conflict('Username already in use.'));
                        }

                        reply(true);
                    });
                }
            }, {
                assign: 'emailCheck',
                method: function (request, reply) {

                    const conditions = {
                        email: request.payload.email
                    };

                    User.findOne(conditions, (err, user) => {

                        if (err) {
                            return reply(err);
                        }

                        if (user) {
                            return reply(Boom.conflict('Email already in use.'));
                        }

                        reply(true);
                    });
                }
            }]
        },
        handler: function (request, reply) {

            const mailer = request.server.plugins.mailer;

            Async.auto({
                user: function (done) {

                    const username = request.payload.username;
                    const password = request.payload.password;
                    const email = request.payload.email;

                    User.create(username, password, email, done);

                    // Set the headers
                    var headers = {
                        'User-Agent':       'Super Agent/0.0.1',
                        'Content-Type':     'application/x-www-form-urlencoded'
                    }

                    // Configure the request
                    var options = {
                        url: 'http://192.168.1.102:3000/api/namespace1.Customer/',
                        method: 'POST',
                        headers: headers,
                        form: {'$class': 'namespace1.Customer', 'customerId': username, 'firstName': username, 'lastName': username}
                    }

                    // Configure the request
                    var options1 = {
                        url: 'http://192.168.1.102:3000/api/namespace1.Account',
                        method: 'POST',
                        headers: headers,
                        form: {'$class': 'namespace1.Account', 'accountId': username, 'owner': username, 'balance': 10000}
                    }

                    // Start the request
                    req(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            // Print out the response body
                            console.log(body);
                            // Start the request
                            req(options1, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    // Print out the response body
                                    console.log(body);
                                }
                            });
                        }
                    });

                },
                account: ['user', function (results, done) {

                    const name = request.payload.name;

                    Account.create(name, done);
                }],
                linkUser: ['account', function (results, done) {

                    const id = results.account._id.toString();
                    const update = {
                        $set: {
                            user: {
                                id: results.user._id.toString(),
                                name: results.user.username
                            }
                        }
                    };

                    Account.findByIdAndUpdate(id, update, done);
                }],
                linkAccount: ['account', function (results, done) {

                    const id = results.user._id.toString();
                    const update = {
                        $set: {
                            roles: {
                                account: {
                                    id: results.account._id.toString(),
                                    name: results.account.name.first + ' ' + results.account.name.last
                                }
                            }
                        }
                    };

                    User.findByIdAndUpdate(id, update, done);
                }],
                welcome: ['linkUser', 'linkAccount', function (results, done) {

                    const emailOptions = {
                        subject: 'Your ' + Config.get('/projectName') + ' account',
                        to: {
                            name: request.payload.name,
                            address: request.payload.email
                        }
                    };
                    const template = 'welcome';

                    mailer.sendEmail(emailOptions, template, request.payload, (err) => {

                        if (err) {
                            console.warn('sending welcome email failed:', err.stack);
                        }
                    });

                    done();
                }],
                session: ['linkUser', 'linkAccount', function (results, done) {

                    Session.create(results.user._id.toString(), done);
                }]
            }, (err, results) => {

                if (err) {
                    return reply(err);
                }

                const user = results.linkAccount;
                const credentials = user.username + ':' + results.session.key;
                const authHeader = 'Basic ' + new Buffer(credentials).toString('base64');
                const result = {
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        roles: user.roles
                    },
                    session: results.session,
                    authHeader
                };

                request.cookieAuth.set(result);
                reply(result);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/signup-ngo',
        handler: function (request, reply) {

            const mailer = request.server.plugins.mailer;

            const name = request.payload.name;
            const username = request.payload.username;
            const email = request.payload.email;
            const doc1 = request.payload.doc1;
            const doc2 = request.payload.doc2;

            const emailOptions = {
                subject: 'New NGO on ' + Config.get('/projectName') + ' verification',
                to: {
                    name: request.payload.name,
                    address: 'smarpan.inc@gmail.com'
                }
            };
            const template = 'verification';

            mailer.sendEmail(emailOptions, template, request.payload, (err) => {

                if (err) {
                    console.warn('sending welcome email failed:', err.stack);
                }
            });

            reply({ username: request.params.username , org: request.params.org, amt: request.params.amt});
            
        }
    });


    next();
};


exports.register = function (server, options, next) {

    server.dependency(['mailer', 'hapi-mongo-models'], internals.applyRoutes);

    next();
};


exports.register.attributes = {
    name: 'signup'
};
