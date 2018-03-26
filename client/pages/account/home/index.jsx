'use strict';
const Moment = require('moment');
const React = require('react');


class HomePage extends React.Component {
    constructor(props) {

        super(props);

        this.state = this.getThisMoment();
    }

    componentDidMount() {

        this.interval = setInterval(this.refreshTime.bind(this), 1000);
    }

    componentWillUnmount() {

        clearInterval(this.interval);
    }

    refreshTime() {

        this.setState(this.getThisMoment());
    }

    getThisMoment() {

        const thisMoment = Moment();

        return {
            second: thisMoment.format('ss'),
            minute: thisMoment.format('mm'),
            hour: thisMoment.format('HH'),
            day: thisMoment.format('DD'),
            month: thisMoment.format('MM'),
            year: thisMoment.format('YYYY')
        };
    }

    render() {

        return (
            <section className="section-home container">
                <div className="row">
                    <div className="col-sm-7">
                        <h1 className="page-header">My Donations</h1>
                        <div className="row">
                            {/* <div className="col-sm-4">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        {this.state.hour}
                                    </div>
                                    <div className="stat-label">hour</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        {this.state.minute}
                                    </div>
                                    <div className="stat-label">minute</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        {this.state.second}
                                    </div>
                                    <div className="stat-label">second</div>
                                </div>
                            </div> */}
                            <div className="col-sm-4">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        Project #1
                                    </div>
                                    <div className="stat-label">Rs. 13,554</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        Project #2
                                    </div>
                                    <div className="stat-label">Rs. 22,405</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="well text-center">
                                    <div className="stat-value">
                                        Project #3
                                    </div>
                                    <div className="stat-label">Rs. 12,333</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 text-center">
                        <h1 className="page-header">My Statistics</h1>
                        <i className="fa fa-dashboard bamf"></i>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = HomePage;
