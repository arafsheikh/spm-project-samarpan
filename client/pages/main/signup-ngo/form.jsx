'use strict';
const Actions = require('./actions');
const Alert = require('../../../components/alert.jsx');
const Button = require('../../../components/form/button.jsx');
const ControlGroup = require('../../../components/form/control-group.jsx');
const React = require('react');
const Spinner = require('../../../components/form/spinner.jsx');
const Store = require('./store');
const TextControl = require('../../../components/form/text-control.jsx');


class Form extends React.Component {
    constructor(props) {

        super(props);

        this.input = {};
        this.state = Store.getState();
    }

    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));

        if (this.input.name) {
            this.input.name.focus();
        }
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {

        this.setState(Store.getState());
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.sendRequest({
            name: this.input.name.value(),
            username: this.input.username.value(),
            email: this.input.email.value(),
            doc1: this.input.doc1.value(),
            doc2: this.input.doc2.value()
        });
    }

    render() {

        let alert = [];

        if (this.state.success) {
            alert = <Alert
                type="success"
                message="Success. Redirecting..."
            />;
        }
        else if (this.state.error) {
            alert = <Alert
                type="danger"
                message={this.state.error}
            />;
        }

        let formElements;

        if (!this.state.success) {
            formElements = <fieldset>
                <TextControl
                    ref={(c) => (this.input.name = c)}
                    name="name"
                    label="Name"
                    hasError={this.state.hasError.name}
                    help={this.state.help.name}
                    disabled={this.state.loading}
                />
                <TextControl
                    ref={(c) => (this.input.email = c)}
                    name="email"
                    label="Email"
                    hasError={this.state.hasError.email}
                    help={this.state.help.email}
                    disabled={this.state.loading}
                />
                <TextControl
                    ref={(c) => (this.input.username = c)}
                    name="username"
                    label="Username"
                    hasError={this.state.hasError.username}
                    help={this.state.help.username}
                    disabled={this.state.loading}
                />
                <TextControl
                    ref={(c) => (this.input.doc1 = c)}
                    name="doc1"
                    label="Certificate of registration with National Trust"
                    hasError={this.state.hasError.doc1}
                    help={this.state.help.doc1}
                    disabled={this.state.loading}
                />
                <TextControl
                    ref={(c) => (this.input.doc2 = c)}
                    name="doc2"
                    label="Certificate of registration under PWD Act"
                    hasError={this.state.hasError.doc2}
                    help={this.state.help.doc2}
                    disabled={this.state.doc2}
                />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{ 'btn-success': true }}
                        disabled={this.state.loading}>

                        Request verification
                        <Spinner space="left" show={this.state.loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <section>
                <h1 className="page-header">Sign up as NGO</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {alert}
                    {formElements}
                </form>
            </section>
        );
    }
}


module.exports = Form;
