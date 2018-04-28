'use strict';
const React = require('react');
const ReactHelmet = require('react-helmet');
const ReactRouter = require('react-router-dom');


const Helmet = ReactHelmet.Helmet;
const Link = ReactRouter.Link;


class HomePage extends React.Component {
    render() {

        return (
            <section className="section-home container">
                <Helmet>
                    <title>Samarpan</title>
                </Helmet>
                <div className="jumbotron">
                    <h1>Social Impact Using Blockchain</h1>
                    <p className="lead">Donate today!</p>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">About us</h3>
                            </div>
                            <div className="panel-body">
                                <p>
                                    Seeking effective altruism? Look no futher.
                                    We make sure that you have complete control over
                                    the donations you make, and excericise complete
                                    transparency.
                                </p>
                                <Link to="/about" className="btn btn-info btn-block">
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Sign up</h3>
                            </div>
                            <div className="panel-body">
                                <p>
                                    Join us in our mission to make donations
                                    transparent!
                                </p>
                                <Link to="/signup" className="btn btn-success btn-block">
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Contact us</h3>
                            </div>
                            <div className="panel-body">
                                <p>
                                    Still not convinced? Have further questions?
                                    Want to make a suggestion? Use the form to reach us!
                                </p>
                                <Link to="/contact" className="btn btn-warning btn-block">
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = HomePage;
