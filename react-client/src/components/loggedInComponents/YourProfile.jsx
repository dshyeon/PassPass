import React from 'react';
import $ from 'jquery';
import PendingPasses from './PendingPasses.jsx';

class YourProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userId: this.props.profileData.id,
      havePendingPasses: false,
      pendingPasses: []
    };
  }

  componentWillMount () {
    this.getPendingPasses();
  }


  getPendingPasses() {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/passes/pending',
      contentType: 'application/json',
      data: JSON.stringify({userId: this.state.userId}),
      success: function(pendingPasses) {
				if (pendingPasses.length === 0) {
          console.log(pendingPasses, 'NULLLL')
        } else {
          this.setState({havePendingPasses: true, pendingPasses: pendingPasses})
          console.log(this.state.pendingPasses, 'NOTNULLL')
        }
      }.bind(this),
      error: function(xhr, error) {
        console.log('error:', error);
      }
    });
  }

  render() {
    return (
      <div className="about" >
        <br></br>
        <div className="profilePicture">PROFILE PICTURE MAYBE</div>
        <h2 className="profileHeader">
          Welcome to PassPass, {this.props.profileData.first_name}!
        </h2>
        <br></br>
      <div className="profileList">
          <strong>Expired Passes</strong>
      </div>
        <div className="profileList">
          <strong>Currently Available Passes</strong>
      </div>
        <div className="profileList">
          <strong>Pending Passes</strong>
          {
            !this.state.havePendingPasses &&
              <li>
                You don't have any pending passes.
              </li>
          }
          {
            this.state.havePendingPasses &&
              <ul>
                {this.state.pendingPasses.map((pass, index) =>
                  <PendingPasses pass={pass} key={index} />
                )}
              </ul>
          }
        </div>
        <div className="profileQuote">
          Workout Quote
        </div>
      </div>
    )
  }
}




export default YourProfile;
