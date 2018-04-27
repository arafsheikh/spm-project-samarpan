'use strict';
const Moment = require('moment');
const React = require('react');
var pad1 = {"paddingLeft": "40px"};

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div id="card-success" className="hidden">
              <i className="fa fa-check"></i>
              <p>Payment Successful!</p>
          </div>
          <div id="form-errors" className="hidden">
            <i className="fa fa-exclamation-triangle"></i>
            <p id="card-error">Card error</p>
          </div>
          <div id="form-container">
            <div id="card-front">
                <label>Card Details</label>
                <div id="shadow"></div>
                  <div id="image-container">
                    <span id="amount">Paying Rs: <input type="number" id="amount" placeholder="1000"/></span>
                    <span id="card-image">

                      </span>
                  </div>

                <label htmlFor="card-number">Card Number</label>
                <input type="text" id="card-number" placeholder="1234 5678 9101 1112" maxLength="16"/>
                <div id="cardholder-container">
                  <label htmlFor="card-holder">Card Holder</label>
                  <input type="text" id="card-holder" placeholder="e.g. John Doe" />
                </div>
                <div id="exp-container">
                  <label htmlFor="card-exp">Expiration</label>
                  <input id="card-month" type="text" placeholder="MM" maxLength="2"/>
                  <input id="card-year" type="text" placeholder="YY" maxLength="2"/>
                </div>
                <div id="cvc-container">
                  <label htmlFor="card-cvc"> CVC/CVV</label>
                  <input id="card-cvc" placeholder="XXX-X" type="text" minLength="3" maxLength="4"/>
                  <p>Last 3 or 4 digits</p>
                </div>
            </div>
            <div id="card-back">
              <div id="card-stripe">
              </div>

            </div>
            <input type="text" id="card-token" />
            <button type="button" id="card-btn">Submit</button>
            <button id="btn-cancel" onClick={this.props.closePopup}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}


class HomePage extends React.Component {
    constructor(props) {

        super(props);

        this.state = this.getThisMoment();
        showPopup: false
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

    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }



    render() {

        return (
            <section className="section-home container">

                <div className="row">

                    <div className="col-sm-3">
                        <h1 className="page-header">My Donations</h1>
                        <div className="row">
                          <img src="public/media/mclaren-p1-experimental-prototype.jpg" className="img-responsive img-rounded" alt="Responsive image"/>
                        </div>
                        <div className="row">
                          <h4>Preetham Chandra</h4>
                          <p>Donated Rs. 600000</p>
                        </div>
                    </div>
                    <div className="col-sm-7" style={pad1}>
                      <br/><br/><br/><br/><br/><br/>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Project Name</th>
                            <th>Location</th>
                            <th>Donation</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Sample Project 1</td>
                            <td>Delhi</td>
                            <td>Rs. 2800</td>
                          </tr>
                          <tr>
                            <td>Sample Project 2</td>
                            <td>Ghaziabad</td>
                            <td>Rs. 6900</td>
                          </tr>
                          <tr>
                            <td>Sample Project 3</td>
                            <td>Gurugram</td>
                            <td>Rs. 10200</td>
                          </tr>
                          <tr>
                            <td>Sample Project 4</td>
                            <td>Faridabad</td>
                            <td>Rs. 600000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                </div>
                <div className="row">
                    <div className="col-sm-14">
                        <h1 className="page-header">Live Projects</h1>
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/edu.jpg" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-6">
                            <h3>Education drive</h3>
                            <p>Contribute today and help educate the children in a village named Masyaf.</p>
                        </div>
                        <div className="col-sm-2">
                            <br/><br/><br/>
                            <button onClick={this.togglePopup.bind(this)}>
                              Donate
                            </button>
                        </div>
                    </div>
                </div>
                {this.state.showPopup ?
                  <Popup
                    text='Donate'
                    closePopup={this.togglePopup.bind(this)}
                  />
                  : null
                }
            </section>


        );
    }
}


module.exports = HomePage;
