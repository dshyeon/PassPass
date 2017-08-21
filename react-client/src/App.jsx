import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import AppLoggedOut from './components/loggedOutComponents/AppLoggedOut.jsx';
import AppLoggedIn from './components/loggedInComponents/AppLoggedIn.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenicated: false
    };
  }

  logIn(){
    this.setState({authenicated: !this.state.authenicated});
  }

  logOut(){
    this.setState({authenicated: !this.state.authenicated});
  }

  render () {
    return (
      <Router>
    		<div>
          <Route path="/interactions" render={() => (
              this.state.authenicated ? (
                <AppLoggedIn logout={this.logOut.bind(this)} authenicated={this.state.authenicated}/>
              ) : (
                <Redirect to="/"/>
              )
            )}
          />
          <Route path="/" render={() => (
              this.state.authenicated ? (
                <Redirect to='/interactions'/>
              ) : (
                <AppLoggedOut login={this.logIn.bind(this)} authenicated={this.state.authenicated}/>
              )
            )}
          />
        
    		</div>
    	</Router>
    )
  }
}

export default App;
