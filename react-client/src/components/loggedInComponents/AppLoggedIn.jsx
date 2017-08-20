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
            <h1>
              <Link to="/buypasses" className="navbar-brand">PassPass</Link>
            </h1>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/buypasses" className="nav-link">Buy Passes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/sellpasses" className="nav-link">Sell Passes</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div>
            <Route path="/" render={() => (
                this.state.page === 'home' ? (
                  <Interactions />
                ) : (
                  this.state.page === 'buy' ? (
                    <BuyPasses pageChange={this.pageChange.bind(this)} />
                  ) : (
                    <SellPasses pageChange={this.pageChange.bind(this)} />
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
