import React from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import SignUpBox from './SignUpBox.jsx';

class SignInBox extends React.Component {
	constructor() {
    super();
    this.state = {
    	inputEmail: '',
    	inputPassword: '',
      rememberMe: false,
      signUp: false
    };
  }

  handleChange(event) {
  	var newState = {};
  	newState[event.target.id] = event.target.value;
  	this.setState(newState);
  }

  handleCheckbox(event) {
    this.setState({rememberMe: !this.state.rememberMe});
  }

  handleSignIn (event) {
    event.preventDefault();
  	$.ajax({
		  method: 'POST',
		  url: '/auth/email',
		  contentType: 'application/JSON',
		  data: JSON.stringify({
		  	email: this.state.inputEmail,
		  	password: this.state.inputPassword,
        rememberMe: this.state.rememberMe
		  }),
		  success: function (data) {
		  	console.log('*********** sign in success: data returned ', data);
        //redirect to logged in page
		  },
      error: function(err) {
        console.log('********** sign in error ', err);
      }
		});
  }

  signUp(){
    this.setState({signUp: true});
  }

  render () {
    if (this.state.signUp) {
      return (
        <Router>
          <div>
            <SignUpBox />
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div className="signInContainer">
            <form className="form-signin" onSubmit={this.handleSignIn.bind(this)}>
            	<h2 className="form-signin-heading">Please sign in</h2>
            	<label htmlFor="inputEmail" className="sr-only">Email address</label>
            	<input onChange={this.handleChange.bind(this)} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
            	<label htmlFor="inputPassword" className="sr-only">Password</label>
            	<input onChange={this.handleChange.bind(this)} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
            	<div className="checkbox">
            		<label>
            			<input type="checkbox" id="remember-me" checked={this.state.rememberMe} onChange={this.handleCheckbox.bind(this)} /> Remember me
            		</label>
            	</div>
            	<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              <div>
                New User? <a href='#' onClick={this.signUp.bind(this)}>Sign up</a>
              </div>
            </form>
          </div>
        </Router>
      )
    }
  }
}

export default SignInBox;
