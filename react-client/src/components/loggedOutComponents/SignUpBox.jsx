import React from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class SignUpBox extends React.Component {
  constructor() {
    super();
    this.state = {

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

  handleSignUp (event) {
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
		  	console.log('*********** sign up success: data returned ', data);
        //redirect to logged in page
		  },
      error: function(err) {
        console.log('********** sign up error ', err);
      }
		});
  }

  render () {
    return (
      <Router>
        <div className="signUpContainer">
          <form className="form-signup" onSubmit={this.handleSignUp.bind(this)}>
          	<h2 className="form-signup-heading">Please sign up</h2>
          	<label htmlFor="inputEmail" className="sr-only">Email address</label>
          	<input onChange={this.handleChange.bind(this)} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
          	<label htmlFor="inputPassword" className="sr-only">Password</label>
          	<input onChange={this.handleChange.bind(this)} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          	<div className="checkbox">
          		<label>
          			<input type="checkbox" id="remember-me" checked={this.state.rememberMe} onChange={this.handleCheckbox.bind(this)} /> Remember me
          		</label>
          	</div>
          	<button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
          </form>
        </div>
      </Router>
    )
  }
}

export default SignUpBox;
