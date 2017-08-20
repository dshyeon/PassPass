import React from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Interactions from './Interactions.jsx';
import BuyPasses from './BuyPasses.jsx';
import SellPasses from './SellPasses.jsx';

class AppLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home'
    };
  }

  pageChange(newPage) {
    this.setState({
      page: newPage
    });
  }

  render () {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-toggleable-md navbar-light bg-faded fixed-top">
            <button className="navbar-toggler navbar-toggler-right collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <h1 onClick={() => {this.pageChange('home')}}>
              PassPass
            </h1>
            &emsp;&emsp;&emsp;
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item nav-link" onClick={() => {this.pageChange('buy')}}>
                  Buy Passes
                </li>
                <li className="nav-item nav-link" onClick={() => {this.pageChange('sell')}}>
                  Sell Passes
                </li>
                <li className="nav-right nav-link" onClick={this.props.logout}>
                  Log Out
                </li>
              </ul>
            </div>
          </nav>
          <div>
            <Route path="/" render={() => (
                this.state.page === 'home' ? (
                  <Interactions pageChange={this.pageChange.bind(this)} />
                ) : (
                  this.state.page === 'buy' ? (
                    <BuyPasses />
                  ) : (
                    <SellPasses />
                  )
                )
              )}/>
          </div>
          <div>
            <Route path="/buypasses" component={BuyPasses}/>
            <Route path="/sellpasses" component={SellPasses}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default AppLoggedIn;

// <li className="nav-item active">
//   <Link to="/interactions">Interactions</Link>
// </li>

// <Route exact path="/interactions" component={Interactions}/>
