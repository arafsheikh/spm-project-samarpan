'use strict';
const Form = require('./form.jsx');
const React = require('react');
const ReactHelmet = require('react-helmet');


const Helmet = ReactHelmet.Helmet;


class SignupPageNGO extends React.Component {
    render() {

        return (
            <section className="section-home container">
                <Helmet>
                    <title>Sign up as NGO</title>
                </Helmet>
                <div className="row">
                    <div className="col-sm-6">
                        <Form />
                    </div>
                    <div className="col-sm-6 text-center">
                        <h1 className="page-header">Receive donations from around the world!</h1>
                        <p className="lead">
                            Together let's make the world a better place!
                        </p>
                        <i className="fa fa-thumbs-o-up bamf"></i>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = SignupPageNGO;
