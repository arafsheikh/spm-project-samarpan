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
                                    Sign up now!
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

                    <div className="col-sm-10">
                        <h1 className="page-header">Active NGOs</h1>
                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/gd.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-10">
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
                        </div>
                        <hr/>

                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/ap.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-10">
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
                        </div>
                        <hr/>

                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/cw.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-10">
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
                        </div>
                        <hr/>

                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/wl.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-10">
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
                        </div>
                        <hr/>

                        <div className="row">
                        <div className="col-sm-2">
                            <br/>
                            <img src="public/media/zl.tiff" className="img-responsive img-rounded" alt="Responsive image" style={{width: 150, height: 100}}/>
                        </div>
                        <div className="col-sm-10">
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
                        </div>
                        <hr/>


                    </div>

                    

                    
                </div>
            </section>
        );
    }
}


module.exports = HomePage;
