import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class AppLoggedOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="pageFlexContainer">
        <h1 className="logo">PassPass</h1>
      </div>
    )
  }
}

ReactDOM.render(<AppLoggedOut />, document.getElementById('appLoggedOut'));
