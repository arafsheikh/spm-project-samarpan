'use strict';
const Actions = require('./actions');
const Alert = require('../../../components/alert.jsx');
const Button = require('../../../components/form/button.jsx');
const ControlGroup = require('../../../components/form/control-group.jsx');
const React = require('react');
const Spinner = require('../../../components/form/spinner.jsx');
const Store = require('./store');
const TextControl = require('../../../components/form/text-control.jsx');
const TextareaControl = require('../../../components/form/textarea-control.jsx');
import Dropdown from 'react-dropdown'

const options = ['vendor1', 'vendor2', 'vendor3', 'vendor4', 'vendor5'];

class Form extends React.Component {
    
    constructor(props) {

        super(props);
        this.state = {
            selected: options[0]
          }
        this._onSelect = this._onSelect.bind(this)

        this.input = {};
        this.state = Store.getState();
    }

    _onSelect (option) {
        console.log('You selected ', option.label)
        this.setState({selected: option})
      }

    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));

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

        Actions.sendTransaction({
            vendor: this.state.selected,
            amt: this.input.amt.value(),
        });
    }

    render() {

        let alert = [];

        if (this.state.success) {
            alert = <Alert
                type="success"
                message="Success. We have received your transaction."
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
                <label>Select your vendor</label>
                <Dropdown options={options} onChange={this._onSelect} value={options[0]} placeholder="Select an option" />
                <br />
                <TextControl
                    ref={(c) => (this.input.amt = c)}
                    name="amount"
                    label="Amount paid"
                    hasError={this.state.hasError.amt}
                    help={this.state.help.amt}
                    disabled={this.state.loading}
                />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{ 'btn-primary': true }}
                        disabled={this.state.loading}>

                        Add Transaction
                        <Spinner space="left" show={this.state.loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <section>
                <h1 className="page-header">Add new transaction</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {alert}
                    {formElements}
                </form>
            </section>
        );
    }
}


module.exports = Form;
