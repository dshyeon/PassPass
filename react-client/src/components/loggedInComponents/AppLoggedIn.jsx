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
    this.state = {};
  }

  render () {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right"
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">PassPass</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/interactions">Interactions</Link>
                </li>
                <li className="nav-item">
                  <Link to="/buypasses">Buy Passes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/sellpasses">Sell Passes</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div>
            <Route exact path="/interactions" component={Interactions}/>
            <Route path="/buypasses" component={BuyPasses}/>
            <Route path="/sellpasses" component={SellPasses}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default AppLoggedIn;