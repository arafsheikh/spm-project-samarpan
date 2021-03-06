'use strict';
const Moment = require('moment');
const React = require('react');
const Actions = require('./actions');
const Store = require('./store');
var pad1 = {"paddingLeft": "40px"};
var aliCenter = {"text-align": "center"};
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
    window.confirm('Thank you for your donation.');
    this.props.closePopup();
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
                        <h1 className="page-header">Active NGOs</h1>
                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/gd.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-6">
                            <h3>Give Directly</h3>
                            <p>The organisation is fundamentally based around the concept of “A radical new way to give: directly”.
                              Never before has an NGO been established to divert funds directly into individuals and family’s hands,
                              cutting out the middle man and all the expenses with it as they go. The NGO has been tremendously
                              effective in just its short time in operation and was recently lauded as one of the Give Well’s Top
                              Charities for Giving Season 2013. The concept behind Give Directly is beautifully simple: 
                              <ul>
                                <li>Donate through their webpage </li>
                                <li>Give Directly locates poor households in Kenya and Uganda </li>
                                <li>The NGO transfers your donation to the recipient electronically via their phone </li>
                                <li>The beneficiary uses the contribution to pursue his or her goals however they wish</li>
                              </ul>                     
                              </p>
                        </div>
                        
                        <div className="col-sm-2" style={aliCenter}>
                            <br/><br/><br/>
                            <h4>Trust Value<br/>
                            <b>3</b></h4><br/>

                            <button onClick={this.togglePopup.bind(this)}>
                              Donate
                            </button>
                        </div>
                        </div>

                        <hr/>
                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/ap.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-6">
                            <h3>APOPO</h3>
                            <p>Dutch for Anti-Persoonsmijnen Ontmijnende Product Ontwikkeling, or Anti-Personnel Landmines Detection Product Development
                              in English, is a social enterprise that researches, develops and implements detection rat technology for humanitarian
                              purposes. Yes, rats! APOPO have trained giant African pouched rats to tackle two of the most challenging development
                              solutions in Africa, landmines and Tuberculosis. Both landmines and TB continue to kill people every day around the
                              world, yet solutions to counter the threat have barely evolved in the last few decades. That is until a Flemish rodent
                              enthusiast by the name of Bart Weetjens pioneered the use of indigenous African rodents to detect un-exploded mines and
                              weaponry in the earth and TB in sputum samples. The organisation has made a huge impact since its formation in 1997 and
                              this year was voted as the eleventh best NGO in the world.                     
                              </p>
                        </div>
                        
                        <div className="col-sm-2" style={aliCenter}>
                            <br/><br/><br/>
                            <h4>Trust Value<br/>
                            <b>5</b></h4><br/>

                            <button onClick={this.togglePopup.bind(this)}>
                              Donate
                            </button>
                        </div>
                        </div>

                        <hr/>
                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/cw.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-6">
                            <h3>charity: water</h3>
                            <p>Another reletively new NGO who has made considerable waves with its innovative approach over the past decade is charity: water.
                              The organisation was established to tackle the most basic of human needs, access to clean water. Working mostly in the developing
                              world the NGO has is famed for its brilliant digital presence and marketing as well as innovative donor strategies such as
                              guarenteeing that 100% of public donations will be used fund clean water projects. They achieve this by developing long term
                              relationships with institutional donors who agree to cover their management and administrative costs. Their approach has caught
                              the eye of both individuals and funding organisations with its excellent track record and it looks like the NGO will continue to
                              go from strength to strength in the coming years.        
                              </p>
                        </div>
                        
                        <div className="col-sm-2" style={aliCenter}>
                            <br/><br/><br/>
                            <h4>Trust Value<br/>
                            <b>3</b></h4><br/>

                            <button onClick={this.togglePopup.bind(this)}>
                              Donate
                            </button>
                        </div>
                        </div>

                        <hr/>
                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/wl.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-6">
                            <h3>Wild4Life</h3>
                            <p>Wild4Life was established to serve people in remote, rural communities who have limited or no access to health
                              service providers. The NGO has developed a fantastically innovative service delivery model that maximises the
                              environment they operate in to reach more people than would be otherwise possible. The model involves partnering
                              with organisations that are already established in remote areas and have well developed connections with the
                              local community. This approach serves to leverage existing infrastructure, knowledge and social ties with
                              Wild4Lifes network of health providers to enable life changing treatment and support to reach some of the hardest
                              to reach people and places on the planet. The NGO is active in twelve countries throughout sub-Saharan Africa
                              delivering supremely low cost interventions that are both sustainable and scalable.
                              </p>
                        </div>
                        
                        <div className="col-sm-2" style={aliCenter}>
                            <br/><br/><br/>
                            <h4>Trust Value<br/>
                            <b>2</b></h4><br/>

                            <button onClick={this.togglePopup.bind(this)}>
                              Donate
                            </button>
                        </div>
                        </div>

                        <hr/>
                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/zl.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-6">
                            <h3>ZanaLife</h3>
                            <p>ZanaLife, based in Kenya, is a hybrid healthcare and girls education NGO that is working to helping young
                              women stay in school and reach their potential. The organisation is tackling two core humanitarian issues at
                              once, a lack of access to appropriate health care information and products, and the rate at which young girls
                              in Africa drop out of schooling. Their latest initiativeis to create truly affordable sanitary pads combined
                              with health education through an interactive comic-based pamphlet that is designed to enable girls to make
                              informed decisions and measurably increase their productivity and health. ZanaLife’s research has shown that
                              pads and healthcare information win back 75% of learning days, helping girls to stay in school and fulfil
                              their potential. By 2020 the NGO aims to reach three million girls with pads and supply over ten million
                              comics across East Africa.
                              </p>
                        </div>
                        
                        <div className="col-sm-2" style={aliCenter}>
                            <br/><br/><br/>
                            <h4>Trust Value<br/>
                            <b>4</b></h4><br/>

                            <button onClick={this.togglePopup.bind(this)}>
                              Donate
                            </button>
                        </div>
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
