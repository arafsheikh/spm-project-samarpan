'use strict';
const Moment = require('moment');
const React = require('react');
const Actions = require('./actions');
const Store = require('./store');
var pad1 = {"paddingLeft": "40px"};
var obj;
const http = require('http');


var options = {
  host: '192.168.1.102',
  port: 3000,
  path: '/api/namespace1.AccountTransfer'
};

function CreateTableFromJSON() {

        // EXTRACT VALUE FOR HTML HEADER.
        var col = ['to', 'amount', 'timestamp'];

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.setAttribute("class", "table table-striped")
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "Contributed to";
        tr.appendChild(th);
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "Amount";
        tr.appendChild(th);
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "Date";
        tr.appendChild(th);

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < obj.length; i++) {
            if(obj[i].from=="resource:namespace1.Account#" + "mohit"/*this.state.user.username*/){
              tr = table.insertRow(-1);

              for (var j = 0; j < col.length; j++) {
                  var tabCell = tr.insertCell(-1);
                  if(j==0){
                      tabCell.innerHTML = String(obj[i][col[j]]).slice(28);
                  }
                  else if(j==1){
                      tabCell.innerHTML = "Rs. " + String(obj[i][col[j]]);
                  }
                  else if(j==2){
                      tabCell.innerHTML = String(obj[i][col[j]]).slice(0, 10);
                  }
                  else{
                    tabCell.innerHTML = obj[i][col[j]];
                  }

              }
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
}

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);

  res.on("data", function(chunk) {
    //console.log("BODY: " + chunk);
    obj = JSON.parse(chunk);
    CreateTableFromJSON();
    console.log(obj);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

class Popup extends React.Component {

  constructor(props) {
    super(props);

    Actions.getUser();
    this.state = Store.getState();

    this.handleAmtChange = this.handleAmtChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    Actions.donateReq({
        name: this.state.user.username,
        amt: this.state.amt,
        org: 'abc'
    });
  }

  handleAmtChange(event) {
    this.setState({amt: event.target.value});
  }

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
                    <span id="amount">Paying Rs: <input type="number" id="amount" placeholder="1000" value={this.state.amt} onChange={this.handleAmtChange}/></span>
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
            <button type="button" id="card-btn" onClick={this.handleSubmit.bind(this)}>Submit</button>
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
        Actions.getUser();

        this.state = Store.getState();
        showPopup: false
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
                          <h4>{this.state.user.username}</h4>
                          <p>Donated Rs. 600000</p>
                        </div>
                    </div>
                    <div className="col-sm-7" style={pad1}>
                      <br/><br/><br/><br/><br/><br/>
                      <div id="showData"></div>
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
