import React from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import SignInBox from './SignInBox.jsx';

class SignUpBox extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPassword: '',
      inputFirst: '',
      inputLast: '',
      inputPhone: '',
      rememberMe: false
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
		  url: '/auth/signup',
		  contentType: 'application/JSON',
		  data: JSON.stringify({
		  	email: this.state.inputEmail,
		  	password: this.state.inputPassword,
        first_name: this.state.inputFirst,
		  	last_name: this.state.inputLast,
        phone: this.state.inputPhone,
        rememberMe: this.state.rememberMe
		  }),
		  success: function (data) {
        if (data.sqlMessage) {
          console.log(data.sqlMessage);
          //push this error message to a popup with more appropriate wording/display
        } else {
          console.log('successful login');
          //redirect user to right page
        }
		  },
      error: function(err) {
        console.log('********** sign up error ', err);
      }
		});
  }

  render () {
    return (
      <Router>
        <div className="signInContainerRow">
          <div className="signInContainer">
            <form className="form-signup" onSubmit={this.handleSignUp.bind(this)}>
            	<small className="form-signup-heading">Sign Up for a New Account</small>
              <br></br>Existing User? <a href='#' onClick={this.props.signup}>Log In</a>
              <br></br>
              <br></br>
            	<label>Email address*: </label>
              <input onChange={this.handleChange.bind(this)} type="email" id="inputEmail" className="form-control" required autoFocus/>
            	<label>Password*: </label>
              <input onChange={this.handleChange.bind(this)} type="password" id="inputPassword" className="form-control" required/>
              <label>First Name: </label>
            	<input onChange={this.handleChange.bind(this)} type="text" id="inputFirst" className="form-control" required/>
              <label>Last Name: </label>
            	<input onChange={this.handleChange.bind(this)} type="text" id="inputLast" className="form-control" required/>
              <label>Phone: </label>
            	<input onChange={this.handleChange.bind(this)} type="text" id="inputPhone" className="form-control" required/>
            	<div className="checkbox">
            		<label>
            			<input type="checkbox" id="remember-me" checked={this.state.rememberMe} onChange={this.handleCheckbox.bind(this)} /> Remember me
            		</label>
            	</div>
            	<button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
            </form>
          </div>
        </div>
      </Router>
    )
  }
}

export default SignUpBox;
