import React from 'react';
import $ from 'jquery';

class SignInBox extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	inputEmail: '',
    	inputPassword: ''
    };
  }

  handleChangeInputEmail (event) {
  	var newState = Object.assign({}, this.state);
  	newState.inputEmail = event.target.value;
  	this.setState(newState);
  }

  handleChangeInputPassword (event) {
  	var newState = Object.assign({}, this.state);
  	newState.inputPassword = event.target.value;
  	this.setState(newState);
  }

  handleSignIn () {
  	$.ajax({
		  method: "POST",
		  url: "test.js",
		  contentType: "application/JSON",
		  data: JSON.stringify({
		  	email: this.state.inputEmail,
		  	password: this.state.inputPassword
		  }),
		  success: function (data) {
		  	console.log(data);
		  }
		});
  }

  render () {
    return (
      <div className="signInContainer">
        <form className="form-signin">
        	<h2 className="form-signin-heading">Please sign in</h2>
        	<label htmlFor="inputEmail" className="sr-only">Email address</label>
        	<input onChange={this.handleChangeInputEmail.bind(this)} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
        	<label htmlFor="inputPassword" className="sr-only">Password</label>
        	<input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
        	<div className="checkbox">
        		<label>
        			<input type="checkbox" value="remember-me"/> Remember me
        		</label>
        	</div>
        	<button onSubmit={this.handleSignIn.bind(this)} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    )
  }
}

export default SignInBox;