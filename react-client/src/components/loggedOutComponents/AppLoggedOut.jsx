import React from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import SignUpBox from './SignUpBox.jsx';
import SignInBox from './SignInBox.jsx';

class AppLoggedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              <Link to="/" className="navbar-brand">PassPass</Link>
            </h1>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Buy Passes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Sell Passes</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="signInContainerRow">
            <SignInBox />
          </div>
          <div>
            <Route path="/login" component={SignInBox}/>
            <Route path="/signup" component={SignUpBox}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default AppLoggedOut;
