import React from 'react';
import {render} from 'react-dom';
var ProxyQ=require('../../components/proxy/ProxyQ.js');
var SyncStore = require('../../components/flux/stores/SyncStore');
import '../../build/css/JFFormStyle-1.css'
import '../../build/css/jquery-ui.css'
import '../../build/css/style.css'
import Heard from '../modules/Heard'
import Banner from '../modules/Banner'
import Foot from '../modules/Foot'
var MainPage =React.createClass({
    test:function () {
        $(window).load(function(){

            $('.marquee').marquee({ pauseOnHover: true });

            function cycle($item, $cycler){
                setTimeout(cycle, 2000, $item.next(), $cycler);

                $item.slideUp(1000,function(){
                    $item.appendTo($cycler).show();
                });

            }
            cycle($('#cycler div:first'),  $('#cycler'));
        });


    },

    render:function () {
        var contains=null;

            contains=
                <div onLoad={this.test()}>
                    <Heard/>

                    <Banner/>

                    <div className="clearfix"> </div>


                    <div className="move-text">
                        <div className="marquee">欢迎来到"羽毛球热"</div>
                    </div>


                  <div className="banner-bottom">
                    <div className="container">
                        <div className="banner-bottom-info">
                            <h3>Today's Top Deals</h3>
                        </div>
                        <div className="banner-bottom-grids">
                            <div className="col-md-4 banner-bottom-grid">
                                <div className="destinations">
                                    <ul>
                                        <li className="button"><a href="#">Goa Popular Hotels</a>
                                            <li className="dropdown active">
                                                <a href="products.html">
                                                    <div className="destinations-grid">
                                                        <img src="images/a1.jpg" alt="" />
                                                    </div>
                                                    <div className="destinations-grid-info">
                                                        <div className="destinations-hotel">Lorem ipsum dolor sit amet , Goa</div>
                                                        <div className="destinations-star">
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </div>
                                                        <div className="destinations-price">$100</div>
                                                        <div className="clearfix"> </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </li>
                                        <li className="button"><a href="#">Bangalore Popular Hotels</a>
                                            <li className="dropdown">
                                                <a href="products.html">
                                                    <div className="destinations-grid">
                                                        <img src="images/a4.jpg" alt="" />
                                                    </div>
                                                    <div className="destinations-grid-info">
                                                        <div className="destinations-hotel">Lorem ipsum dolor sit amet , Bangalore</div>
                                                        <div className="destinations-star">
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </div>
                                                        <div className="destinations-price">$100</div>
                                                        <div className="clearfix"> </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </li>
                                        <li className="button"><a href="#">Bangkok Popular Hotels</a>
                                            <li className="dropdown">
                                                <a href="products">
                                                    <div className="destinations-grid">
                                                        <img src="images/a3.jpg" alt="" />
                                                    </div>
                                                    <div className="destinations-grid-info">
                                                        <div className="destinations-hotel">Lorem ipsum dolor sit amet , Bangkok</div>
                                                        <div className="destinations-star">
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </div>
                                                        <div className="destinations-price">$240</div>
                                                        <div className="clearfix"> </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </li>
                                        <li className="button"><a href="#">Malaysia Popular Hotels</a>
                                            <li className="dropdown">
                                                <a href="products.html">
                                                    <div className="destinations-grid">
                                                        <img src="images/a1.jpg" alt="" />
                                                    </div>
                                                    <div className="destinations-grid-info">
                                                        <div className="destinations-hotel">Lorem ipsum dolor sit amet , Malaysia</div>
                                                        <div className="destinations-star">
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                        </div>
                                                        <div className="destinations-price">$320</div>
                                                        <div className="clearfix"> </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </li>
                                    </ul>
                                </div>
                                <div className="choose">
                                    <div className="choose-info">
                                        <h4>Why Choose Us</h4>
                                    </div>
                                    <div className="choose-grids">
                                        <div className="choose-grids-info">
                                            <div className="choose-left">
                                                <h5>09</h5>
                                                <span>Million</span>
                                            </div>
                                            <div className="choose-right">
                                                <a href="products.html">Aliquam faucibus vehicula vulputate</a>
                                                <p>Maecenas euismod tortor a tristique convallis diam eros aliquam.</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                        </div>
                                        <div className="choose-grids-info">
                                            <div className="choose-left">
                                                <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
                                            </div>
                                            <div className="choose-right">
                                                <a href="products.html">Sed tincidunt consectetur augue</a>
                                                <p>Nulla bibendum libero in nunc eleifend tincidunt. Aliquam quis molestie lectus</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                        </div>
                                        <div className="choose-grids-info">
                                            <div className="choose-left">
                                                <h6>$</h6>
                                            </div>
                                            <div className="choose-right">
                                                <a href="products.html">Nullam et arcu interdum, accumsan justo</a>
                                                <p>Maecenas dapibus eu purus vel imperdiet. Maecenas cursus, arcu sed tempus </p>
                                            </div>
                                            <div className="clearfix"> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 banner-bottom-grid">
                                <div className="banner-bottom-middle">
                                    <a href="products.html">
                                        <img src="images/a2.jpg" alt="" />
                                        <div className="destinations-grid-info tours">
                                            <h5>Book your next Malaysia holiday!</h5>
                                            <p>Integer eget aliquam nibh. Donec blandit volutpat libero id lacinia</p>
                                            <p className="b-period">Book Period: Now - 7 September 2015 | Travel Period: Now - 31 October 2015 </p>
                                        </div>
                                    </a>
                                </div>
                                <div className="top-destinations-grids">
                                    <div className="top-destinations-info">
                                        <h4>Top Destinations</h4>
                                    </div>
                                    <div className="top-destinations-bottom">
                                        <div className="td-grids">
                                            <div className="col-xs-3 td-left">
                                                <img src="images/t1.jpg" alt="" />
                                            </div>
                                            <div className="col-xs-7 td-middle">
                                                <a href="products.html">Donec libero id lacinia</a>
                                                <p>Dapibus eu purus vel libero in nunc</p>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </div>
                                            <div className="col-xs-2 td-right">
                                                <p>$190</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                        </div>
                                        <div className="td-grids">
                                            <div className="col-xs-3 td-left">
                                                <img src="images/t2.jpg" alt="" />
                                            </div>
                                            <div className="col-xs-7 td-middle">
                                                <a href="products.html">Donec libero id lacinia</a>
                                                <p>Dapibus eu purus vel libero in nunc</p>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </div>
                                            <div className="col-xs-2 td-right">
                                                <p>$213</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                        </div>
                                        <div className="td-grids">
                                            <div className="col-xs-3 td-left">
                                                <img src="images/t3.jpg" alt="" />
                                            </div>
                                            <div className="col-xs-7 td-middle">
                                                <a href="products.html">Donec libero id lacinia</a>
                                                <p>Dapibus eu purus vel libero in nunc</p>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </div>
                                            <div className="col-xs-2 td-right">
                                                <p>$176</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                        </div>
                                        <div className="td-grids">
                                            <div className="col-xs-3 td-left">
                                                <img src="images/t4.jpg" alt="" />
                                            </div>
                                            <div className="col-xs-7 td-middle">
                                                <a href="products.html">Donec libero id lacinia</a>
                                                <p>Dapibus eu purus vel libero in nunc</p>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                            </div>
                                            <div className="col-xs-2 td-right">
                                                <p>$490</p>
                                            </div>
                                            <div className="clearfix"> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 banner-bottom-grid">
                                <div className="banner-bottom-right">
                                    <a href="products.html">
                                        <img src="images/a3.jpg" alt="" />
                                        <div className="destinations-grid-info tours">
                                            <h5>New Hotel Experiences at Your Favourite Destinations</h5>
                                            <p>Integer eget aliquam nibh. Donec blandit volutpat libero id lacinia</p>
                                            <p className="b-period">Book Period: Now - 7 September 2015 | Travel Period: Now - 31 October 2015 </p>
                                        </div>
                                    </a>
                                </div>
                                <div className="news-grids">
                                    <div className="news-grids-info">
                                        <h4>Latest News</h4>
                                    </div>
                                    <div className="news-grids-bottom">

                                        <div id="design" className="date">
                                            <div id="cycler">
                                                <div className="date-text">
                                                    <a href="single.html">August 15,2015</a>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                </div>
                                                <div className="date-text">
                                                    <a href="single.html">July 08,2015</a>
                                                    <p>Nullam non turpis sit amet metus tristique egestas et et orci.</p>
                                                </div>
                                                <div className="date-text">
                                                    <a href="single.html">February 15,2015</a>
                                                    <p>Duis venenatis ac ipsum vel ultricies in placerat quam</p>
                                                </div>
                                                <div className="date-text">
                                                    <a href="single.html">January 15,2015</a>
                                                    <p>Pellentesque ullamcorper fringilla ipsum, ornare dapibus velit volutpat sit amet.</p>
                                                </div>
                                                <div className="date-text">
                                                    <a href="single.html">September 24,2014</a>
                                                    <p>In lobortis ipsum mi, ac imperdiet elit pellentesque at.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>



                <Foot/>
                </div>

            return contains;

        }


})
module.exports=MainPage;