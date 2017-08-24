import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import AppLoggedOut from './components/loggedOutComponents/AppLoggedOut.jsx';
import AppLoggedIn from './components/loggedInComponents/AppLoggedIn.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenicated: false,
      profileData: {}

    };
    // console.log(this.state.profileData, 'this.state.profileData')
  }

  getProfileData(data) {
    console.log(this)
    this.setState({profileData: data});
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
          <Switch>
          <Route path="/interactions" render={() => (
              this.state.authenicated ? (
                <AppLoggedIn logout={this.logOut.bind(this)} authenicated={this.state.authenicated} profileData={this.state.profileData}/>
              ) : (
                <Redirect to="/"/>
              )
            )}
          />
          <Route path="/" render={() => (
              this.state.authenicated ? (
                <Redirect to='/interactions'/>
              ) : (
                <AppLoggedOut getProfileData={this.getProfileData.bind(this)} login={this.logIn.bind(this)} authenicated={this.state.authenicated}/>
              )
            )}
          />
        </Switch>
    		</div>
    	</Router>
    )
  }
}

export default App;
