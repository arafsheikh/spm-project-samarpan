'use strict';
const React = require('react');
const Form = require('./form.jsx');


class NewTransaction extends React.Component {
    render() {
        return (
            <section className="section-home container">
                <div className="row">
                    <div className="col-sm-7">
                        <div className="row">
                            <Form />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = NewTransaction;
