import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SignUpBox from './components/loggedOutComponents/SignUpBox.jsx';
import SignInBox from './components/loggedOutComponents/SignInBox.jsx';

class AppLoggedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="appLoggedOutPageContainer">
        <div className="pageHeader">
          <h1 class="signedOutLogo">PassPass</h1>
          <small>The Marketplace for Classpass Classes</small>
        </div>
        <div className="signInContainerRow">
          <SignInBox />
        </div>
        <div>Whatever goes at the bottom of the page (this will be thicker so box will be centered)</div>
      </div>
    )
  }
}

ReactDOM.render(<AppLoggedOut />, document.getElementById('appLoggedOut'));
