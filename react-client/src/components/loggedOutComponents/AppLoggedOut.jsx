import React from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Redirect from 'react-router';
import SignUpBox from './SignUpBox.jsx';
import SignInBox from './SignInBox.jsx';

class AppLoggedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      signup: false
    };
  }

  signUp(){
    this.setState({signup: !this.state.signup});
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
            </div>
          </nav>
          <div>
            <Route exact path="/" render={() => (
                this.state.loggedIn ? (
                  <Redirect to="/buypasses"/>
                ) : (
                  this.state.signup ? (
                    <SignUpBox signup={this.signUp.bind(this)} />
                  ) : (
                    <SignInBox  signup={this.signUp.bind(this)} />
                  )
                )
              )}/>
            <Route path="/login" component={SignInBox}/>
            <Route path="/signup" component={SignUpBox}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default AppLoggedOut;
