import React from 'react';
import {render} from 'react-dom';
import '../../build/css/JFFormStyle-1.css';
import '../../build/css/jquery-ui.css';
import '../../build/css/style.css';

var ContainSpace = React.createClass({

    render:function() {
        var contains = null;
        contains =
            <div className="banner-bottom">
                <div className="container">
                    <div className="banner-bottom-grids">
                        <div className="col-md-4 banner-bottom-grid">
                            <div className="choose-info">
                                <h4>资讯热点</h4>
                            </div>
                            <div className="destinations" style={{ paddingTop:'15px' }}>
                                <ul>
                                    <li className="button"><a href="#">资讯热点</a>
                                        <li className="dropdown active">
                                            <a href="products.html">
                                                <div className="destinations-grid">
                                                    <img src={window.App.getResourceDeployPrefix()+"images/a1.jpg"} alt="" />
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
                                                    <img src={window.App.getResourceDeployPrefix()+"images/a4.jpg"} alt="" />
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
                                                    <img src={window.App.getResourceDeployPrefix()+"images/a3.jpg"} alt="" />
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
                                                    <img src={window.App.getResourceDeployPrefix()+"images/a1.jpg"} alt="" />
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
                            <div className="choose-info">
                                <h4>Why Choose Us</h4>
                            </div>
                            <div className="banner-bottom-middle" style={{ paddingTop: '14px'}}>
                                <a href="products.html">
                                    <img src={window.App.getResourceDeployPrefix()+"images/a2.jpg"} alt="" />
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
                                            <img src={window.App.getResourceDeployPrefix()+"images/t1.jpg"} alt="" />
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
                                            <img src={window.App.getResourceDeployPrefix()+"images/t2.jpg"} alt="" />
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
                                            <img src={window.App.getResourceDeployPrefix()+"images/t3.jpg"} alt="" />
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
                                            <img src={window.App.getResourceDeployPrefix()+"images/t4.jpg"} alt="" />
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
                            <div className="choose-info">
                                <h4>Why Choose Us</h4>
                            </div>
                            <div className="banner-bottom-right" style={{paddingTop:'15px'}}>
                                <a href="products.html">
                                    <img src={window.App.getResourceDeployPrefix()+"images/a3.jpg"} alt="" />
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
        return contains;
    },
    componentDidMount(){

        function cycle($item, $cycler){
            setTimeout(cycle, 2000, $item.next(), $cycler);

            $item.slideUp(1000,function(){
                $item.appendTo($cycler).show();
            });

        }
        cycle($('#cycler div:first'),  $('#cycler'));

        $(document).ready(function(){
            /* This code is executed after the DOM has been completely loaded */

            /* Changing thedefault easing effect - will affect the slideUp/slideDown methods: */
            $.easing.def = "easeOutBounce";

            /* Binding a click event handler to the links: */
            $('li.button a').click(function(e){

                /* Finding the drop down list that corresponds to the current section: */
                var dropDown = $(this).parent().next();

                /* Closing all other drop down sections, except the current one */
                $('.dropdown').not(dropDown).slideUp('slow');
                dropDown.slideToggle('slow');

                /* Preventing the default event (which would be to navigate the browser to the link's address) */
                e.preventDefault();
            })

        });
    }
});
module.exports = ContainSpace;