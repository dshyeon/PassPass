import React from 'react';
import $ from 'jquery';
import SignUpBox from './SignUpBox.jsx';
import SignInBox from './SignInBox.jsx';

class AppLoggedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="appLoggedOutPageContainer">
        <div className="pageHeader">
          <h1 className="signedOutLogo">PassPass</h1>
          <small>The Marketplace for Classpass Classes</small>
        </div>
        <a href="logged-in.html">logged-in</a>
        <div className="signInContainerRow">
          <SignInBox />
        </div>
        <div></div>
      </div>
    )
  }
}

export default AppLoggedOut;
