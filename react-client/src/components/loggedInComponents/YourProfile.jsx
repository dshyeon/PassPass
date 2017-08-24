import React from 'react';
import $ from 'jquery';

class YourProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userId: this.props.profileData.id,
      previouslyBoughtPasses: false
    };
  }

  componentWillMount () {
    this.getPastBoughtSoldPasses();
  }


  getPastBoughtSoldPasses() {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/pass/boughtsold',
      contentType: 'application/json',
      data: JSON.stringify({userId: this.state.userId}),
      success: function(boughtSold) {
				if (boughtSold === null) {
          this.setState({previouslyBoughtPasses: false})
          console.log(boughtSold, 'NULLLL')
        } else {
          this.setState({previouslyBoughtPasses: true})
          console.log(boughtSold, 'NOTNULLL')
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
        <ul className="profileList">
          <strong>Expired Passes</strong>
          {!this.state.previouslyBoughtPasses &&
              <li>
                You have no previously purchased passes.
              </li >}
        </ul>
        <ul className="profileList">
          <strong>Currently Available Passes</strong>
        </ul>
        <ul className="profileList">
          <strong>Pending Passes</strong>
        </ul>
        <div className="profileQuote">
          Workout Quote
        </div>
      </div>
    )
  }
}

// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   if (isLoggedIn) {
//     return <UserGreeting />;
//   }
//   return <GuestGreeting />;
// }
//
// ReactDOM.render(
//   // Try changing to isLoggedIn={true}:
//   <Greeting isLoggedIn={false} />,
//   document.getElementById('root')
// );


//SELECT * FROM sold_passes WHERE seller_id = <CURRENT USER ID>
//SELECT * FROM sold_passes WHERE buyer_id = <CURRENT USER ID>


export default YourProfile;
