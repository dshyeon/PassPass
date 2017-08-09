import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <h1>Pass Pass</h1>
      <div>SignInBox Component Goes Here</div>
    )
  }
}

ReactDOM.render(<SignIn />, document.getElementById('signIn'));
