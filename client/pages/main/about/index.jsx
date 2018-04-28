'use strict';
const React = require('react');
const ReactHelmet = require('react-helmet');


const Helmet = ReactHelmet.Helmet;


class AboutPage extends React.Component {
    render() {

        return (
            <section className="section-about container">
                <Helmet>
                    <title>About us</title>
                </Helmet>
                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">About us</h1>
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                </div>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">Who we are?</h4>
                                <p>
                                A team of people came together for the sake of a term project.
                                While brainstorming for ideas to solve the issues we see around,
                                we’ve come across a solution that we think can change the way NGOs and
                                charities are funded all across the globe, by filling the missing links
                                of <b>TRUST</b> and <b>TRANSPARENCY</b>,  and we are committed to push our idea to that level.

                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                </div>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">What we do?</h4>
                                <p>
                                    Seeking effective altruism? Look no futher.
                                    We make sure that you have complete control over
                                    the donations you make, and excericise complete
                                    transparency.
                                </p>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = AboutPage;
